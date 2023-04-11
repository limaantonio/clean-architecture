import Address from "../entity/value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Customer");
    expect(customer).toBeDefined();
    expect(customer.name).toBe("Customer");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Street", 1, "City", "State");
    let customer = CustomerFactory.createWithAddress("John", address);

    expect(customer).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.address).toBe(address);
  });
});
