import  get  from 'superagent';
import  StatusCodes  from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

describe('System utilities Tests', () => {
    it('Database healtcheck', async () => {
        //Aquí va la prueba
    });

    it('Getting container ID using GET', async () => {
        const response = await get('http://localhost:8080//utility/containerid/')
            .set('Content-type','application/json')
            .set('Accept','application/json');
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.body).to.have.property('host');
        expect(response.body).to.have.property('ip');
    });
});