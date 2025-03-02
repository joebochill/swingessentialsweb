import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { NotificationSettings } from '../../__types__'

const initialState: NotificationSettings = {
    lessons: true,
    marketing: true,
    newsletter: true,
    reminders: true,
}

export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {

    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer