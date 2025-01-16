import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './Toolkit/UserSlicer.jsx'
import { Provider } from 'react-redux'
import AdminsReducer from './Toolkit/AdminsSlicer.jsx'
import ProductsReducer from './Toolkit/ProductsSlicer.jsx'
import PostsReducer from './Toolkit/PostsSlicer.jsx'
import GuidesReducer from './Toolkit/GuidesSlicer.jsx'
import ServiceReducer from './Toolkit/ServicesSlicer.jsx'
import GalleryReducer from './Toolkit/GallerySlicer.jsx'
import { Container } from './Components/Container/Container.jsx'

const store = configureStore({
  reducer: {
    user: UserReducer,
    admins: AdminsReducer,
    products: ProductsReducer,
    posts: PostsReducer,
    guides: GuidesReducer,
    service: ServiceReducer,
    gallery: GalleryReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Container>
      <App />
    </Container>
  </Provider>
)
