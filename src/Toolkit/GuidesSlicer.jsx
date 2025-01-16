import { createSlice } from '@reduxjs/toolkit'

const GuidesSlicer = createSlice({
  name: 'Guides',
  initialState: {
    data: [],
    isAuth: false,
    isPending: false,
    isError: ''
  },
  reducers: {
    getGuidesPending (state) {
      state.isPending = true
      state.isError = ''
    },
    getGuidesSuccess (state, { payload }) {
      state.isAuth = true
      state.data = payload
      state.isPending = false
    },
    getGuidesError (state, { payload }) {
      state.isPending = false
      state.isError = payload
    }
  }
})

export const { getGuidesError, getGuidesPending, getGuidesSuccess } =
  GuidesSlicer.actions
export default GuidesSlicer.reducer
