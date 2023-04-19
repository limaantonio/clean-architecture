import ProductFactory from "../../../domain/product/factory/product.factory2";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

import InputCreateProductDto, {
  OutputCreateProductDTO,
} from "./create.product.dto";

export default class ProductCreateUsecase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDTO> {
    const product = ProductFactory.createProduct(input.name, input.price);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
