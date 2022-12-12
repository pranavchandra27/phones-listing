import { createContext, useState } from "react";

export const PhoneContext = createContext({});

const StateProvider = ({ children }) => {
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState({
    symbol: "$",
    rate: 1,
    name: "USD",
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvIJVNXA7-ELMXEh5_I6wVZVwfnrYtenf-qG_IQViC&s`,
  });

  return (
    <PhoneContext.Provider
      value={{
        selectedPhone,
        setSelectedPhone,
        selectedCurrency,
        setSelectedCurrency,
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
};

export default StateProvider;
