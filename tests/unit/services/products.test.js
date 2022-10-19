const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const productMock = require('../../../src/mocks/product.mock');
const productService = require('../../../src/services/products.service');
const productModel = require('../../../src/models/products.model')

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
      sinon.stub(connection, 'execute').resolves([productMock])
      const response = await productService.listAll();
      expect(response).to.deep.equal(productMock)
    });

    it('Verifica a função createProduct', async () => {
      const name = { name: 'FAZ O L' };
      const result = {
        id: 13,
        name: 'FAZ O L'
      };

      sinon.stub(productModel, 'createProduct').resolves({
        id: 13,
        name: 'FAZ O L'
      });

      const response = await productService.createProduct(name);
      expect(response).to.be.deep.equal(result);
    });

    it('Verifica se é deletado um produto', async () => {
      sinon.stub(connection, 'execute').resolves([]);
      const result = await productModel.deleteProducts(1);
      expect(result).to.be.deep.equal([]);
    });

  });
  afterEach(sinon.restore);
});