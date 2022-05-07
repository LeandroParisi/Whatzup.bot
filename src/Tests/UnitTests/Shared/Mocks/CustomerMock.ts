import Customer from "../../../../Domain/Entities/Customer"
import { faker } from '@faker-js/faker'

export default class CustomerMock {
  static GenerateCustomer() : Customer {
    return new Customer(faker.name.findName())
  }
}