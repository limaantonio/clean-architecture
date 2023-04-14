export default interface InputCreateProductDto {
  type: string;
  name: string;
  price: number;
}

export interface OutputCreateProductDTO {
  id: string;
  name: string;
  price: number;
}
