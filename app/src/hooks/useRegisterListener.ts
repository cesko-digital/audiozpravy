import { setAccessToken } from "../securePreferences";
import { RegisterListernerDocument } from "../graphql/generated/schema";
import client from "../services/apiClient";

// This method is called in the main App(), outside of any FC.
// Hooks are not yet available here.
function registerListener(deviceID: string) {
  console.log("registerListener: deviceID=" + deviceID);
  client
    .mutate({
      mutation: RegisterListernerDocument,
      variables: { deviceID: deviceID },
    })
    .then((result) => {
      const token = result?.data?.registerListener?.token;
      if (token) {
        setAccessToken(token);
      }
    });
}
export function useRegisterListerner() {
  return registerListener;
}
