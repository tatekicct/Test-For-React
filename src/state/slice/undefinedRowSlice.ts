import { createSlice } from '@reduxjs/toolkit'

export const undefinedRowSlice = createSlice({
  name: 'undefinedRow',
  initialState: {
    value: false
  },
  reducers: {
    setHasUndefinedRow: (state, action) => {
      state.value  = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setHasUndefinedRow } = undefinedRowSlice.actions

export default undefinedRowSlice.reducer