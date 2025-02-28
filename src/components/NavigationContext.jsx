import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [selectedCardId, setSelectedCardId] = useState('');
  const [sortingOption, setSortingOption] = useState('location');
  const [continentSelected, setContinentSelected] = useState(null);

  return (
    <NavigationContext.Provider value={{
      selectedCardId,
      setSelectedCardId,
      sortingOption,
      setSortingOption,
      continentSelected,
      setContinentSelected
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationData() {
  return useContext(NavigationContext);
}