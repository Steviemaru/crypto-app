import {useState, useEffect} from "react";

export  const useLocalStorage = (initialValue:any) => {
  const storedTasks = localStorage.getItem('assets');
  const [storage, setStorage] = useState(
    storedTasks ? JSON.parse(storedTasks) : initialValue
  );
  useEffect(() => {
    localStorage.setItem('assets', JSON.stringify(storage));
  }, [storage]);

  return [storage, setStorage];
};