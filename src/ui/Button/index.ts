import styled, { IStyledComponent } from 'styled-components';
import { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  lineHeight,
  LineHeightProps,
  space,
  SpaceProps
} from 'styled-system';

export type ButtonProps = PropsWithChildren
  & BorderProps
  & ColorProps
  & FontSizeProps
  & LineHeightProps
  & FontWeightProps
  & SpaceProps
  & ButtonHTMLAttributes<unknown>;

export const BaseButton: IStyledComponent<'web', ButtonProps> = styled.button`
  display: flex;
  cursor: pointer;
  ${color};
  ${border};
  ${fontSize};
  ${fontWeight};
  ${lineHeight};
  ${space};
`;

BaseButton.defaultProps = {
  border: 'none',
  borderRadius: 3,
  lineHeight: '36px',
  fontSize: [14, 18],
  px: 32,
};

export const PrimaryButton: IStyledComponent<'web', ButtonProps> = styled(BaseButton)`
  &:hover {
    color: ${({ theme }) => theme.colors.neutral['30']};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.primary['40']};
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.neutral['50']};
    cursor: not-allowed;
  }
`;

PrimaryButton.defaultProps = {
  bg: 'primary.50',
  color: 'neutral.10',
};

export const SecondaryButton: IStyledComponent<'web', ButtonProps> = styled(BaseButton)`
  &:hover {
    color: ${({ theme }) => theme.colors.neutral['60']};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.neutral['20']};
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.neutral['50']};
    cursor: not-allowed;
  }
`;

SecondaryButton.defaultProps = {
  bg: 'neutral.30',
  color: 'neutral.90',
};
