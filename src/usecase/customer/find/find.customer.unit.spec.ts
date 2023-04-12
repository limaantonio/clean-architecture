import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer-repository";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("1", "Customer 1");
const address = new Address("street 1", 123, "1333-333", "São Paulo");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Test find customer use case ", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "1",
    };

    const output = {
      id: "1",
      name: "Customer 1",
      address: {
        street: "street 1",
        number: 123,
        city: "São Paulo",
        zip: "1333-333",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "1",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
