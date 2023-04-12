import CreateCustomerUsecase from "./create.customer.usecase";

const input = {
  name: "John Doe",
  address: {
    street: "Main Street",
    city: "New York",
    number: 123,
    zip: "12345",
  },
};

const MockRespository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit teste create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRespository();
    const customerCreateUserCase = new CreateCustomerUsecase(
      customerRepository
    );

    const output = await customerCreateUserCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRespository();
    const customerCreateUserCase = new CreateCustomerUsecase(
      customerRepository
    );

    input.name = "";

    await expect(customerCreateUserCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });
});
