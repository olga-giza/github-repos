import styled, { IStyledComponent } from 'styled-components';
import {
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  lineHeight,
  LineHeightProps,
  space,
  SpaceProps,
} from 'styled-system';
import { PropsWithChildren } from 'react';

export type TextProps = PropsWithChildren
  & FontSizeProps
  & FontWeightProps
  & LineHeightProps
  & ColorProps
  & SpaceProps;

export const Text: IStyledComponent<'web', TextProps> = styled.div`
  display: flex;
  box-sizing: border-box;

  ${fontSize};
  ${lineHeight};
  ${fontWeight};
  ${color};
  ${space};
`;

Text.defaultProps = {
  fontSize: ['14px', '16px'],
  lineHeight: ['22px', '26px'],
  color: 'neutral.70',
};

