import Address from "../../../domain/customer/entity/value-object/address";
import CustomerFactory from "../../../domain/customer/fatory/customer.factory";
import UpdateCustomerUsecase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "jonh",
  new Address("street", 123, "12345", "city")
);

const input = {
  id: customer.id,
  name: "john updated",
  address: {
    street: "street updated",
    city: "city updated",
    number: 123,
    zip: "12345",
  },
};

const MockRespository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRespository();
    const customerUpdateUserCase = new UpdateCustomerUsecase(
      customerRepository
    );

    const output = await customerUpdateUserCase.execute(input);

    expect(output).toEqual(input);
  });
});
