import { useState, useCallback, useEffect } from 'react';
import { Container } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { FlatList } from 'react-native';
import { Header } from '../../components/Header';
import { HighLight } from '../../components/Highlight';
import { GroupCard } from '../../components/GroupCard';
import { ListEmpty } from '../../components/ListEmpty';
import { Button } from '../../components/Button';
import { groupsGetAll } from '../../storage/group/groupsGetAll';


export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  async function fetchGroups() {
    try {
      const storedGroups = await groupsGetAll()
      setGroups(storedGroups)
    }
    catch (err) {
      console.log(err)
    }
  }

  function HandleNewGroup() {
    navigation.navigate('new')
  }

  function GotoGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  return (
    <Container>
      <Header />
      <HighLight
        title={'Turmas'}
        subtitle={'Jogue com a sua turma'}
      />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => GotoGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty
            message={"Que tal cadastrar a primeira turma?"}
          />
        )}
      />
      <Button
        title={'Criar nova turma'}
        onPress={HandleNewGroup}
      />
    </Container>
  );
}