import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductUseCase } from "./list.product.usecase";

describe("Test list product use case ", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product1 = ProductFactory.createProduct("a", "Product 1", 100);
    const product2 = ProductFactory.createProduct("b", "Product 2", 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const output = [
      {
        id: product1.id,
        name: product1.name,
        price: product1.price,
      },
      {
        id: product2.id,
        name: product2.name,
        price: product2.price,
      },
    ];

    const result = await usecase.execute();

    expect(result.products).toEqual(output);
  });
});
