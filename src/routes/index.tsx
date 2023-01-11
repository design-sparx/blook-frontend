import React, {Suspense} from 'react';
import {useRoutes} from 'react-router-dom';
import {AuthGuard} from '../guards';
import {
  AuthorPostsPage,
  CategoriesPage,
  CategoryPostsPage, EditProfilePage, Error404Page,
  HomePage, LandingPage,
  LoginPage, NewPostPage, RegisterPage,
  SearchPage, SignoutPage,
  SinglePostPage, UserProfilePage
} from '../pages';

const Router = (): JSX.Element => {
  return useRoutes([
    {
      path: '/',
      errorElement: <Error404Page/>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<>...</>}><LandingPage/></Suspense>,
          errorElement: <Error404Page/>
        },
        {
          path: '*',
          element: <Suspense fallback={<>...</>}>
            <Error404Page/>
          </Suspense>
        }
      ],
    },
    {
      path: 'home',
      errorElement: <div><h1>error</h1></div>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<>...</>}><HomePage/></Suspense>,
          errorElement: <Error404Page/>
        },
        {
          path: '*',
          element: <Suspense fallback={<>...</>}>
            <Error404Page/>
          </Suspense>
        }
      ],
    },
    {
      path: '@:authorSlug',
      errorElement: <Error404Page/>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<>...</>}><AuthorPostsPage/></Suspense>,
          errorElement: <Error404Page/>,
        },
        {
          path: ':postSlug',
          element: <Suspense fallback={<>...</>}><SinglePostPage/></Suspense>,
          errorElement: <Error404Page/>,
        }
      ]
    },
    {
      path: 'tag',
      errorElement: <div><h1>tag error</h1></div>,
      children: [
        {
          path: ':category',
          element: <Suspense fallback={<>...</>}><CategoryPostsPage/></Suspense>,
          errorElement: <Error404Page/>,
        }
      ]
    },
    {
      path: 'search',
      errorElement: <Error404Page/>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<>...</>}><SearchPage/></Suspense>,
          errorElement: <Error404Page/>,
        }
      ]
    },
    {
      path: 'categories',
      errorElement: <div><h1>categories error</h1></div>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<>...</>}><CategoriesPage/></Suspense>,
          errorElement: <Error404Page/>,
        }
      ]
    },
    {
      path: 'login',
      errorElement: <div><h1>login error</h1></div>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<>...</>}><LoginPage/></Suspense>,
          errorElement: <Error404Page/>,
        }
      ]
    },
    {
      path: 'register',
      errorElement: <Error404Page/>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<>...</>}><RegisterPage/></Suspense>,
          errorElement: <Error404Page/>,
        }
      ]
    },
    {
      path: 'new',
      errorElement: <Error404Page/>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<>...</>}>
            <AuthGuard><NewPostPage/></AuthGuard>
          </Suspense>,
          errorElement: <Error404Page/>,
        }
      ]
    },
    {
      path: 'account',
      errorElement: <Error404Page/>,
      children: [
        {
          path: '',
          element: <Suspense fallback={<>...</>}>
            <AuthGuard><UserProfilePage/></AuthGuard>
          </Suspense>,
          errorElement: <Error404Page/>,
        },
        {
          path: 'edit',
          element: <Suspense fallback={<>...</>}>
            <AuthGuard><EditProfilePage/></AuthGuard>
          </Suspense>,
          errorElement: <Error404Page/>,
        }
      ]
    },
    {
      path: 'signout',
      errorElement: <Error404Page/>,
      element: <Suspense fallback={<>...</>}>
        <SignoutPage/>
      </Suspense>,
    },
  ]) as JSX.Element;
};

export default Router;
