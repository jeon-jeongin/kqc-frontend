import { create } from 'zustand';

/**
 * 클라이언트 전역 상태 — 서버 데이터는 넣지 않는다 (어디에 둘지는 FRONTEND_GUIDE §2 결정표).
 * 새 스토어는 이 파일 형태로 stores/<이름>.ts 생성.
 * 컴포넌트에서는 필요한 값만 선택해 리렌더를 줄인다:
 *   const opened = useUiStore((s) => s.sidebarOpened);
 */
interface UiState {
  sidebarOpened: boolean;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpened: true,
  toggleSidebar: () => set((s) => ({ sidebarOpened: !s.sidebarOpened })),
}));
