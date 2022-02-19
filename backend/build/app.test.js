const request = require("supertest");
const app = require("./app");
test('API call is returning a JSON', () => request(app)
    .get("/getMovieList")
    .send({ title: "the godfather" })
    .expect("Content-Type", /json/)
    .expect(200));
//# sourceMappingURL=app.test.js.map