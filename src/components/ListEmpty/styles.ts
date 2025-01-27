import styled, { css } from 'styled-components/native'

import { PropsWithTheme } from '../../theme'

export const Container = styled.View` 
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Message = styled.Text`
  text-align: center;

  ${({ theme }: PropsWithTheme) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_300};
  `}
`