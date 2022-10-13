const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { allProducts, firstProduct } = require('../../../src/mocks/productController.mock');
const productController = require('../../../src/controllers/products.controller');
const productService = require('../../../src/services/products.service');

describe('Testes unitários da camada Controller', () => {
  afterEach(sinon.restore);
  describe('Testes unitários de Products', () => {
    it('Verifica se retorna status code 200 e todos os produtos na rota /products', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'listAll').resolves(allProducts)
      await productController.listAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it('Verifica se é passado um id válido', async () => {
      const res = {};
      const req = {
        params: {
          id: 1,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'listById').resolves(firstProduct)
      await productController.listById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(firstProduct);
    })

    it('Verifica se retorna status code 404 com id inválido', async () => {
      const res = {};
      const req = {
        params: {
          id: 9999999,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'listById').resolves(null)
      await productController.listById(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });

    // it('Verifica se é passado um id válido e retorna um status code 200', async () => {
    //   const res = {};
    //   const req = {
    //     params: {
    //       id: 1,
    //     }
    //   };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   await productController.listById(req, res);
    //   expect(res.status).to.have.been.calledWith(200);
    // })

    // Verificar na monitoria como testar a linha 13

  });
});