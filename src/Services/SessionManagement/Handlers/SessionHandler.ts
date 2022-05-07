import { Service } from "typedi"
import AugmentedMessage from "../../../../TsTypes/PackagesAugmentation/AugmentedMessage"
import Customer from "../../../Domain/Entities/Customer"
import CustomerRepository from '../Repositories/CustomerRepository'

@Service()
export default class SessionHandler {
  constructor(
    private readonly CustomerRepository : CustomerRepository,
  ) {
  }

  async CheckIn(message: AugmentedMessage) : Promise<Customer> {
    const foundCustomer = await this.CustomerRepository.GetClientByNumber(message.from)

    if (foundCustomer) return foundCustomer

    const customer = new Customer(message.sender.shortName || message.sender.verifiedName)

    await this.CustomerRepository.InsertCustomer(customer)

    return customer
  }

  async UpdateClientStep(customer : Customer, nextStep : number) {
    await this.CustomerRepository.UpdateClient(
      customer._id, 
      { 
        currentStep: nextStep,
      }
    )
  }
}
