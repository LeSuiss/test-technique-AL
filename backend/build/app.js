"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3002;
const Redis = require("ioredis");
const redis = new Redis(); // uses defaults unless given configuration object
const env = require('dotenv').config().parsed;
const cors = require('cors');
app.use(cors({ origin: '*' }));
app.use(express_1.default.json());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        //add everyparams to QueryUrl
        let urlSearchQuery = `${env.API_URL}/?apikey=${env.API_KEY}`;
        Object.keys(query).forEach(function enhanceUrlWithQuery(key) {
            if (!!query[key]) {
                let formatedValue = query[key].toString();
                formatedValue.replace(/' '/g, '+');
                return urlSearchQuery += `&${key}=${formatedValue}`;
            }
        });
        //fetch on cache before calling API
        let valueInCache = yield redis.get(urlSearchQuery);
        if ((valueInCache === null || valueInCache === void 0 ? void 0 : valueInCache.length) > 0) {
            console.log('Getting ' + urlSearchQuery + ' from cache');
            return res.send(JSON.parse(valueInCache));
        }
        else {
            return axios_1.default.get(urlSearchQuery)
                .then(axiosResponse => {
                //set cache for 1 day
                console.log('Setting ' + urlSearchQuery + ' in cache for 24h');
                redis.set(urlSearchQuery, JSON.stringify(axiosResponse.data), "EX", 86400);
                res.send(axiosResponse.data);
            });
        }
    }
    catch (error) {
        console.log('error : ', error);
        res.send('an error as occured, please try again later');
    }
}));
app.listen(port, () => console.log('listening on port ' + port));
module.exports = app;
//# sourceMappingURL=app.js.map