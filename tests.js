let chai = require('chai');
let chaiHttp = require('chai-http')
let server = require('./app');
chai.should();
chai.use(chaiHttp);
describe('Translate API ', ()=>{
describe('GET /translate/:word/:language',()=>{
    it("GET the translated word of the target language",(done)=>{
        chai.request(server)
        .get('/translate/Hello/hi') 
        .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('string');
               done();
        })
    })
    it('It should not  GET the translated word of the target language',(done)=>{
        chai.request(server)
        .get('/translate/Hello/hn') 
                .end((err,response)=>{
                response.body.should.be.eql({});           
                done();
        })
    })
})
})