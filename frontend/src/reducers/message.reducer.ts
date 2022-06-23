import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMessage {
  message: string;
  variant: "success" | "error";
  toggle: boolean;
}

const initialState: IMessage = {
  message: "",
  variant: "success",
  toggle: true,
};

export const MessageSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    setMessage: (
      state,
      action: PayloadAction<{
        message: IMessage["message"];
        variant: IMessage["variant"];
      }>
    ) => {
      state.message = action.payload.message;
      state.variant = action.payload.variant;
      state.toggle = !state.toggle;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessage } = MessageSlice.actions;

export default MessageSlice.reducer;
