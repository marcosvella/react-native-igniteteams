import { useState } from 'react';
import { Container } from './styles';
import { useNavigation } from '@react-navigation/native'

import { FlatList } from 'react-native';
import { Header } from '../../components/Header';
import { HighLight } from '../../components/Highlight';
import { GroupCard } from '../../components/GroupCard';
import { ListEmpty } from '../../components/ListEmpty';
import { Button } from '../../components/Button';


export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  function HandleNewGroup() {
    navigation.navigate('new')
  }

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