/* eslint-disable @typescript-eslint/no-var-requires */
import { Service } from 'typedi'
import { Message } from 'venom-bot'
import { Whatsapp } from 'venom-bot'
import AugmentedMessage from '../../tsTypes/PackagesAugmentation/VenomBot/AugmentedMessage'
import Customer from '../Domain/Entities/Customer'
import { IInteractionOutput } from '../Domain/Steps/Interfaces/StepDefinition/IStepInteraction'
import SessionHandler from '../Services/SessionManagement/Handlers/SessionHandler'
import StepFactory from './Steps/StepFactory'

require('dotenv').config()

interface HandledMessage {
  customer : Customer
  messageOutput : IInteractionOutput
}

@Service()
export default class BotCore {
  private bot : Whatsapp;
  
  constructor(
    private readonly SessionHandler : SessionHandler,
    ) {}

  public Start() {
    this.bot.onMessage(async (inboundMessage: AugmentedMessage) => {
      if (this.IsValidMessage(inboundMessage)) {
        const { messageOutput, customer } = await this.HandleMessage(inboundMessage)

        await this.SessionHandler.UpdateClientStep(customer, messageOutput.nextStep)

        await this.SendMessages(messageOutput.outboundMessages, customer)
        
        // await this.HandleStepAction(stepInfo, customer)
      } else {
        // No actions for messages received from groups
      }
    })
  }

  private async HandleMessage(inboundMessage: AugmentedMessage) : Promise<HandledMessage> {
    const customer = await this.GetCustomer(inboundMessage)

    const stepHandler = await StepFactory.Create(customer.currentStep)

    const messageOutput = stepHandler.Interact({ customer, userMessage: inboundMessage.body })

    return {
      messageOutput,
      customer
    }
  }

  private async GetCustomer(inboundMessage: AugmentedMessage) : Promise<Customer> {
    const customer = await this.SessionHandler.CheckIn(inboundMessage)

    return customer
  }

  private async SendMessages(outboundMessages : string[], customer : Customer) {
    for (const outboundMessage of outboundMessages) {
      await this.bot.sendText(customer.whatsappId, outboundMessage)
    }
  }

  private IsValidMessage(inboundMessage: Message) {
    if (process.env.TEST_WHATAPP_NUMBER) {
      return !inboundMessage.isGroupMsg && inboundMessage.from === process.env.TEST_WHATAPP_NUMBER
    }
    return !inboundMessage.isGroupMsg
  }
  
  public SetBot(bot: any) {
    this.bot = bot
  }
}
