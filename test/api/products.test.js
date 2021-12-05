import  ajax  from 'superagent';
import  StatusCodes  from 'http-status-codes';
import * as chai from 'chai';

const expect = chai.expect;

describe('Products', () => {
    it('Getting all products', async () => {
        const response = await ajax.get('http://localhost:8080/api/product/')
            .set('Content-type','application/json')
            .set('Accept','application/json');
        expect(response.status).to.equal(StatusCodes.OK);
    });

    it('Getting single product by ID', async () => {
        const id = 1;
        const response = await ajax.get('http://localhost:8080/api/product/'+id)
            .set('Content-type','application/json')
            .set('Accept','application/json');
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.body).to.have.property('description');
        expect(response.body).to.have.property('name');
        expect(response.body).to.have.property('productId');
    });
});