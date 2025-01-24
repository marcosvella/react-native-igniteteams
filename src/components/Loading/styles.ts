import styled from "styled-components/native";

import { PropsWithTheme } from "../../theme";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }: PropsWithTheme) => theme.COLORS.GRAY_600};
`

export const LoadIndicator = styled.ActivityIndicator.attrs(({ theme }: PropsWithTheme) => ({
  color: theme.COLORS.GREEN_700
}))`

`