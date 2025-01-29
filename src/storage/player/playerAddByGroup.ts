import AsyncStorage from "@react-native-async-storage/async-storage";
import AppError from '../../utils/AppError'

import { PLAYER_COLLECTION } from "../storageConfig";

import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playerGetByGroup } from "./playerGetByGroup";

export async function playerAddByGroup(newPLayer: PlayerStorageDTO, group: string) {
  try {
    const players = await playerGetByGroup(group)

    const playerAlreadyExists = players.filter(i => i.name === newPLayer.name)
    if (playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um time')
    }

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([...players, newPLayer]))
  }
  catch (err) {
    throw err
  }
}