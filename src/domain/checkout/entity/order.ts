import { OrderItem } from "./order_item";

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._customerId;
  }

  get items() {
    return this._items;
  }

  addItem(item: OrderItem) {
    this._items.push(item);
    this._total = this.total();
  }

  validate() {
    if (this._id.length === 0) throw new Error("Id is required");
    if (this._customerId.length === 0)
      throw new Error("Customer Id is required");
    if (this._items.length === 0)
      throw new Error("Order must have at least one item");
    if (this._items.some((item) => item.quantity <= 0))
      throw new Error("Quantity must be greater than zero");
    return true;
  }

  total(): number {
    return this._items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
