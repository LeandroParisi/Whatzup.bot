/* eslint-disable @typescript-eslint/ban-types */
import Datastore = require("nedb-promises");
import { Service } from "typedi"
import { IStep } from "../../../Domain/Steps/Interfaces/IStep"
import SessionDataDbs from '../config'

@Service()
export default class StepsRepository {
  stepsDb : Datastore

  constructor() {
    this.stepsDb = SessionDataDbs.stepsDb
  }

  async GetStepById(currentStep: number) : Promise<IStep> {
    const Step = await this.stepsDb.findOne({ id: currentStep })
    return Step as unknown as IStep
  }

  async InsertSteps(steps: Array<IStep>) : Promise<void> {
    await this.stepsDb.insert(steps)
  }

  async CleanUp() : Promise<void> {
    await this.stepsDb.remove({}, { multi: true })
  }
}

