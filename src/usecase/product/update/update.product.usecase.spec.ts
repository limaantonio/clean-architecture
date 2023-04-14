import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUsecase from "./update.product.usecase";

const product = ProductFactory.createProduct("a", "Product 1", 100);

const input = {
  id: product.id,
  name: "Product updated",
  price: 122,
  type: "a",
};

const MockRespository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findByName: jest.fn(),
  };
};

describe("Unit teste update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRespository();
    const productUpdateUserCase = new UpdateProductUsecase(productRepository);

    const output = await productUpdateUserCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRespository();
    const productUpdateUserCase = new UpdateProductUsecase(productRepository);

    input.name = "";

    await expect(productUpdateUserCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });
});
