import CreateProductUsecase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 100,
  type: "a",
};

const MockRespository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findByName: jest.fn(),
  };
};

describe("Unit teste create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRespository();
    const productCreateUserCase = new CreateProductUsecase(productRepository);

    const output = await productCreateUserCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
