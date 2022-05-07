import StepTypes from "../../../../Domain/Steps/Enums/StepTypes"
import IOptionsStep from "../../../../Domain/Steps/Interfaces/OptionsStep/IOptionsStep"
import ISimpleStep from "../../../../Domain/Steps/Interfaces/SimpleStep/ISimpleStep"

const firstStepIntro = [ 
  'Hello,\nMy name is Walle, and I will be helping you during your experience.', 
  "How can I help you?" 
]

const secondStepIntro = [ 
  'Please, select a product to see more info about it', 
]

const thirdStepIntro = [
  "Can I help you with something else?" 
]

const thirdStep : IOptionsStep = {
  id: 3,
  name: "Ending Step",
  type: StepTypes.Options,
  introMessage: thirdStepIntro,
  options: [
    {
      key: 1,
      nextStep: 1,
      outboundMessages:  firstStepIntro,
      value: "Yes"
    },
    {
      key: 2,
      nextStep: 1,
      outboundMessages: [ "Ok, if you need something else just message me." ],
      value: "No"
    }
  ]

}

const secondStep : IOptionsStep = {
  id: 2,
  name: 'Menu',
  type: StepTypes.Options,
  introMessage: secondStepIntro,
  options: [
    {
      key: 1,
      value: "Shirt",
      nextStep: 3,
      outboundMessages: [
        "Color: Blue | Size: M | Price: $10",
        ...thirdStepIntro,
      ]
    },
    {
      key: 2,
      value: "Dress",
      nextStep: 3,
      outboundMessages: [
        "Color: Gray | Size: M | Price: $20",
        ...thirdStepIntro,
      ]
    }
  ]

}

const firstStep : IOptionsStep = {
  id: 1,
  name: 'Welcome Step',
  introMessage: firstStepIntro,
  options: [
    {
      key: 1,
      value: "See products",
      nextStep: 2,
      outboundMessages: secondStep.introMessage
    },
    {
      key: 1,
      value: "No, thank you",
      nextStep: 3,
      outboundMessages: firstStepIntro 
    }
  ],
  type: StepTypes.Options
}

const defaultSteps : Array<ISimpleStep | IOptionsStep> = [
  firstStep,
  secondStep,
  thirdStep
]

export default defaultSteps