import axios from 'axios';
import express from 'express';
import { Request, Response } from 'express';
const app = express();
const port = 3002;
const Redis = require("ioredis");
const redis = new Redis(); // uses defaults unless given configuration object
const env = require('dotenv').config().parsed

const cors = require('cors');
app.use(cors({origin:'*'}));
app.use(express.json());


app.get('/', async(req: Request, res:Response) => {
  try {  
    const query = req.query

    //add everyparams to QueryUrl
    let urlSearchQuery = `${env.API_URL}/?apikey=${env.API_KEY}`
    Object.keys(query).forEach(function enhanceUrlWithQuery(key:string):string|void{
      if(!!query[key]){
        let formatedValue = query[key].toString()
        formatedValue.replace(/' '/g, '+')
        return urlSearchQuery += `&${key}=${formatedValue}`
      }
    })

    //fetch on cache before calling API
    let valueInCache = await redis.get(urlSearchQuery)
    if (valueInCache?.length>0){
      console.log('Getting ' + urlSearchQuery + ' from cache' )
      return res.send(JSON.parse(valueInCache))
    }
    else{ 
      return axios.get(urlSearchQuery)
      .then(axiosResponse=>{

        //set cache for 1 day
        console.log('Setting ' + urlSearchQuery + ' in cache for 24h' )
        redis.set(urlSearchQuery, JSON.stringify(axiosResponse.data), "EX", 86400)
        res.send(axiosResponse.data)
      });
    }

  } 
  catch (error) {
  console.log('error : ' ,error)
  res.send('an error as occured, please try again later')   
  }
  
});


app.listen(port, ()=>console.log('listening on port '+port))


module.exports = app;
