import { Message } from "venom-bot"
import { Sender } from "venom-bot/dist/api/model/message"

interface AugmentedSender extends Sender {
  verifiedName : string
}

export default interface AugmentedMessage extends Message {
  sender : AugmentedSender
}