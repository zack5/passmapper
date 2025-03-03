import { createContext, useContext } from 'react';

import data from '/data/data.json';

const CardsContext = createContext(null);

export function CardsProvider({ children }) {
  return (
    <CardsContext.Provider value={data}>
      {children}
    </CardsContext.Provider>
  );
}

export function useCardsData() {
  return useContext(CardsContext);
}