import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./product-created.event";

describe("Domain events tests", () => {
  it("should register an event handler", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreated", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreated"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreated"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreated"][0]).toMatchObject(
      eventHandler
    );
  });

  it("should unregister an event handler", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreated", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreated"][0]).toMatchObject(
      eventHandler
    );
    eventDispatcher.unregister("ProductCreated", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreated"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreated"].length).toBe(0);
  });

  it("should unregister all event handlers", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreated", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreated"][0]).toMatchObject(
      eventHandler
    );
    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["ProductCreated"]).toBeUndefined();
  });

  it("should notify an event", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10,
    });

    //Quando o notify for executado o SendEmailWhenProductIsCreatedHandler deve ser chamado
    //e o método handle deve ser executado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
