const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./app");

const should = chai.should();

chai.use(chaiHttp);

if (process.env.NODE_ENV == "test") {
    describe ("---------------- Enter the tests ----------------------\n\n", () => {
        it("should GET the homepage\n\n", (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    if (err)
                        done(err);
                    else {
                        res.should.have.status(200);

                        // Meta tests
                        res.body.meta.success.should.be.a("boolean");
                        res.body.meta.message.should.be.a("string");
                        done();
                    }
                });
        });
    });
} else {
    console.error("\n------------- Tried to run tests in production mode. Please switch to test mode by making NODE_ENV=test in .env file ---------------------------\n\n");
    process.exit(1);
}
