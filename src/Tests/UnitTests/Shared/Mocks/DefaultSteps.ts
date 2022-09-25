import StepTypes from "../../../../Domain/Steps/Enums/StepTypes"
import { IStep } from "../../../../Domain/Steps/ValueObjects/IStepInfo"
import IOptionsStep from "../../../../Domain/Steps/ValueObjects/OptionsStep/IOptionsStepInfo"

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
      selectionKey: 1,
      nextStep: 1,
      outboundMessages:  firstStepIntro,
      name: "Yes"
    },
    {
      selectionKey: 2,
      nextStep: 1,
      outboundMessages: [ "Ok, if you need something else just message me." ],
      name: "No"
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
      selectionKey: 1,
      name: "Shirt",
      nextStep: 3,
      outboundMessages: [
        "Color: Blue | Size: M | Price: $10",
        ...thirdStepIntro,
      ]
    },
    {
      selectionKey: 2,
      name: "Dress",
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
      selectionKey: 1,
      name: "See products",
      nextStep: 2,
      outboundMessages: secondStep.introMessage
    },
    {
      selectionKey: 1,
      name: "No, thank you",
      nextStep: 3,
      outboundMessages: firstStepIntro 
    }
  ],
  type: StepTypes.Options
}

const defaultSteps : Array<IStep | IOptionsStep> = [
  firstStep,
  secondStep,
  thirdStep
]

export default defaultSteps