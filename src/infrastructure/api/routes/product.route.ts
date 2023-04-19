import express, { Request, Response } from "express";
import ProductCreateUsecase from "../../../usecase/product/create/create.product.usecase";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new ProductCreateUsecase(new ProductRepository());

  try {
    const productDto = {
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(productDto);

    res.send(output);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await usecase.execute();
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
