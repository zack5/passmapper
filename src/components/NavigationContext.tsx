import { createContext, useContext, useState, ReactNode } from 'react';

import { SORTING_OPTION } from '../utils/constants';

interface NavigationContextType {
  selectedCardId: string;
  setSelectedCardId: (id: string) => void;
  sortingOption: SORTING_OPTION;
  setSortingOption: (option: SORTING_OPTION) => void;
  cardHolderHovered: boolean;
  setCardHolderHovered: (hovered: boolean) => void;
}

// Create context with proper type and provide a default value
const NavigationContext = createContext<NavigationContextType | null>(null);

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [sortingOption, setSortingOption] = useState<SORTING_OPTION>('location');
  const [cardHolderHovered, setCardHolderHovered] = useState<boolean>(false);

  return (
    <NavigationContext.Provider value={{
      selectedCardId,
      setSelectedCardId,
      sortingOption,
      setSortingOption,
      cardHolderHovered,
      setCardHolderHovered
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationData(): NavigationContextType {
  const context = useContext(NavigationContext);
  
  if (!context) {
    throw new Error('useNavigationData must be used within a NavigationProvider');
  }
  
  return context;
}