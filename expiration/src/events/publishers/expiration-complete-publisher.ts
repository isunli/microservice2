import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@sltickets/common";

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
