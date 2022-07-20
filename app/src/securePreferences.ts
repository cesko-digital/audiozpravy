import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

const USER_IDENTIFIER_KEY = "user_identifier";
const PREFERRED_TOPICS = "preferred_topics";
const ACCESS_TOKEN = "access_token";

export const getUserUUID = async (): Promise<string> => {
  var userUUID = await SecureStore.getItemAsync(USER_IDENTIFIER_KEY);
  if (userUUID == null) {
    console.info("🔑 User UUID not found, let's generate one!");
    userUUID = uuid();
    await SecureStore.setItemAsync(USER_IDENTIFIER_KEY, userUUID);
    console.info("🔑 New user UUID = ", userUUID);
  } else {
    console.info("🔑 EXISTING user UUID = ", userUUID);
  }
  return userUUID;
};

export const setUserUUID = async (userUUID: string) => {
  return await SecureStore.setItemAsync(USER_IDENTIFIER_KEY, userUUID);
};

export const getPreferredTopics = async (): Promise<string[]> => {
  var preferredTopics: string[] = [];
  var strPreferredTopics = await SecureStore.getItemAsync(PREFERRED_TOPICS);
  if (strPreferredTopics != null) {
    preferredTopics = strPreferredTopics.split(",");
    console.info("🧵 preferredTopics=", preferredTopics);
  }
  return preferredTopics;
};

export const setPreferredTopics = async (topics: string[]) => {
  const merged = topics.join(",");
  return await SecureStore.setItemAsync(PREFERRED_TOPICS, merged);
};

export const getAccessToken = async (): Promise<string> => {
  const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
  return accessToken ?? "";
};

export const setAccessToken = async (token: string) => {
  return await SecureStore.setItemAsync(ACCESS_TOKEN, token);
};
