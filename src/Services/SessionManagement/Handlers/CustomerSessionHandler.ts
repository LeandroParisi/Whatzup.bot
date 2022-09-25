import { Service } from "typedi"
import AugmentedMessage from "../../../../tsTypes/PackagesAugmentation/VenomBot/AugmentedMessage"
import Customer from "../../../Domain/Entities/Customer"
import CustomerRepository from '../Repositories/CustomerRepository'

@Service()
export default class CustomerSessionHandler {
  constructor(
    private readonly CustomerRepository : CustomerRepository,
  ) {
  }

  async CheckIn(message: AugmentedMessage) : Promise<Customer> {
    const foundCustomer = await this.CustomerRepository.GetClientByNumber(message.from)

    if (foundCustomer) return foundCustomer

    const customerName = message.sender.shortName || message.sender.verifiedName
    
    const customer = new Customer(customerName, message.from)

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
