import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DialogButtonProps } from "../components/common/Modal/Modal";

interface ModalState {
  isOpen: boolean;
  title: string;
  description: string;
  buttons: DialogButtonProps[];
}

const initialState: ModalState = {
  isOpen: false,
  title: "",
  description: "",
  buttons: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Omit<ModalState, "isOpen">>) {
      state.isOpen = true;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.buttons = action.payload.buttons;
    },
    closeModal(state) {
      state.isOpen = false;
      state.title = "";
      state.description = "";
      state.buttons = [];
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
