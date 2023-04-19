import request from "supertest";
import ProductModel from "../../product/repository/sequelize/product.model";
import { app, sequelize } from "../express";

describe("E2E test for product", () => {
  beforeAll(async () => {
    await sequelize.addModels([ProductModel]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
      price: 10,
      type: "a",
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product");
    expect(response.body.price).toBe(10);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
      price: 10,
      type: "a",
    });

    expect(response.status).toBe(200);

    const response2 = await request(app).post("/product").send({
      name: "Product2",
      price: 20,
      type: "b",
    });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    if (listResponse.body.products.length > 2) {
      expect(listResponse.status).toBe(200);
      expect(listResponse.body.products[1].name).toBe("Product");
      expect(listResponse.body.products[1].price).toBe(10);
      expect(listResponse.body.products[2].name).toBe("Product2");
      expect(listResponse.body.products[2].price).toBe(20);
    } else {
      expect(listResponse.status).toBe(200);
      expect(listResponse.body.products[0].name).toBe("Product");
      expect(listResponse.body.products[0].price).toBe(10);
      expect(listResponse.body.products[1].name).toBe("Product2");
      expect(listResponse.body.products[1].price).toBe(20);
    }
  });
});
