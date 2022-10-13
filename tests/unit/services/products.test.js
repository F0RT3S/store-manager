const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const productMock = require('../../../src/mocks/product.mock');
const productService = require('../../../src/services/products.service');

describe('Testes unitários da camada Services', () => {

  describe('Testes unitários de Products', () => {
    it('Verifica se é encontrado um produto pelo id', async () => {
      sinon.stub(connection, 'execute').resolves([productMock])
      const response = await productService.listById(1);
      expect(response).to.deep.equal(productMock[0])
    });

    it('Verifica se é retornado um array', async () => {
      const response = await productService.listAll();
      expect(response).to.be.a('array');
    });

    it('Verifica se é retornado o array completo ao chamar a função e executá-la', async () => {
      const response = await productService.listAll();
      expect(response).to.deep.equal(productMock)
    });

  });
  afterEach(sinon.restore);
});