import { createContext, useContext } from 'react';

import data from '/data/data.json';
import { CardData } from '../utils/types';

const CardsContext = createContext(null);

export function CardsProvider({ children }: { children: React.ReactNode }) {
  return (
    <CardsContext.Provider value={data}>
      {children}
    </CardsContext.Provider>
  );
}

export function useCardsData() : CardData[] {
  return useContext(CardsContext) || [];
}