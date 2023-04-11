import EventInterface from "../../@shared/event/event.intereface";

export default class CustomerAddressUpdateEvent implements EventInterface {
  public dataTimeOccurred: Date;
  public eventData: any;

  constructor(data: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = data;
  }
}
