import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../entity/value-object/address";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleWhenAddressIsUpadteHandler from "./handler/send-console-when-address-is-update.handler";
import SendConsoleWhenCustomerIsCreatedHandler from "./handler/send-console-when-customer-is-created.handler";

describe("Domain events tests", () => {
  it("should register an event handler", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreated", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreated"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreated"].length).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreated"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreated", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreated"][0]
    ).toMatchObject(eventHandler);
    eventDispatcher.unregister("CustomerCreated", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreated"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreated"].length).toBe(0);
  });

  it("should unregister all event handlers", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreated", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreated"][0]
    ).toMatchObject(eventHandler);
    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["CustomerCreated"]).toBeUndefined();
  });

  it("should notify an event", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleWhenCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      description: "Customer 1 description",
      price: 10,
    });

    //Quando o notify for executado o SendEmailWhenProductIsCreatedHandler deve ser chamado
    //e o método handle deve ser executado
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should notify when an address is updated", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleWhenAddressIsUpadteHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const address = new Address("street 1", 123, "1333-333", "São Paulo");

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Customer 1",
      description: "Customer 1 description",
      price: 10,
      address: address,
    });

    const address2 = new Address("street 2", 123, "1333-333", "São Paulo");

    const customerAddressUpdatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      description: "Customer 1 description",
      price: 10,
      address: address2,
    });

    eventDispatcher.notify(customerAddressUpdatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
