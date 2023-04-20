import Notification from "./notification";

describe("unit test for notification", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);
    expect(notification.messages("customer")).toBe("customer: error message,");
    const error2 = {
      message: "error message 2",
      context: "customer",
    };
    notification.addError(error2);

    expect(notification.messages("customer")).toBe(
      "customer: error message,customer: error message 2,"
    );
  });
  it("should check if notification at least one error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);
    expect(notification.hasErrors()).toBe(true);
  });

  it("should get all errors props", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);
    expect(notification.getErrors()).toEqual([error]);
  });
});
