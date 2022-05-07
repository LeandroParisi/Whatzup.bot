import OptionsStep from "../../../../Application/StepDefinition/OptionsStep"
import SimpleStep from "../../../../Application/StepDefinition/SimpleStep"
import StepFactory from "../../../../Application/StepDefinition/StepFactory"
import StepTypes from "../../../../Domain/Steps/Enums/StepTypes"
import defaultSteps from "../../Shared/Mocks/DefaultSteps"
import StepsDbSetup from "../../Shared/Setups/DbSetups/StepsDbSetup"

describe("Step Factory Tests", () => {
  beforeAll(async () => {
    await StepsDbSetup.Setup(defaultSteps)
    StepFactory.InstallServices()
  })

  afterAll(async () => {
    await StepsDbSetup.CleanUp()
  })

  it("Should create instance of step when valid step number is passed", async () => {
    for (const step of defaultSteps) {
      const createdStep = await StepFactory.Create(step.id)

      const stepName = createdStep.constructor.name

      switch (step.type) {
        case StepTypes.Options:
          expect(stepName).toBe(OptionsStep.name)
          break
        case StepTypes.Simple:
          expect(stepName).toBe(SimpleStep.name)
          break
      }
    }
  })

  it("Should not create instance of step when invalid step number is passed", async () => {
    try {
      await StepFactory.Create(Number.MAX_SAFE_INTEGER)
    } catch (error) {
      expect(error).not.toBeNull()
    }

  })
})