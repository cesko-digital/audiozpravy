import { FetchResult, gql } from "@apollo/client"
import { client } from "./apiClient"
import { setAccessToken } from "../securePreferences"


const REGISTER_USER = gql`
mutation RegisterListerner($deviceID: String!) {
  registerListener(input: { deviceId:$deviceID }) {
    token
  }
}`

export function registerListener(deviceID: string) {
    client.mutate({ mutation: REGISTER_USER, variables: { deviceID: deviceID } })
        .catch((error) => {
            console.error(error)
        })
        .then((result: FetchResult) => {
            const token = result.data.registerListener.token
            if (token) {
                setAccessToken(token)
            }
        })
}