import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: boolean;
  user: {
    _id: string;
    email: string;
    name: string;
    role: string;
  };
}

const initialState: UserState = {
  isLoggedIn: false,
  user: {
    _id: "",
    email: "",
    name: "",
    role: "",
  },
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState["user"]>) {
      state.user = action.payload;
    },

    setLoginStatus(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLoginStatus } = UserSlice.actions;

export default UserSlice.reducer;
