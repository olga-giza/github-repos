import styled, { IStyledComponent } from 'styled-components';
import {
  alignItems,
  AlignItemsProps,
  color,
  ColorProps,
  flex,
  flexDirection,
  FlexDirectionProps,
  FlexProps,
  height,
  HeightProps,
  justifyContent,
  JustifyContentProps, maxWidth, MaxWidthProps,
  overflow, OverflowProps,
  space,
  SpaceProps,
  width,
  WidthProps,
} from 'styled-system';
import { PropsWithChildren } from 'react';

export type BlockProps = PropsWithChildren
  & FlexProps
  & FlexDirectionProps
  & AlignItemsProps
  & JustifyContentProps
  & WidthProps
  & HeightProps
  & SpaceProps
  & ColorProps
  & OverflowProps
  & MaxWidthProps;

export const Block: IStyledComponent<'web', BlockProps> = styled.div`
  display: flex;
  box-sizing: border-box;

  ${flexDirection};
  ${justifyContent};
  ${alignItems};
  ${flex};
  ${height};
  ${width};
  ${maxWidth};
  ${space};
  ${color};
  ${overflow};
`;

Block.defaultProps = {
  flexDirection: 'column',
};

