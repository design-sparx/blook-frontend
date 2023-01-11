import React, {useEffect} from 'react';
import {MantineProvider} from '@mantine/core';
import {PortableTextComponentsProvider, toPlainText} from '@portabletext/react';
import slugify from 'slugify';
import Routes from './routes';
import {auth} from './firebase';
import {setUser} from './redux/actions/user';
import {useAppDispatch} from './hooks/hooks';
import './App.css';
import {ModalsProvider} from '@mantine/modals';
import {handleFetchAuthor} from './api';
import {IUser} from './constants';
import {RouteTransition} from './components/route-transition';
import {NotificationsProvider} from '@mantine/notifications';

/**
 * header in body as linkable
 * @param children
 * @param value
 * @constructor
 */
const LinkableHeader = ({children, value}: any) => {
  // `value` is the single Portable Text block of this header
  const slug = Boolean(value) ? slugify(toPlainText(value)) : '';
  return <h2 id={slug ?? ''}>{children}</h2>;
};

/**
 * sanity rich text editor texts
 */
const customPortableComponents = {
  types: {
    image: ({value}: any) => <img src={Boolean(value.imageUrl) ? value.imageUrl : undefined}/>,
    callToAction: ({value, isInline}: any) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction">{value.text}</div>
      ),
  },

  marks: {
    // Ex. 1: custom renderer for the em / italics decorator
    em: ({children}: any) => <em className="text-gray-600 font-semibold">{children}</em>,

    // Ex. 2: rendering a custom `link` annotation
    link: ({value, children}: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''}>
          {children}
        </a>
      );
    },
  },

  block: {
    // Ex. 1: customizing common block types
    h1: ({children}: any) => <h1 className="text-2xl">{children}</h1>,
    h2: LinkableHeader,
    blockquote: ({children}: any) => <blockquote className="border-l-purple-500">{children}</blockquote>,

    // Ex. 2: rendering custom styles
    customHeading: ({children}: any) => <h2 className="text-lg text-primary text-purple-700">{children}</h2>,
  },

  list: {
    // Ex. 1: customizing common list types
    bullet: ({children}: any) => <ul className="mt-xl">{children}</ul>,
    number: ({children}: any) => <ol className="mt-lg">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({children}: any) => <ol className="m-auto text-lg">{children}</ol>,
  },

  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({children}: any) => <li style={{listStyleType: 'disclosure-closed'}}>{children}</li>,

    // Ex. 2: rendering custom list items
    checkmarks: ({children}: any) => <li>✅ {children}</li>,
  },
};

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (Boolean(authUser)) {
        // res is an array pick 0
        handleFetchAuthor(authUser as unknown as IUser).then((res: any) => {
          dispatch(setUser(res[0]));
        }).catch(error => console.log(error));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <MantineProvider>
        <ModalsProvider>
          <NotificationsProvider position="top-right">
            <PortableTextComponentsProvider components={customPortableComponents}>
              <RouteTransition>
                <Routes/>
              </RouteTransition>
            </PortableTextComponentsProvider>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </div>
  );
};

export default App;
