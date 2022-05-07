export default interface IValidatedStep {
  ValidateAnswer(userMessage : string) : boolean
}