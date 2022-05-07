/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata'
import Container, { Service } from 'typedi'
import BotCore from './Application/BotCore'
import BotStartup from './Application/BotStartup'
import ElectronStartup from './Electron/EletronStartup'
import ILoginSubscriber from './Electron/Interfaces/EventsSubscribers/ILoginSubscriber'
const venom = require('venom-bot')

@Service()
export default class Main implements ILoginSubscriber {
  constructor(
    private readonly BotCore : BotCore,
    private readonly BotStartup : BotStartup,
    private readonly ElectronStartup : ElectronStartup
  ) {
    this.ElectronStartup.SubscribeForLogin(this)
  }

  async Run() {
    try {
      await this.ElectronStartup.Run()

      this.BotStartup.InstallServices()
      
    } catch (error) {
      // Trace
      console.log(error)
    }
  }

  public async ReceiveLogin(): Promise<void> {
    await this.BotStartup.Startup(this.BotCore)

    const bot = await this.CreateBot()

    this.BotCore.SetBot(bot)

    await this.BotStartup.LoadUserInfo(bot, this.BotCore)

    this.BotCore.Start()
  }

  private async CreateBot() : Promise<any> {
    const bot = await venom.create({
      session: 'whatsapp_bot', // name of session
      multidevice: true , // for version not multidevice use false.(default: true)
      headless: false, // Headless chrome
      useChrome: true,
    })
    return bot  
  }
}

Container.get(Main).Run()
