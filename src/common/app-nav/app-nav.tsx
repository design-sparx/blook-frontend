import React, {useState} from 'react';
import {
  Avatar,
  Burger,
  Button,
  createStyles,
  Group,
  Header,
  Image,
  Menu,
  Text,
  TextInput,
  UnstyledButton
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {FaGithub, FaPenNib, FaSearch, FaSignOutAlt} from 'react-icons/fa';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks/hooks';
import {urlFor} from '../../client';
import LogoImg from '../../asset/img/logo.png';

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

const menu: { link: string, label: string }[] = [
  {label: 'categories', link: '/categories'}
];

interface IProps {
  // this props serves to pass dummy data for storybookjs
  sampleUser?: any;
}

/**
 * top app navigation
 * @constructor
 */
const AppNav = ({sampleUser}: IProps): JSX.Element => {
  const [opened, {toggle}] = useDisclosure(false);
  const isMobile = false;
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const {classes, cx} = useStyles();
  const [active, setActive] = useState('');
  const {currentUser} = useAppSelector((state: any) => state.userReducer);
  const avatarImageUrl = Boolean(currentUser?.image) && urlFor(currentUser?.image).width(50).url();

  console.log(currentUser);
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

  /**
   * on enter pressed
   * @param event
   */
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      navigate({pathname: '/search', search: `?q=${searchTerm}`});
    }
  };

  /**
   * logout
   */
  const handleLogout = (): void => {
    navigate('/signout');
  };

  console.log(Boolean(currentUser));

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
          <TextInput
            className={classes.search}
            placeholder="Search blook"
            icon={<FaSearch size={14}/>}
            onKeyDown={handleKeyDown}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            value={Boolean(query) ? String(query) : searchTerm}
          />
        </Group>

        <Group>
          {menuItems}
          {(Boolean(currentUser) || Boolean(sampleUser)) &&
						<Button
							variant="light"
							component={Link}
							to="/new"
							leftIcon={<FaPenNib size={14}/>}
							title="create a new post"
						>
							Create post
						</Button>
          }
          {Boolean(currentUser) || Boolean(sampleUser) ?
            <>
              <Menu shadow="md" position="bottom-end" withArrow>
                <Menu.Target>
                  <UnstyledButton>
                    {Boolean(avatarImageUrl) ?
                      <Avatar src={avatarImageUrl} radius="md" title="account options"/> :
                      <Avatar src={null} variant="light" radius="md" title="account options"/>
                    }
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item component={Link} to="/account">{currentUser?.name || sampleUser?.name}</Menu.Item>
                  <Menu.Divider/>
                  <Menu.Item icon={<FaSignOutAlt size={14}/>} onClick={handleLogout}>Sign out</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </> :
            !Boolean(currentUser) && <>
							<Button variant="outline" component={Link} to="/login">Log in</Button>
							<Button variant="filled" component={Link} to="/register">Create account</Button>
						</>
          }
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

export default AppNav;
