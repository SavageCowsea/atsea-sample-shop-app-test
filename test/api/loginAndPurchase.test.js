import  ajax  from 'superagent';
import  StatusCodes  from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

describe('Login And Purchase', () => {
    it('login', async () => {
        //aquí va la prueba
    });

    it('Purchase', async () => {
      const response = await ajax.get('http://localhost:8080/purchase/')
          .set('Content-type', 'application/json')
          .set('Accept', 'application/json')
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.have.property('message');
    });
});