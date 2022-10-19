const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const productMock = require('../../../src/mocks/product.mock');
const productModel = require('../../../src/models/products.model');
const { execute } = require('../../../src/models/db/connection');

describe('Testes unitários da camada Model', () => {

  describe('Testes unitários de Products', () => {
    it('Verifica se é encontrado um produto pelo id', async () => {
      sinon.stub(connection, 'execute').resolves([productMock])
      const response = await productModel.listById(1);
      expect(response).to.deep.equal(productMock[0])
    });

    it('Verifica se é retornado um array', async () => {
      const response = await productModel.listAll();
      expect(response).to.be.a('array');
    });

    it('Verifica se é retornado o array completo', async () => {
      sinon.stub(connection, 'execute').resolves([productMock])
      const response = await productModel.listAll();
      expect(response).to.deep.equal(productMock)
    });

  });
  afterEach(sinon.restore);
});