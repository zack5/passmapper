import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [selectedCardId, setSelectedCardId] = useState('');
  const [sortingOption, setSortingOption] = useState('location');
  const [continentSelected, setContinentSelected] = useState(null);
  const [cardHolderHovered, setCardHolderHovered] = useState(false);

  return (
    <NavigationContext.Provider value={{
      selectedCardId,
      setSelectedCardId,
      sortingOption,
      setSortingOption,
      continentSelected,
      setContinentSelected,
      cardHolderHovered,
      setCardHolderHovered
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationData() {
  return useContext(NavigationContext);
}