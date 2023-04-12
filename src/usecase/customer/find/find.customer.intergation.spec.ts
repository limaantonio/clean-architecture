import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer-repository";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case ", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("1", "Customer 1");
    const address = new Address("street 1", 123, "1333-333", "São Paulo");
    customer.changeAddress(address);

    await customerRepository.create(customer);

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
});
