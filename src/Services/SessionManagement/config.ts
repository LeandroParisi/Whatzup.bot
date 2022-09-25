/* eslint-disable @typescript-eslint/no-var-requires */
import Datastore from "nedb-promises"
import DatabaseFactory from "../Shared/DatabaseFactory"

const errorHandler = require('../Shared/errorHandler')

class SessionDataDbs {
  customerDb : Datastore
  stepsDb : Datastore
  userSessionDb : Datastore

  constructor() {
    this.customerDb = DatabaseFactory.Create("sessionManagement/customersData.db")
    this.stepsDb = DatabaseFactory.Create("sessionManagement/stepsData.db")
    this.userSessionDb = DatabaseFactory.Create("sessionManagement/userSession.db")

    this.customerDb.on('__error__', (datastore, event, error) => {
      errorHandler(datastore, event, error)
    })
  }
} 

export default new SessionDataDbs()