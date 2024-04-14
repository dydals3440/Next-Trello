import { create } from 'zustand';

type MobileSidebarStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// (set) => { return {} } 이거는 function을 오픈하는거
// (set) => ({}) 이거는 그냥 위에과정을 쉽게 생략해주는 과정.
export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
