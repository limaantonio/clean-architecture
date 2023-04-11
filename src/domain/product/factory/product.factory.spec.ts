import ProductFactory from "./product.factory";

describe("Product factory unit teste", () => {
  it("should create a product type a", () => {
    const product = ProductFactory.createProduct("a", "Product A", 10);
    expect(product).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type b", () => {
    const product = ProductFactory.createProduct("b", "Product B", 10);
    expect(product).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when create a product with invalid type", () => {
    expect(() => {
      ProductFactory.createProduct("c", "Product C", 10);
    }).toThrow("Invalid product type");
  });
});
