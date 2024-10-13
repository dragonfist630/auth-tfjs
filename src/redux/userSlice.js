import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    dateOfBirth: '',
    userId: '',
    generatedId: '',
    error: '',
  },
  reducers: {
    setUser: (state, action) => {
      const { name, email, dateOfBirth, userId } = action.payload;
      state.name = name;
      state.email = email;
      state.dateOfBirth = dateOfBirth;
      state.userId = userId;
    },
    setGeneratedId: (state, action) => {
      state.generatedId = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.dateOfBirth = '';
      state.userId = '';
      state.generatedId = '';
    },
    clearError: (state) => {
      state.error = '';
    },
    clearId: (state) => {
      state.generatedId = '';
    },
  },
});

export const {
  setUser,
  setGeneratedId,
  setError,
  clearUser,
  clearId,
  clearError,
} = userSlice.actions;
export default userSlice.reducer;
