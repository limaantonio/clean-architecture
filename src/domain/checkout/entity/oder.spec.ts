import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Oder unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("122", "", []);
    }).toThrowError("Customer Id is required");
  });
  it("should throw error when qtd must be greater than 0", () => {
    expect(() => {
      let order = new Order("122", "123", []);
    }).toThrowError("Order must have at least one item");
  });
  it("should calcutate total", () => {
    const item = new OrderItem("i1", "p1", "Item1", 100, 2);
    const item2 = new OrderItem("i2", "p1", "Item2", 200, 2);
    const order = new Order("o1", "c1", [item]);

    let total = order.total();

    expect(total).toBe(200);

    const order2 = new Order("o1", "c1", [item2]);
    let total2 = order2.total();

    expect(total2).toBe(400);
  });

  it("should throw error if the qtde is greater than 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "p1", "Item1", 100, 0);
      const order = new Order("o1", "c1", [item]);
    }).toThrow("Quantity must be greater than zero");
  });
});
