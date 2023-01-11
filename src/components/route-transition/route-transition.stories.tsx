import React from 'react';
import RouteTransition from './route-transition';

export default {
  title: 'Route navigation progress bar',
  component: RouteTransition
};

interface IDefaultProps {
  children: React.ReactNode
}

export const Default = ({children}: IDefaultProps): JSX.Element => <RouteTransition>{children}</RouteTransition>;
