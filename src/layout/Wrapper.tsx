import {Col, Container, createStyles, Grid, MantineTheme} from '@mantine/core';
import React from 'react';
import {AppNav} from '../common/app-nav';
import {SidePanel} from '../common/side-panel';
import {ILayout} from '../constants';

interface WrapperProps {
  children: React.ReactNode
  layout: ILayout
  showSide: boolean
  showTopics?: boolean
  showRecent?: boolean
}

const useStyles = createStyles((theme: MantineTheme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 1.5,
    paddingBottom: theme.spacing.xl * 3
  }
}));

/**
 * layout
 * @param children
 * @param showTopics - show categories/topics
 * @param layout - define grid layout
 * @param showSide - show right side
 * @param showRecent - show recent posts
 * @param asHero - show container as hero
 * @constructor
 */
const Wrapper = ({children, showTopics, layout, showSide, showRecent}: WrapperProps): JSX.Element => {
  const {classes} = useStyles();

  return (
    <>
      <AppNav/>
      <Container className={classes.wrapper}>
        <Grid>
          <Col span={layout === 'One' ? 12 : 8}>
            {children}
          </Col>
          {showSide && (
            <Col span={layout === 'One' ? 12 : 4}>
              <SidePanel showTopics={showTopics} showRecent={showRecent} layout={layout}/>
            </Col>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Wrapper;
