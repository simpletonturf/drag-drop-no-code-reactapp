import React,{useState} from 'react'

export const ThemeContext = React.createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({primaryColor:'#000000',secColor:'#f1f1f1',fontFamily:'sans-serif'});
  
    return (
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  };
