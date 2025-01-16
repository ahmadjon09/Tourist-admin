import { createSlice } from '@reduxjs/toolkit'

const ServiceSlicer = createSlice({
  name: 'Service',
  initialState: {
    data: [],
    isAuth: false,
    isPending: false,
    isError: ''
  },
  reducers: {
    getServicePending (state) {
      state.isPending = true
      state.isError = ''
    },
    getServiceSuccess (state, { payload }) {
      state.isAuth = true
      state.data = payload
      state.isPending = false
    },
    getServiceError (state, { payload }) {
      state.isPending = false
      state.isError = payload
    }
  }
})

export const { getServiceError, getServicePending, getServiceSuccess } =
  ServiceSlicer.actions
export default ServiceSlicer.reducer
