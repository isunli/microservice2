import { Subjects, Publisher, PaymentCreatedEvent } from "@sltickets/common";
export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
