import { faker } from '@faker-js/faker'
import StepTypes from "../../../../Domain/Steps/Enums/StepTypes"
import IOptionsStep from "../../../../Domain/Steps/ValueObjects/OptionsStep/IOptionsStepInfo"
import staticImplements from "../../../../Shared/Anotations/staticImplements"

@staticImplements()
export default class StepMock {
  static GenerateRandomOptionsStep() : IOptionsStep {
    const optionsStep : IOptionsStep = {
      id: faker.datatype.number(),
      name: faker.name.findName(),
      options: [
        {
          selectionKey: faker.datatype.number({ min: 1, max: 10 }),
          name: faker.fake('Mocked option {{datatype.number}}'),
          nextStep: 1,
          outboundMessages: [ faker.fake('Mocked message {{datatype.number}}') ]
        },
        {
          selectionKey: faker.datatype.number({ min: 11, max: 20 }),
          name: faker.fake('Mocked option {{datatype.number}}'),
          nextStep: 2,
          outboundMessages: [ faker.fake('Mocked message {{datatype.number}}') ]
        },
        {
          selectionKey: faker.datatype.number({ min: 21, max: 30 }),
          name: faker.fake('Mocked option {{datatype.number}}'),
          nextStep: 3,
          outboundMessages: [ faker.fake('Mocked message {{datatype.number}}') ]
        }
      ],
      type: StepTypes.Options,
      introMessage: [ faker.fake('Mocked intro message {{datatype.number}}') ]
    }

  return optionsStep
  }
}