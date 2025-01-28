import styled from 'styled-components/native'
import { SafeAreaView } from "react-native-safe-area-context";

import { PropsWithTheme } from '../../theme'

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }: PropsWithTheme) => theme.COLORS.GRAY_600};
  padding: 24px;
`