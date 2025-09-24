import type { CSSAlign } from '@/shared/types/css/CSSAlign';
import type { CSSJustify } from '@/shared/types/css/CSSJustify';
import type { CSSLength } from '@/shared/types/css/CSSLength';
import type { SpacingSize } from '@/shared/types/css/SpacingSize';
import React from 'react';
import styles from './Flex.module.scss';
import type { CSSDirection } from '@/shared/types/css/CSSDirection';
import type { CSSWrap } from '@/shared/types/css/CSSWrap';
import type { CSSVariables } from '@/shared/types/css/CSSVariables';
import { toCssUnit } from '@/shared/utils';
import { toCssSacing } from '@/shared/utils/css/toCssPadding';
import classNames from 'classnames';

export type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  justify?: CSSJustify;
  direction?: CSSDirection;
  align?: CSSAlign;
  width?: CSSLength;
  height?: CSSLength;
  maxWidth?: CSSLength;
  padding?: SpacingSize;
  margin?: SpacingSize;
  gap?: SpacingSize;
  wrap: CSSWrap;
};

const Flex = ({
  children,
  direction,
  align,
  justify,
  gap,
  wrap,
  maxWidth,
  width,
  height,
  style,
  className,
  padding,
  margin,
  ...props
}: FlexProps) => {
  const cssVariables: CSSVariables = {
    '--flex-direction': direction,
    '--align-items': align,
    '--justify-content': justify,
    '--wrap': wrap,
    '--gap': toCssSacing(gap),
    '--width': toCssUnit(width),
    '--height': toCssUnit(height),
    '--padding': toCssSacing(padding),
    '--margin': toCssSacing(margin),
    '--max-width': toCssUnit(maxWidth),
  };

  return (
    <div {...props} className={classNames(styles.Flex, className)} style={{ ...cssVariables, ...style }}>
      {children}
    </div>
  );
};

export default Flex;
