import { Method } from "axios"

export enum WhatzupApiRoutes {
  ACCOUNT_MANAGEMENT = '/account-management',
  USER = '/user',
  AUTHENTICATION = '/authentication'
}

export const WhatzupApiEndpoint : Record<WhatzupApiRoutes, Record<string, EndpointDefinition>> = {
  [WhatzupApiRoutes.ACCOUNT_MANAGEMENT]: {
    getBot: {
      endpoint: '/bot',
      method: "GET"
    },
    createBot: {
      endpoint: '/bot',
      method: "POST"
    },
    updateBot: {
      endpoint: '/bot',
      method: "PUT"
    },
    activate: {
      endpoint: '/bot/activate',
      method: "PATCH"
    },
    deactivate: {
      endpoint: '/bot/deactivate',
      method: "PATCH"
    },
  },
  [WhatzupApiRoutes.USER]: {
    createUser: {
      endpoint: '/user',
      method: "POST"
    },
    updateUser: {
      endpoint: '/user',
      method: "PUT"
    }
  },
  [WhatzupApiRoutes.AUTHENTICATION]: {
    login: {
      endpoint: '/login',
      method: "POST"
    }
  }
}

export interface EndpointDefinition {
  endpoint: string
  method : Method
}