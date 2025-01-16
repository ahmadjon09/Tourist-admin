import React, { useEffect, useMemo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Axios from './Axios'
import {
  getUserError,
  getUserPending,
  getUserSuccess
} from './Toolkit/UserSlicer'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from './Pages/Loading/Loading'
import { Login } from './Pages/Auth/Login'
import { Dashboard } from './Pages/Dashboard/Dashboard'
import { RootLayout } from './Layout/RootLayout'
import { AuthLayout } from './Layout/AuthLayout'
import { Error } from './Pages/Error/Error'
import { UserUpdate } from './Pages/AdminForms/UserUpdate'
import { Admins } from './Pages/Admins/Admins'
import { Products } from './modules/Products/Products'
import { AddProduct } from './Pages/Form/AddProduct'
import { EditProduct } from './Pages/Form/EditProduct'
import { AddNewAdmin } from './Pages/AdminForms/AddNewAdmin'
import { Guides } from './modules/Guides/Guides'
import { AddGuide } from './modules/Guides/AddGuide'
import { Gallery } from './Pages/Gallery/Gallery'
import { AddPhoto } from './Pages/Gallery/AddPhoto'
import { Services } from './modules/service/Service'
import { AddService } from './modules/service/AddService'
import { Updete } from './modules/Guides/Updete'
import { UpdateService } from './modules/service/UpdeteService'

function App () {
  const dispatch = useDispatch()
  const { isAuth, isPending } = useSelector(state => state.user)

  useEffect(() => {
    async function getMyData () {
      try {
        dispatch(getUserPending())
        const response = (await Axios.get('admin/me')).data

        if (response.data) {
          dispatch(getUserSuccess(response.data))
        } else {
          dispatch(getUserError('No user data available'))
        }
      } catch (error) {
        dispatch(getUserError(error.response?.data || 'Unknown Token'))
      }
    }
    getMyData()
  }, [dispatch])

  const router = useMemo(() => {
    if (isPending) {
      return createBrowserRouter([
        {
          path: '/',
          element: <Loading />
        }
      ])
    }

    if (isAuth) {
      return createBrowserRouter([
        {
          path: '/',
          element: <RootLayout />,
          children: [
            {
              index: true,
              element: <Dashboard />
            },
            {
              path: 'admins',
              element: <Admins />
            },
            {
              path: 'edit-admin/:id',
              element: <UserUpdate />
            },
            {
              path: 'create-admin',
              element: <AddNewAdmin />
            },
            {
              path: 'products',
              element: <Products />
            },
            {
              path: 'products/edit/:id',
              element: <EditProduct />
            },
            {
              path: 'create-product',
              element: <AddProduct />
            },
            {
              path: 'guides',
              element: <Guides />
            },
            {
              path: 'create-guide',
              element: <AddGuide />
            },
            {
              path: 'guide-edit/:id',
              element: <Updete />
            },
            {
              path: 'gallery',
              element: <Gallery />
            },
            {
              path: 'create-photo',
              element: <AddPhoto />
            },
            {
              path: 'services',
              element: <Services />
            },
            {
              path: 'create-service',
              element: <AddService />
            },
            {
              path: 'service-edit/:id',
              element: <UpdateService />
            },
            {
              path: '*',
              element: <Error />
            }
          ]
        }
      ])
    }

    return createBrowserRouter([
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Login />
          },
          {
            path: '*',
            element: <Error />
          }
        ]
      }
    ])
  }, [isPending, isAuth])

  return <RouterProvider router={router} />
}

export default App
