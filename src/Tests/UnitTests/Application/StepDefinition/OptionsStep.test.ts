import OptionsStep from "../../../../Application/Steps/StepDefinition/OptionsStep"
import Customer from "../../../../Domain/Entities/Customer"
import IOptionsStep from "../../../../Domain/Steps/ValueObjects/OptionsStep/IOptionsStepInfo"
import CustomerMock from "../../Shared/Mocks/CustomerMock"
import StepMock from "../../Shared/Mocks/StepMock"

describe("Options Step tests", () => {
  let mockedStep : IOptionsStep
  let mockedCustomer : Customer
  let optionsStep : OptionsStep

  beforeEach(() => {
    mockedStep = StepMock.GenerateRandomOptionsStep()
    mockedCustomer = CustomerMock.GenerateCustomer()
    optionsStep = new OptionsStep(mockedStep)
  })

  it("Should return outbound messages for valid response", () => {
    // Arrange
    const selectedOption = mockedStep.options[Math.floor(Math.random() * mockedStep.options.length)]

    // Act
    const { 
      nextStep, 
      outboundMessages 
    } = optionsStep.Interact({ userMessage: `   ${selectedOption.selectionKey} `, customer: mockedCustomer })

    // Assert
    expect(nextStep).toBe(selectedOption.nextStep)
    expect(outboundMessages).toBe(selectedOption.outboundMessages)
  })

  it("Should send user to same step if invalid response", () => {
    // Arrange
    const avaiableOptions = new Set(mockedStep.options.map(x => x.selectionKey))
    const invalidOption = Array
      .from({ length:50 }, (_v, k)=> k + 1)
      .filter(x => !avaiableOptions.has(x))[Math.floor(Math.random() * mockedStep.options.length)]

    // Act
    const { 
      nextStep, 
      outboundMessages 
    } = optionsStep.Interact({ userMessage: `   ${invalidOption} `, customer: mockedCustomer })

    // Assert
    expect(nextStep).toBe(mockedCustomer.currentStep)
    expect(outboundMessages).toBe(mockedStep.introMessage)
  })
})