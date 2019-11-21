import { Title } from '@patternfly/react-core';
import React, { forwardRef, HTMLAttributes, ReactElement, useRef } from 'react';
import { CanvasObject } from '../../canvas';
import { Coords } from '../../models';
import { Box } from './Box';

export interface IMappingsBoxProps extends HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  position: Coords;
  scrollable: boolean;
  title: string;
  rightAlign?: boolean;
  hidden?: boolean;
  children: (props: { ref: HTMLElement | null }) => ReactElement;
}
export const FieldsBox = forwardRef<HTMLDivElement, IMappingsBoxProps>(({
  width,
  height,
  position,
  scrollable,
  title,
  rightAlign = false,
  hidden = false,
  children,
  ...props
}, ref) => {
  const mappingsRef = useRef<HTMLDivElement | null>(null);
  return (
    <CanvasObject
      width={width}
      height={height}
      {...position}
    >
      <div
        ref={ref}
        style={{
          height: scrollable ? '100%' : undefined,
          opacity: hidden ? 0 : 1,
          padding: '0 0.5rem'
        }}
        {...props}
      >
        <Box
          header={
            <Title size={'2xl'} headingLevel={'h2'} style={{ textAlign: 'center' }}>
              {title}
            </Title>
          }
          rightAlign={rightAlign}
          ref={mappingsRef}
          style={{
            alignItems: 'center',
          }}
        >
          <div
            ref={ref}
            style={{
              height: scrollable ? '100%' : undefined,
              overflow: 'visible',
              display: 'flex',
              flexFlow: 'column',
              width: '100%',
            }}
            {...props}
          >
            {children({ ref: mappingsRef.current })}
          </div>
        </Box>
      </div>
    </CanvasObject>
  )
});