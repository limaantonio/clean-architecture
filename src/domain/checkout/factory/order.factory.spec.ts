import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";
describe("Oder factory unit tests", () => {
  it("should create an order", () => {
    const orderProps = {
      id: uuid(),
      name: "Order",
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          productId: uuid(),
          name: "Item 1",
          price: 10,
          quantity: 1,
        },
      ],
    };
    const order = OrderFactory.create(orderProps);

    expect(order.id).toEqual(orderProps.id);
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
});
