import { create } from 'zustand';

type CardModalStore = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

// (set) => { return {} } 이거는 function을 오픈하는거
// (set) => ({}) 이거는 그냥 위에과정을 쉽게 생략해주는 과정.
export const useCardModal = create<CardModalStore>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
