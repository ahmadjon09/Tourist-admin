import { createSlice } from '@reduxjs/toolkit'

const PostsSlicer = createSlice({
  name: 'Posts',
  initialState: {
    data: [],
    isAuth: false,
    isPending: false,
    isError: ''
  },
  reducers: {
    getPostsPending (state) {
      state.isPending = true
      state.isError = ''
    },
    getPostsSuccess (state, { payload }) {
      state.isAuth = true
      state.data = payload
      state.isPending = false
    },
    getPostsError (state, { payload }) {
      state.isPending = false
      state.isError = payload
    }
  }
})

export const { getPostsError, getPostsPending, getPostsSuccess } =
  PostsSlicer.actions
export default PostsSlicer.reducer
