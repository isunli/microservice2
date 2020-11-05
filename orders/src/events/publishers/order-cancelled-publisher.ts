import { Publisher, OrderCancelledEvent, Subjects } from "@sltickets/common";
export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
