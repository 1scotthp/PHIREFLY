"use client";
import React, { createContext, useState } from "react";

type FileContextType = {
  fileData: File[];
  addNewFiles: (newFileData: File[]) => void;
};

// Create the context
const FileContext = createContext<FileContextType>({
  fileData: [],
  addNewFiles: () => {},
});

// Create a provider component
const FileContextProvider = ({ children }: any) => {
  const [fileData, setFileData] = useState<File[]>([]);

  const addNewFiles = (newFileData: File[]) => {
    setFileData((fileData: File[]) => [...fileData, ...newFileData]);
  };

  return (
    <FileContext.Provider value={{ fileData, addNewFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export { FileContextProvider, FileContext };
