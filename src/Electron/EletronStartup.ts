import { app, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import { Service } from 'typedi'
import Main from '..'
import ILoginInfo from '../Data/Interfaces/ILoginInfo'
import Logger from '../Logger'
import LoginError from '../Services/Abstractions/Errors/LoginError'
import UserDataHandler from '../Services/UserData/Handlers/UserDataHandler'
import ILoginSubscriber from './Interfaces/EventsSubscribers/ILoginSubscriber'

@Service()
export default class EletronStartup {
  private LoginSubscribers : Array<ILoginSubscriber> = []
  private MainWindow : BrowserWindow

  /**
   *
   */
  constructor(
    private readonly UserDataHandler : UserDataHandler,
  ) {}

  async Run() {
    this.ConfigureAutoUpdater()
    this.LoadApp()
  }

  private CreateWindow() {
    this.MainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })

    this.MainWindow.loadFile('./WebPage/index.html')

    this.MainWindow.on('closed', function () {
      this.MainWindow = null
    })

    this.MainWindow.once('ready-to-show', () => {
      try {
        autoUpdater.checkForUpdatesAndNotify()
      } catch (error) {
        Logger.error("Error trying to check for updates.", error)
      }
    })
  }

  private InitializeApp() {
    return async () => {
      this.CreateWindow()
      this.SetAutoUpdateEvents(this.MainWindow)
      this.SetIpcEvents(this.MainWindow)

      try {
        const isLogged = await this.TryLogin()

        if (!isLogged) {
          this.MainWindow.webContents.send('request_login', 'Favor logar com sua credenciais.')
        } else {
          this.MainWindow.webContents.send('logged_in', 'Sua sessão é válida.')
          for (const subscriber of this.LoginSubscribers) {
            subscriber.ReceiveLogin()
          }
        }
      } catch (error) {
        const e = error as LoginError
        Logger.error("Unable to log in", e)

        this.MainWindow.webContents.send('invalid_token', error.message)

        if (e.retryLogin) {
          Logger.warn("Requesting log in retry", e)
          this.MainWindow.webContents.send('request_login', error.message)
        }
      } 
    }
  }

  private LoadApp() {
    // Using closure to enforce this binding on this.InitializeApp
    const initialize = this.InitializeApp()
    
    app.on('ready', async () => {
      await initialize()
    })
    
    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    
    app.on('activate', async () => {
      if (this.MainWindow === null) {
        await initialize()
      }
    })
  }

  private async TryLogin() : Promise<boolean> {
    const hasToken = await this.UserDataHandler.HasToken()

    if (hasToken) {
      await this.UserDataHandler.ValidateToken()
      return true
    } else {
      return false   
    }
  }

  private SetIpcEvents(mainWindow : BrowserWindow) {
    ipcMain.on('app_version', (event) => {
      event.sender.send('app_version', { version: app.getVersion() })
    })

    ipcMain.on('receive_input', async (_message, loginInfo : ILoginInfo) => {
      try {
        await this.UserDataHandler.Login(loginInfo)
        for (const subscriber of this.LoginSubscribers) {
          subscriber.ReceiveLogin()
        }
        mainWindow.webContents.send('logged_in')
      } catch(error) {
        const e = error as LoginError

        mainWindow.webContents.send('invalid_token', error.message)

        if (e.retryLogin) {
          mainWindow.webContents.send('request_login', error.message)
        }
      }
    })
    
    ipcMain.on('restart_app', () => {
      autoUpdater.quitAndInstall()
    })
    
  }

  private SetAutoUpdateEvents(mainWindow : BrowserWindow) {
    autoUpdater.on('update-available', () => {
      mainWindow.webContents.send('update_available')
    })
    
    autoUpdater.on('update-downloaded', () => {
      mainWindow.webContents.send('update_downloaded')
    })
  }

  public SubscribeForLogin(subscriber: Main) {
    this.LoginSubscribers.push(subscriber)
  }

  private ConfigureAutoUpdater() {
    autoUpdater.logger = Logger

    try {
      autoUpdater.setFeedURL({
        token: "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",
        owner: "LeandroParisi",
        repo: "WhatsappBot.exe",
        provider: "github"
      })
    } catch (error) {
      Logger.error("Error trying to set Feed URL", error)
    }
  }
}


