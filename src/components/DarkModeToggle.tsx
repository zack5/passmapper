import { useState } from 'react';
import { motion } from 'framer-motion';

import { useTheme } from './ThemeContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  function toggleDarkMode() {
    return setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light")
  }

  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: isHovered ? 1 : 0.3 }}
      exit={{ opacity: 0.3 }}
    >
      <DarkModeSwitch
        checked={theme === "dark"}
        onChange={toggleDarkMode}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        size={20}
      />
    </motion.div>
  )
}