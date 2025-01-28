import { TouchableOpacityProps } from 'react-native'
import { Container, Title, ButtonTypeStyleProps } from './styles'
import { useNavigation } from '@react-navigation/native';

type Props = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeStyleProps
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  const navigation = useNavigation()

  return (
    <Container {...rest} type={type}>
      <Title>
        {title}
      </Title>
    </Container>
  )
}