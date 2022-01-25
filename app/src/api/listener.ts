import { FetchResult, gql } from "@apollo/client";
import { client } from "./apiClient";
import { setAccessToken } from "../securePreferences";

const REGISTER_USER = gql`
  mutation RegisterListerner($deviceID: String!) {
    registerListener(input: { deviceId: $deviceID }) {
      token
    }
  }
`;

export function registerListener(deviceID: string) {
  client
    .mutate({ mutation: REGISTER_USER, variables: { deviceID: deviceID } })
    .catch((error) => {
      console.error(error);
    })
    .then((result: FetchResult) => {
      const token = result.data.registerListener.token;
      if (token) {
        setAccessToken(token);
      }
    });
}

const LOG_ARTICLE_PLAY = gql`
  mutation PlayArticle($articleID: Int!) {
    playArticle(input: { articleId: $articleID }) {
      clientMutationId
    }
  }
`;

export function logArticlePlayed(articleID: number) {
  console.info("logArticlePlayed(" + articleID + ")");
  // TODO
  client
    .mutate({ mutation: LOG_ARTICLE_PLAY, variables: { articleID: articleID } })
    .catch((error) => {
      console.error(error);
    })
    .then((result: FetchResult) => {
      console.error("Article (" + articleID + ") play logged to BE.");
    });
}
