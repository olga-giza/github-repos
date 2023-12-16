import { InputHTMLAttributes } from 'react';
import styled, { IStyledComponent } from 'styled-components';
import {
  border,
  BorderProps,
  color,
  ColorProps, flex, FlexProps,
  fontSize, FontSizeProps,
  fontWeight, FontWeightProps,
  lineHeight, LineHeightProps,
  space,
  SpaceProps,
} from 'styled-system';

type InputProps = BorderProps
  & ColorProps
  & SpaceProps
  & FontSizeProps
  & LineHeightProps
  & FontWeightProps
  & FlexProps
  & InputHTMLAttributes<unknown>;

export const Input: IStyledComponent<'web', InputProps> = styled.input`
  display: flex;
  box-sizing: border-box;
  ${border};
  ${color};
  ${fontSize};
  ${lineHeight};
  ${fontWeight};
  ${space};
  ${flex};
`;

Input.defaultProps = {
  borderColor: 'neutral.30',
  borderStyle: 'solid',
  borderRadius: 3,
  borderWidth: 1,
  bg: 'neutral.10',
  color: 'neutral.70',
  lineHeight: '36px',
  fontSize: [14, 18],
  px: '12px',
};

