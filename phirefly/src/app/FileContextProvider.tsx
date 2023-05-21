"use client";
import React, { createContext, useState } from "react";

// Create the context
const FileContext = createContext({});

// Create a provider component
const FileContextProvider = ({ children }) => {
  const [fileData, setFileData] = useState<File>([]);

  const addNewFiles = (newFileData: string[]) => {
    setFileData((fileData) => [...fileData, ...newFileData]);
  };

  return (
    <FileContext.Provider value={{ fileData, addNewFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export { FileContextProvider, FileContext };
