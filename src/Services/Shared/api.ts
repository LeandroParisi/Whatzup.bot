import { Service } from "typedi"
import BackendError from "../Abstractions/Errors/BackendError"

/* eslint-disable max-len */
const axios = require('axios')

interface IApi {
  method: string,
  endpoint: string,
  body?: any,
  headers?: any,
  otherOptions?: any
}

@Service()
export default class Api {
  private BaseUrl : string

  constructor(baseUrl : string) {
    this.BaseUrl = baseUrl
  }

  /**
   * Default fetcher for entire application
   * @param {string} method HTTP method to be used on request
   * @param {string} url Complet URL for the request: server + endpoint
   * @param {object} body Request body
   * @param {object} headers Request headers
   * @returns Object { ...responsePayload } Any relevant information returned by the API. It will always include a key message (even on errors)
  */
  private async MakeRequest<T>({
    method, endpoint, body = null, headers = null, ...otherOptions
  } : IApi) : Promise<T> {
    const options = {
      method,
      headers: headers && { ...headers },
      url: `${this.BaseUrl}${endpoint}`,
      data: body && { ...body },
      ...otherOptions,
    }

    const response = await axios(options)
    return response.data as T
  }

  async Request<T>(payload : IApi) : Promise<T> {
    try {
      return await this.MakeRequest<T>(payload)
    } catch (error) {
      console.log(error)
      const { response } = error
      throw new BackendError(response.status, response.data.error, error)
    }
  }
}




