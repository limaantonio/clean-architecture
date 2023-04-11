import OrderService from "./order.service";

import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";
import Customer from "../../customer/entity/customer";

describe("Oder serviice unit test", () => {
  it("should place an order", () => {
    const customer = new Customer("c1", "Costumer 1");
    const item1 = new OrderItem("1", "p1", "Item 1", 100, 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(50);
    expect(order.total()).toBe(100);
  });

  it("should get total all orders", () => {
    const orderItem = new OrderItem("1", "1", "Product 1", 100, 1);
    const orderItem2 = new OrderItem("2", "2", "Product 2", 200, 2);

    const order = new Order("o1", "c1", [orderItem]);
    const order2 = new Order("o2", "c2", [orderItem2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(500);
  });
});
