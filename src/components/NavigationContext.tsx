import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { SORTING_OPTION } from '../utils/constants';

interface NavigationContextType {
  selectedCardId: string;
  setSelectedCardId: (id: string) => void;
  sortingOption: SORTING_OPTION;
  setSortingOption: (option: SORTING_OPTION) => void;
  cardHolderHovered: boolean;
  setCardHolderHovered: (hovered: boolean) => void;
  isDraggingCardHolder: boolean;
  setIsDraggingCardHolder: (dragging: boolean) => void;
  inspectingCardId: string;
  setInspectingCardId: (inspecting: string) => void;
  triggerScrollCardIntoView: boolean;
  setTriggerScrollCardIntoView: (trigger: boolean) => void;
  isMobile: boolean;
  setIsMobile: (mobile: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [sortingOption, setSortingOption] = useState<SORTING_OPTION>('color');
  const [cardHolderHovered, setCardHolderHovered] = useState<boolean>(false);
  const [isDraggingCardHolder, setIsDraggingCardHolder] = useState<boolean>(false);
  const [inspectingCardId, setInspectingCardId] = useState<string>('');
  const [triggerScrollCardIntoView, setTriggerScrollCardIntoView] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <NavigationContext.Provider value={{
      selectedCardId,
      setSelectedCardId,
      sortingOption,
      setSortingOption,
      cardHolderHovered,
      setCardHolderHovered,
      isDraggingCardHolder,
      setIsDraggingCardHolder,
      inspectingCardId,
      setInspectingCardId,
      triggerScrollCardIntoView,
      setTriggerScrollCardIntoView,
      isMobile,
      setIsMobile
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