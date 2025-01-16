import { createSlice } from '@reduxjs/toolkit'

const GallerySlicer = createSlice({
  name: 'Gallery',
  initialState: {
    data: [],
    isAuth: false,
    isPending: false,
    isError: ''
  },
  reducers: {
    getGalleryPending (state) {
      state.isPending = true
      state.isError = ''
    },
    getGallerySuccess (state, { payload }) {
      state.isAuth = true
      state.data = payload
      state.isPending = false
    },
    getGalleryError (state, { payload }) {
      state.isPending = false
      state.isError = payload
    }
  }
})

export const { getGalleryError, getGalleryPending, getGallerySuccess } =
  GallerySlicer.actions
export default GallerySlicer.reducer
