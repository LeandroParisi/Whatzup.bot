/* eslint-disable @typescript-eslint/ban-types */
import Datastore from "nedb-promises"
import { Service } from "typedi"
import Customer from "../../../Domain/Entities/Customer"
import SessionDataDbs from '../config'

@Service()
export default class CustomerRepository {
  customerDb : Datastore

  constructor() {
    this.customerDb = SessionDataDbs.customerDb
  }

  async GetClientByNumber(whatsappId: string) : Promise<Customer> {
    const document = await this.customerDb.findOne({ whatsappId })
    return document as unknown as Customer
  }

  async InsertCustomer(client: Customer) : Promise<Customer> {
    const insertedClient = await this.customerDb.insert(client)
    return insertedClient
  }

  async UpdateClient(clientId : string, payload : Partial<Customer>) : Promise<number> {
    const affectedRows = await this.customerDb.update({ _id: clientId }, { $set: payload })
    return affectedRows
  }

  async FindAll(query : Object) : Promise<Array<Customer>> {
    const clients = await this.customerDb.find(query)
    return clients as Array<Customer>
  }
  
  async DeleteClient(query : Object) : Promise<any> {
    const affectedRows = await this.customerDb.remove(query, { multi: true })
    return affectedRows
  }

  async GetCustomerById(customerId : string) : Promise<Customer> {
    const client = await this.customerDb.findOne({ _id : customerId })
    return client as Customer 
  }

  async CleanUp() : Promise<void> {
    await this.customerDb.remove({}, { multi: true })
  }
}

