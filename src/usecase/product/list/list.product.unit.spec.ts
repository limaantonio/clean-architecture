import ProductFactory from "../../../domain/product/factory/product.factory";
import { ListProductUseCase } from "./list.product.usecase";

const product1 = ProductFactory.createProduct("a", "Product 1", 100);
const product2 = ProductFactory.createProduct("b", "Product 2", 200);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
    findByName: jest.fn(),
  };
};

describe("Test list product use case", () => {
  it("should return a list of products", async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUseCase(productRepository);

    const output = await usecase.execute();

    expect(output.products.length).toBe(2);
    expect(output.products[0].name).toBe("Product 1");
    expect(output.products[1].name).toBe("Product 2");
    expect(output.products[0].price).toBe(100);
    expect(output.products[1].price).toBe(200);
  });
});
