import styled from "styled-components/native";
import { UsersThree } from 'phosphor-react-native'

import { PropsWithTheme } from "../../theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: PropsWithTheme) => theme.COLORS.GRAY_600};
  padding: 24px;
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`

export const Icon = styled(UsersThree).attrs(({ theme }: PropsWithTheme) => ({
  size: 56,
  color: theme.COLORS.GREEN_700,
}))`
align-self: center;
`