import create from "zustand";

export const useStore = create((set) => ({
  scholars: [],
  slpPrice: 0,
  totals: { average: {} },
  addScholar: (newScholar) =>
    // set((state) => ({ scholars: [...state.scholars, newScholar] })),
    set(() => ({ scholars: [...newScholar] })),
  removeScholar: (scholarAddress) =>
    set((state) => ({
      scholars: state.scholarAddress.filter(
        (scho) => scho.address !== scholarAddress
      ),
    })),
  editScholar: (editedScholar) =>
    set((state) => {
      let index = state.scholars.findIndex(
        (_scholar) => _scholar.address === editedScholar.address
      );
      state.scholars[index] = editedScholar;
      return state;
    }),
  setInitialState: (initialState) =>
    set((state) => ({ scholars: initialState })),
  appendData: (data, address) =>
    set((state) => {
      let index = state.scholars.findIndex(
        (_scholar) => _scholar.address === address
      );
      state.scholars[index] = { ...state.scholars[index], ...data };
      return state;
    }),
  setSlpPrice: (price) => set((state) => ({ ...state, slpPrice: price })),
}));
