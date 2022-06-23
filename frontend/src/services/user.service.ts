import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setMessage } from "../reducers/message.reducer";
import { setLoginStatus, setUser } from "../reducers/user.reducer";

export const loginUser = createAsyncThunk(
  "/user/login",
  async (data: { email: string; password: string }, { dispatch }) => {
    try {
      const response = await axios.post("/user/login", data);
      const responseData = response.data;
      if (responseData.success) {
        dispatch(setUser(responseData.user));
      }
      dispatch(setLoginStatus(responseData.success));
      console.log(responseData.user.role);
      return { success: true, role: responseData.user.role };
    } catch (error: any) {
      console.log(error);
      dispatch(setLoginStatus(false));
      dispatch(
        setMessage({ message: error.response.data.message, variant: "error" })
      );

      return { success: false };
    }
  }
);

export const signinUser = createAsyncThunk(
  "/user/signin",
  async (
    data: {
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
      role: string;
    },
    { dispatch }
  ) => {
    try {
      console.log("Hi");
      const response = await axios.post("/user/signin", data);
      if (response.data.success) {
        dispatch(
          setMessage({
            message: "Account Created. Please Login To continue",
            variant: "success",
          })
        );
        return true;
      }
    } catch (error: any) {
      dispatch(
        setMessage({ message: error.response.data.message, variant: "error" })
      );
      return false;
    }
  }
);
