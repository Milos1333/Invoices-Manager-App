import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  isOpen: false,
  message: "",
  description: "",
  type: "info",
  color: "",

  setNotification: (isOpen, type, message, description, color) =>
    set({ isOpen, type, message, description, color }),

  setClose: () =>
    set({ isOpen: false, message: "", description: "", type: "info" }),
}));
