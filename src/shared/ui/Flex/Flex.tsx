import type { CSSProperties, ElementType } from 'react';
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Flex.module.scss';

// 유틸리티 import
import type { SpacingSize } from '@/shared/types/css/SpacingSize';
import { toCssUnit } from '@/shared/utils';
import { toCssSpacing } from '@/shared/utils/css/toCssPadding';

// CSS Variable 타입 확장
interface CSSCustomProperties extends CSSProperties {
  '--flex-width'?: string | number;
  '--flex-height'?: string | number;
  '--flex-direction'?: string;
  '--flex-justify'?: string;
  '--flex-align'?: string;
  '--flex-gap'?: string | number;
  '--flex-wrap'?: string;
  '--flex-padding'?: string; // 추가됨
}

interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: React.ReactNode;

  width?: string | number;
  height?: string | number;
  direction?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  gap?: string | number;
  wrap?: CSSProperties['flexWrap'];

  // padding prop 추가 (숫자, 문자열, 혹은 객체)
  padding?: SpacingSize | number | string;
}

const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    {
      as: Component = 'div',
      children,
      className,
      width,
      height,
      direction,
      justify,
      align,
      gap,
      wrap,
      padding, // destructuring
      style,
      ...props
    },
    ref
  ) => {
    const cssVariables: CSSCustomProperties = {
      '--flex-width': toCssUnit(width || 'auto'), // width/height도 toCssUnit 활용 추천
      '--flex-height': toCssUnit(height || 'auto'),
      '--flex-direction': direction,
      '--flex-justify': justify,
      '--flex-align': align,
      '--flex-gap': toCssUnit(gap || 0),
      '--flex-wrap': wrap,

      // Padding 계산 로직 적용
      '--flex-padding': toCssSpacing(padding),

      ...style,
    };

    return (
      <Component
        ref={ref}
        className={classNames(styles.Flex, className)}
        style={cssVariables as CSSProperties}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Flex.displayName = 'Flex';

export default Flex;
