import create from 'zustand';

const useOdontogramStore = create((set) => ({
  odontogramState: {},
  setOdontogramState: (id, toothState) => set((state) => ({
    odontogramState: {
      ...state.odontogramState,
      [id]: toothState,
    },
  })),
}));

export default useOdontogramStore;
