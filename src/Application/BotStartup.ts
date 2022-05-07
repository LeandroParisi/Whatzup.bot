import { Service } from "typedi"
import BotCore from "./BotCore"
import Installer from "./Installer"

@Service()
export default class BotStartup {
  constructor(
  ) {}
  
  public InstallServices() {
    Installer.InstallServices()
  }
  
  public async Startup(bot : BotCore) {
    // const startupDate = DaysUtils.GetDateFromTimestamp(Date.now() / 1000)

    await this.CleanUp()
    // await this.SessionHandler.ValidateCurrentSessions(startupDate)
    // await this.UserDataHandler.SetStartupTime(startupDate)

    // bot.SetStartupDate(startupDate)
  }

  public async LoadUserInfo(venomBot : any, bot : BotCore) {
    // const botInfo = await venomBot.getHostDevice() 
    // const { id: { user : deviceNumber } } = botInfo
    // console.log({botInfo})
    
    // const { branchData, memoryData } = await this.UserDataHandler.LoadInitialData(deviceNumber)

    // bot.SetBranchData(branchData)
    // bot.SetMemoryData(memoryData)
  }

  // private async CleanUp() {

  // }
}
