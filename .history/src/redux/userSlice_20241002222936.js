import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    dateOfBirth: '',
    userId: '',
  },
  reducers: {
    setUser: (state, action) => {
      const { name, email, dateOfBirth, userId } = action.payload;
      state.name = name;
      state.email = email;
      state.dateOfBirth = dateOfBirth;
      state.userId = userId;
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.dateOfBirth = '';
      state.userId = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
