/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata'
import Container, { Service } from 'typedi'
import BotStartup from './Application/BotStartup'
import ElectronStartup from './Electron/EletronStartup'
import ILoginSubscriber from './Electron/Interfaces/EventsSubscribers/ILoginSubscriber'

@Service()
export default class Main implements ILoginSubscriber {
  constructor(
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
    await this.BotStartup.Startup()
  }
}

Container.get(Main).Run()
