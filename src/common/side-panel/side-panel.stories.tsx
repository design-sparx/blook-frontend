import React from 'react';
import SidePanel from './side-panel';
import {ILayout} from '../../constants';
import {Layout} from '../../constants/Layout';

export default {
  title: 'App navigation',
  component: SidePanel
};
const sampleLayout: ILayout = Layout.One;

export const Default = (): JSX.Element => <SidePanel layout={sampleLayout}/>;
