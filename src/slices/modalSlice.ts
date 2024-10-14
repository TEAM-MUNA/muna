import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ButtonProps } from "../components/common/Button/Button";

interface ModalState {
  isOpen: boolean;
  title: string;
  description: string;
  buttons: {
    label: string;
    color: ButtonProps["color"];
    onClick: () => void;
  }[];
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
