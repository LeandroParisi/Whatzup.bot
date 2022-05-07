import IOptionsStep from "../../../../Domain/Steps/Interfaces/OptionsStep/IOptionsStep"
import staticImplements from "../../../../Shared/Anotations/staticImplements"
import { faker } from '@faker-js/faker'
import StepTypes from "../../../../Domain/Steps/Enums/StepTypes"

@staticImplements()
export default class StepMock {
  static GenerateRandomOptionsStep() : IOptionsStep {
    const optionsStep : IOptionsStep = {
      id: faker.datatype.number(),
      name: faker.name.findName(),
      options: [
        {
          key: faker.datatype.number({ min: 1, max: 10 }),
          value: faker.fake('Mocked option {{datatype.number}}'),
          nextStep: 1,
          outboundMessages: [ faker.fake('Mocked message {{datatype.number}}') ]
        },
        {
          key: faker.datatype.number({ min: 11, max: 20 }),
          value: faker.fake('Mocked option {{datatype.number}}'),
          nextStep: 2,
          outboundMessages: [ faker.fake('Mocked message {{datatype.number}}') ]
        },
        {
          key: faker.datatype.number({ min: 21, max: 30 }),
          value: faker.fake('Mocked option {{datatype.number}}'),
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