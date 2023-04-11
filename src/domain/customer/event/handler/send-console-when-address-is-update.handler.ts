import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressUpdateEvent from "../customer-address-updated.event";

export default class SendConsoleWhenAddressIsUpadteHandler
  implements EventHandlerInterface<CustomerAddressUpdateEvent>
{
  handle(event: CustomerAddressUpdateEvent): void {
    console.log(`Id do cliente: ${event.eventData.id} - Nome do cliente: ${event.eventData.name}
     - Novo endereço: ${event.eventData.address}`);
  }
}
