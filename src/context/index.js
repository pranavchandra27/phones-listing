import { createContext, useState } from "react";

export const PhoneContext = createContext({});

const StateProvider = ({ children }) => {
  const [selectedPhone, setSelectedPhone] = useState(null);

  return (
    <PhoneContext.Provider
      value={{
        selectedPhone,
        setSelectedPhone,
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
};

export default StateProvider;
