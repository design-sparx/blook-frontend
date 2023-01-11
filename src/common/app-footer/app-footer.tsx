import React from 'react';
import {createStyles, Text, Container, ActionIcon, Group, UnstyledButton, Image} from '@mantine/core';
import {Link} from 'react-router-dom';
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';
import {useAppSelector} from '../../hooks/hooks';
import LogoImg from '../../asset/img/logo.png';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

const data: { title: string, links: { link: string, label: string }[] }[] = [
  {
    'title': 'About',
    'links': [
      {
        'label': 'Features',
        'link': '#'
      },
      {
        'label': 'Pricing',
        'link': '#'
      },
      {
        'label': 'Support',
        'link': '#'
      },
      {
        'label': 'Forums',
        'link': '#'
      }
    ]
  },
  {
    'title': 'Project',
    'links': [
      {
        'label': 'Contribute',
        'link': '#'
      },
      {
        'label': 'Media assets',
        'link': '#'
      },
      {
        'label': 'Changelog',
        'link': '#'
      },
      {
        'label': 'Releases',
        'link': '#'
      }
    ]
  },
  {
    'title': 'Community',
    'links': [
      {
        'label': 'Join Discord',
        'link': '#'
      },
      {
        'label': 'Follow on Twitter',
        'link': '#'
      },
      {
        'label': 'Email newsletter',
        'link': '#'
      },
      {
        'label': 'GitHub discussions',
        'link': '#'
      }
    ]
  }
];

const AppFooter = (): JSX.Element => {
  const {classes} = useStyles();
  const {currentUser} = useAppSelector((state: any) => state.userReducer);

  const groups = data?.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <UnstyledButton
            p="md"
            sx={{display: 'flex', gap: 8}}
            component={Link}
            to={Boolean(currentUser) ? '/home' : '/'}
          >
            <Image src={LogoImg} height={24} width={24} fit="contain"/>
            <Text size="lg" weight={500}>Blook</Text>
          </UnstyledButton>
          <Text color="dimmed" className={classes.description}>
            You&apos;re only a stranger once
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © {new Date().getFullYear()} blook.com. All rights reserved.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg">
            <FaTwitter size={18}/>
          </ActionIcon>
          <ActionIcon size="lg">
            <FaFacebook size={18}/>
          </ActionIcon>
          <ActionIcon size="lg">
            <FaInstagram size={18}/>
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
};

export default AppFooter;
