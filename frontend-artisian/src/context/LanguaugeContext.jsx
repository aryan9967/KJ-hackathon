import { createContext, useContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedlanguage, setLanguage] = useState();

  function changeLanguge(language){
    console.log("language", language)
    localStorage.setItem('language', language)
  }

  return (
    <LanguageContext.Provider value={{ selectedlanguage, changeLanguge }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  return useContext(LanguageContext);
}
