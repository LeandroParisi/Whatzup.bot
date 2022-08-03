import staticImplements from "../Shared/Anotations/staticImplements"
import IInstaller from "../Shared/Interfaces/IInstaller"
import StepFactory from "./Steps/StepFactory"
// import ActionsFactoryInstaller from "../../Domain/StepActions/Installers/ActionsFactoryInstaller"
// import StepFactoryInstaller from "../../Domain/Steps/Installers/StepFactoryInstaller"

@staticImplements<IInstaller>()
export default class Installer {
  public static InstallServices() : void {
    StepFactory.InstallServices()
  }
}