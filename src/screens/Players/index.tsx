import { useCallback, useRef, useState } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { FlatList, Alert, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AppError from "../../utils/AppError";

import { playerAddByGroup } from "../../storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "../../storage/player/playerGetByGroupAndTeam";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Header } from "../../components/Header";
import { HighLight } from "../../components/Highlight";
import { ButtonIcon } from '../../components/ButtonIcon'
import { Input } from "../../components/Input";
import { Filter } from "../../components/Filter";
import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListEmpty";
import { Button } from "../../components/Button";
import { PlayerStorageDTO } from "../../storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "../../storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "../../storage/group/groupRemoveByName";
import { Loading } from "../../components/Loading";


type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')
  const inputRef = useRef<TextInput>(null)
  const navigation = useNavigation()

  const route = useRoute()
  const { group } = route.params as RouteParams

  async function HandleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar')
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group)
      setNewPlayerName('')
      inputRef.current?.blur()
      fetchPlayersByTeam()
    }
    catch (err) {
      if (err instanceof AppError) {
        return Alert.alert('Nova Pessoa', err.message)
      }

      return Alert.alert('Nova Pessoa', 'Não foi possível adicionar')
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const playersOnTeam = await playerGetByGroupAndTeam(group, team)
      setPlayers(playersOnTeam)
      setIsLoading(false)
    }
    catch (err) {
      if (err instanceof AppError) {
        return Alert.alert('Nova Pessoa', err.message)
      }

      return Alert.alert('Nova Pessoa', 'Não foi possível adicionar')
    }
  }

  async function HandleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    }
    catch (err) {
      return Alert.alert("Remover pessoa", 'Não foi possível remover pessoa')
    }
  }

  async function HandleRemoveGroup() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    }
    catch (err) {
      return Alert.alert("Remover Grupo", 'Não foi possível remover grupo')
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPlayersByTeam()
  }, [team]))

  return (
    <Container>
      <Header showBackButton />

      <HighLight
        title={group}
        subtitle={"Adicione a galera e separe os times"}
      />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          inputRef={inputRef}
          onSubmitEditing={HandleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon
          icon={"add"}
          type={"PRIMARY"}
          onPress={HandleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          horizontal
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      {isLoading ? <Loading /> :
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 }, players.length === 0 && { flex: 1 }
          ]}
          ListEmptyComponent={<ListEmpty message="Não há pessoas nesse time." />}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => HandleRemovePlayer(item.name)}
            />
          )}
        />
      }


      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={HandleRemoveGroup}
      />
    </Container>
  )
}