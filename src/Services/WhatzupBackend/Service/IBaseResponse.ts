export default interface BaseResponse<TResponse = void> {
  message : string

  data : TResponse
}
