import React, { useState, useEffect } from "react";

export const Context = React.createContext<any>({});

const Provider: React.FC<any> = ({ children }) => {
  const getLocalStorage = () => {
    let data: any = window.localStorage.getItem("myList");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [location, setLocation] = useState("");
  const [allList, setAllList] = useState([]);
  const [selectedList, setSelectedList] = useState<any>(getLocalStorage());

  useEffect(() => {
    window.localStorage.setItem("myList", JSON.stringify(selectedList));
  }, [selectedList]);

  return (
    <Context.Provider
      value={{
        location,
        setLocation,
        allList,
        selectedList,
        setAllList,
        setSelectedList,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default React.memo(Provider);
