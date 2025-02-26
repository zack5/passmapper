import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [selectedCardId, setSelectedCardId] = useState('');
  const [sortingOption, setSortingOption] = useState('location');

  return (
    <NavigationContext.Provider value={{
      selectedCardId,
      setSelectedCardId,
      sortingOption,
      setSortingOption
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationData() {
  return useContext(NavigationContext);
}