import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import AppError from "../../utils/AppError";

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupsGetAll()

    const groupAlreadyExist = storedGroups.includes(newGroup)

    if (groupAlreadyExist) {
      throw new AppError('Já existe um grupo cadastrado com esse nome')
    }

    const storage = JSON.stringify([...storedGroups, newGroup])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)

  } catch (err) {
    throw err
  }
}