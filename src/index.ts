/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata'
import Container, { Service } from 'typedi'
import BotStartup from './Application/BotStartup'
import Config from './config'
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
    this.BotStartup.InstallServices()

    try {
      if (Config.runWithoutElectron) {
        await this.StartWithoutElectron()
      } else {
        await this.StartWithElectron()
      }
    } catch (error) {
      // Trace
      console.log(error)
    }
  }
  private async StartWithElectron() {
    console.log("Starting bot without electron")
    await this.ElectronStartup.Run()
  }

  private async StartWithoutElectron() {
    console.log("Starting bot without electron")
    await this.BotStartup.Startup()
  }

  public async ReceiveLogin(): Promise<void> {
    await this.BotStartup.Startup()
  }
}

Container.get(Main).Run()
