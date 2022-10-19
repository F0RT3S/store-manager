const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { allProducts, firstProduct, newProduct, updatedProduct, deleteProduct } = require('../../../src/mocks/productController.mock');
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

    it('Verifica se é passado um id válido e retorna status 200', async () => {
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

    it('Verifica se é passado um nome inválido e retorna um status code 422 na função createProduct', async () => {
      const res = {};
      const req = {
        body: {
          name: 'Lula',
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'createProduct').resolves({ message: '"name" length must be at least 5 characters long' })
      await productController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(422);
    });

    it('Verifica se é passado um nome inválido e retorna um status code 400 na função createProduct', async () => {
      const res = {};
      const req = {
        body: {
          name: undefined,
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'createProduct').resolves({ message: '"name" is required' })
      await productController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(400);
    });

    it('Verifica a função de criar um novo produto', async () => {
      const res = {};
      const req = {
        body: {
          name: 'LULA LÁ, TRAZ A ESPERANÇA',
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'createProduct').resolves(newProduct)
      await productController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(201);
    });

    it('Verifica a função de atualizar um produto', async () => {
      const res = {};
      const req = {
        body: {
          name: 'Taco de basquete'
        },
        params: {
          id: 3
        },
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'updateProduct').resolves(updatedProduct);
      await productController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('Verifica se é passado um nome inválido e retorna um status code 422 na função updateProduct', async () => {
      const res = {};
      const req = {
        body: {
          name: 'Lula',
        },
        params: {
          id: 3
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'updateProduct').resolves({ message: '"name" length must be at least 5 characters long' })
      await productController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(422);
    });

    // it('Verifica a função de deletar um produto', async () => {
    //   const res = {};
    //   const req = {
    //     params: {
    //       id: 1
    //     }
    //   }

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   sinon.stub(productService, 'deleteProducts').resolves(deleteProduct);
    //   await productController.deleteProducts(req, res);
    //   expect(res.status).to.have.been.calledWith(204);
    // });
  });
});