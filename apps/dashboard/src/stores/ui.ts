import { create } from 'zustand';

/** 클라이언트 전역 상태 — 서버 데이터는 넣지 않는다. */
interface UiState {
  sidebarOpened: boolean;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpened: true,
  toggleSidebar: () => set((s) => ({ sidebarOpened: !s.sidebarOpened })),
}));
