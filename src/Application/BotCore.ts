/* eslint-disable @typescript-eslint/no-var-requires */
import { Service } from 'typedi'
import { Message } from 'venom-bot'
import { Whatsapp } from 'venom-bot'
import AugmentedMessage from '../../TsTypes/PackagesAugmentation/AugmentedMessage'
import Customer from '../Domain/Entities/Customer'
import SessionHandler from '../Services/SessionManagement/Handlers/SessionHandler'

require('dotenv').config()

@Service()
export default class BotCore {
  private bot: Whatsapp;

  constructor(
    private readonly SessionHandler : SessionHandler,
    ) {}

  public Start() {
    this.bot.onMessage(async (inboundMessage: AugmentedMessage) => {
      if (this.IsValidMessage(inboundMessage)) {
        const { stepInfo, customer } = await this.HandleMessage(inboundMessage)

        // if (stepInfo.nextStep) await this.SessionHandler.UpdateClientStep(customer, stepInfo.nextStep)

        // await this.SendMessages(stepInfo.outboundMessages, customer)
        
        // await this.HandleStepAction(stepInfo, customer)
      } else {
        // No actions for messages received from groups
      }
    })
  }

  private async HandleMessage(inboundMessage: AugmentedMessage) : Promise<HandledMessage> {
    const customer = await this.GetCustomer(inboundMessage)

    const stepHandler = StepFactory.Create(customer.currentStep, {
      customer,
      message: inboundMessage,
      sessionData: { ...this.sessionData },
    })

    const stepInfo = await stepHandler.Interact()

    return {
      stepInfo,
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

  public SetStartupDate(startupDate: Date) {
    this.sessionData.startupDate = startupDate
  }
}
