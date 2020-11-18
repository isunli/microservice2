import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  OrderStatus,
} from "@sltickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }
    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();
    // should emit event but order complete will not be modified in the future
    msg.ack();
  }
}
