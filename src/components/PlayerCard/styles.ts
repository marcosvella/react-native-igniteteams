import styled, { css } from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';

import { PropsWithTheme } from "../../theme";

export const Container = styled.View`
  width: 100%;
  height: 50px;

  background-color: ${({ theme }: PropsWithTheme) => theme.COLORS.GRAY_500};
  border-radius: 6px;

  flex-direction: row;
  align-items: center;

  margin-bottom: 16px;
`

export const Name = styled.Text`
  flex: 1;

  ${({ theme }: PropsWithTheme) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_200};
  `};
`

export const Icon = styled(MaterialIcons).attrs(({ theme }: PropsWithTheme) => ({
  size: 24,
  color: theme.COLORS.GRAY_200
}))`
  margin-left: 16px;
  margin-right: 4px;
`