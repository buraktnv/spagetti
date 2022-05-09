import { useEffect, useState } from "react";

const PREFIX = "";

const useLocalStorage = (key, initialValue) => {

  const [value, setValue] = useState(null);
  const prefixedKey = PREFIX + key;

  useEffect(() => {
    
  

  setValue(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue !== undefined || jsonValue !== null)
      return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });
    
  localStorage.setItem(prefixedKey, JSON.stringify(value));
    
  } ,[prefixedKey, value])


  return [value, setValue];
};
export default useLocalStorage;
