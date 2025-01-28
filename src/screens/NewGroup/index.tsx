import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { Container, Content, Icon } from "./styles";

import { Header } from "../../components/Header";
import { HighLight } from "../../components/Highlight";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { groupCreate } from "../../storage/group/groupCreate";
import AppError from "../../utils/AppError";
import { Alert } from "react-native";


export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  async function HandleNew() {
    try {

      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', "Informe o nome da sua turma")
      }

      await groupCreate(group)
      navigation.navigate('players', { group })
    }
    catch (err) {
      if (err instanceof AppError) {
        Alert.alert('Novo Grupo', err.message)
      } else {
        Alert.alert('Novo Grupo', "Erro ao criar novo grupo")
      }
    }

  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <HighLight
          title={"Nova turma"}
          subtitle={"Crie a turma para adicionar as pessoas"}
        />
        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />
        <Button
          title={"Criar"}
          style={{ marginTop: 20 }}
          onPress={HandleNew}
        />
      </Content>
    </Container>
  )
}