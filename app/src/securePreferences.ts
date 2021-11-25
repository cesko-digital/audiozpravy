import * as SecureStore from 'expo-secure-store'
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

const USER_IDENTIFIER_KEY = 'user_identifier'
const PREFERRED_TOPICS = 'preferred_topics'

export type AppPreferences = {
    userUUID: string,
    preferredTopics: string[]
}

export const usePreferences = async (): Promise<AppPreferences> => {
    var userUUID = await SecureStore.getItemAsync(USER_IDENTIFIER_KEY)
    if (userUUID == null) {
        console.info('🔑 User UUID not found, let\'s generate one!')
        userUUID = uuid()
        await SecureStore.setItemAsync(USER_IDENTIFIER_KEY, userUUID);
        console.info('🔑 New user UUID = ', userUUID)
    } else {
        console.info('🔑 EXISTING user UUID = ', userUUID)
    }

    var strPreferredTopics = await SecureStore.getItemAsync(PREFERRED_TOPICS)
    var preferredTopics: string[] = []
    if (strPreferredTopics != null) {
        preferredTopics = strPreferredTopics.split(',')
        console.info('🧵 preferredTopics=', preferredTopics)
    }

    return {
        userUUID: userUUID,
        preferredTopics: preferredTopics
    }
}

export const savePreferredTopics = async (topics: string[]) => {
    const merged = topics.join(',')
    return SecureStore.setItemAsync(PREFERRED_TOPICS, merged)
}