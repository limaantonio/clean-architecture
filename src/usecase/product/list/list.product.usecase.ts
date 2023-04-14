import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputListProductDTO } from "./list.product.dto";

export class ListProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  public async execute(): Promise<OutputListProductDTO> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
