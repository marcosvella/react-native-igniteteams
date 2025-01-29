import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "../storageConfig";

import { playerGetByGroup } from "./playerGetByGroup";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await playerGetByGroup(group)
    const filteredPlayer = storage.filter(player => player.name !== playerName)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(filteredPlayer))
  }
  catch (err) {
    throw err
  }
}