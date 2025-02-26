import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [selectedCardId, setSelectedCardId] = useState('');

  return (
    <NavigationContext.Provider value={{ selectedCardId, setSelectedCardId }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationData() {
  return useContext(NavigationContext);
}