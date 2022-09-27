import { Service } from "typedi"
import * as venom from 'venom-bot'
import CustomerRepository from "../Services/SessionManagement/Repositories/CustomerRepository"
import StepsRepository from "../Services/SessionManagement/Repositories/StepsRepository"
import BotCore from "./BotCore"
import Installer from "./Installer"

@Service()
export default class BotStartup {
  private VenomBot : venom.Whatsapp
  constructor(
    private CustomerRepository : CustomerRepository,
    private StepsRepository : StepsRepository,
    private readonly BotCore : BotCore,
  ) {}
  
  public InstallServices() {
    Installer.InstallServices()
  }
  
  public async Startup() {
    await this.CleanUp()

    await this.CreateBot()

    await this.LoadUserInfo()

    this.BotCore.Start()
  }

  public async LoadUserInfo() {
    const botInfo = await this.VenomBot.getHostDevice()
    console.log({ botInfo }) 
    const { id: { user : deviceNumber } } = botInfo
    // console.log({botInfo})
    
    // const { branchData, memoryData } = await this.UserDataHandler.LoadInitialData(deviceNumber)

    // bot.SetBranchData(branchData)
    // bot.SetMemoryData(memoryData)
  }

  private async CleanUp() {
    await this.CustomerRepository.CleanUp()
    await this.StepsRepository.CleanUp()
  }

  private async CreateBot() : Promise<void> {
    const bot = await venom.create({
      session: 'whatsapp_bot', // name of session
      multidevice: true , // for version not multidevice use false.(default: true)
      headless: false, // Headless chrome
      useChrome: true,
    })

    this.VenomBot = bot
    this.BotCore.SetBot(bot)
  }
}
