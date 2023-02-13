import React, {useState} from 'react';
import {Burger, Button, createStyles, Group, Header, Image, Text, UnstyledButton} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/hooks';
import LogoImg from '../../asset/img/logo.png';
import {FaGithub} from 'react-icons/fa';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    paddingTop: 4,
    position: 'sticky',
    boxShadow: theme.shadows.sm,
    border: 'none'
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    backgroundColor: 'transparent',
    textTransform: 'capitalize',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
      color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
    },
  },
  user: {
    display: 'block',
    padding: 2,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

export const menu: { link: string, label: string }[] = [
  {label: 'about us', link: '/about-us'},
  {label: 'contact', link: '/contact'},
];




/**
 * top app navigation
 * @constructor
 */
const HeroNav = (): JSX.Element => {
  const [opened, {toggle}] = useDisclosure(false);
  const isMobile = false;
  const {classes, cx} = useStyles();
  const [active, setActive] = useState('');
  const {currentUser} = useAppSelector((state: any) => state.userReducer);

  /**
   * menu items
   */
  const menuItems = menu.map(m =>
    <Button
      key={m.label}
      component={Link}
      to={m.link}
      className={cx(classes.link, {[classes.linkActive]: active === m.link})}
    >
      {m.label}
    </Button>
  );

  return (
    <Header height={64} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          {isMobile && <Burger opened={opened} onClick={toggle} size="sm"/>}
          <UnstyledButton
            p="md"
            sx={{display: 'flex', gap: 8}}
            component={Link}
            to={Boolean(currentUser) ? '/home' : '/'}
          >
            <Image src={LogoImg} height={24} width={24} fit="contain"/>
            <Text size="lg" weight={500}>Blook</Text>
          </UnstyledButton>
        </Group>
        <Group spacing={2}>
          {menuItems}
        </Group>
        <Group spacing="sm">
          <Button variant="outline" component={Link} to="/login">Log in</Button>
          <Button variant="filled" component={Link} to="/register">Create account</Button>
          <Button
            variant="subtle"
            leftIcon={<FaGithub size={18}/>}
            component="a"
            href="https://github.com/kelvins-lab/blook-frontend"
            target="_blank"
            className={classes.link}>
            Github</Button>
        </Group>
      </div>
    </Header>
  );
};

export default HeroNav;
