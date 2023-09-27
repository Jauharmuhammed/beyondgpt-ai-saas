import { create } from "zustand";

interface useProModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useProModal = create<useProModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
