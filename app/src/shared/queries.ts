import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
mutation RegisterListerner($deviceID: String!) {
  registerListener(input: { deviceId:$deviceID }) {
    token
  }
}
`