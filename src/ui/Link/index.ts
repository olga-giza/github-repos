import styled, { IStyledComponent } from 'styled-components';
import { PropsWithChildren, AnchorHTMLAttributes } from 'react';
import { Text, type TextProps } from '../Typography';

export type LinkProps = PropsWithChildren & TextProps & AnchorHTMLAttributes<unknown>;

export const Link: IStyledComponent<'web', LinkProps> = styled(Text)`
  
`;

Link.defaultProps = {
  as: 'a',
  color: 'primary.50',
};
