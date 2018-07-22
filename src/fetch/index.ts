import 'whatwg-fetch'
import { stringify } from 'qs'

interface IResponseError extends Error {
  response?: Response
}

interface IResponse {
  code: number
  message: string
  [propName: string]: any
}

const SUCCESS = 200

const checkStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error: IResponseError = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = (response: Response) => {
  return response.json()
}

const responseProxy = (response: IResponse) => {
  const { code, message } = response
  if (code !== SUCCESS) {
    console.log(message)
  }
  return response
}

export const post = (uri: string, params: object) => {
  const body = stringify(params)
  return fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(responseProxy)
}
