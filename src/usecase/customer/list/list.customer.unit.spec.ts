import Address from "../../../domain/customer/entity/value-object/address";
import CustomerFactory from "../../../domain/customer/fatory/customer.factory";
import ListCustomerUsecase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Main Street", 123, "12345", "New York")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane Doe",
  new Address("Main Street", 123, "12345", "New York")
);

const MockRespository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit teste for listing customer use case", () => {
  it("should return a list of customers", async () => {
    const customerRepository = MockRespository();
    const usecase = new ListCustomerUsecase(customerRepository);

    const output = await usecase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].name).toBe("John Doe");
    expect(output.customers[1].name).toBe("Jane Doe");
    expect(output.customers[0].address.street).toBe("Main Street");
    expect(output.customers[1].address.street).toBe("Main Street");
    expect(output.customers[0].address.number).toBe(123);
    expect(output.customers[1].address.number).toBe(123);
    expect(output.customers[0].address.zip).toBe("12345");
    expect(output.customers[1].address.zip).toBe("12345");
  });
});
