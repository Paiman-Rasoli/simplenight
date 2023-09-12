import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './datastore/product.repository';
import { mockProductResponse, mockProductsResponse } from './__mock__';
import { ProductNotFoundException } from './errors';

describe('Product controller', () => {
  let productController: ProductController;
  let productService: ProductService;
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = {} as unknown as ProductRepository;
    productService = new ProductService(productRepository);
    productController = new ProductController(productService);
  });

  it('Dependencies should be defined', () => {
    expect(productController).toBeDefined();
    expect(productService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return array of products', async () => {
      jest
        .spyOn(productService, 'getProducts')
        .mockResolvedValue(mockProductsResponse);

      const products = await productController.getProducts();
      expect(products).toBe(mockProductsResponse);
      expect(productService.getProducts).toHaveBeenCalled();
      expect(products.length > 0).toBe(true);
    });
  });

  describe('createProduct', () => {
    it('should create and return new product.', async () => {
      jest
        .spyOn(productService, 'create')
        .mockResolvedValue(mockProductResponse);

      const newProduct =
        await productController.createProduct(mockProductResponse);
      expect(productService.create).toHaveBeenCalledWith(mockProductResponse);
      expect(newProduct).toBe(mockProductResponse);
      expect(newProduct).toBeTruthy();
    });
  });

  describe('getProductById', () => {
    it('should trow exception for not founded product.', async () => {
      const notExistProductId = 4578887878;
      productRepository.findOneBy = jest.fn().mockResolvedValue(null);
      let findProduct;
      let error;
      try {
        findProduct = await productController.getProduct(notExistProductId);
      } catch (err) {
        error = err;
      }
      expect(findProduct).toBeFalsy();
      expect(error).toBeTruthy();
      expect(error).toBeInstanceOf(ProductNotFoundException);
    });
  });
});
