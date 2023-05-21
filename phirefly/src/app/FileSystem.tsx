"use client";
import React, { useState, useCallback, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import File from "./File";
import { FileContext } from "./FileContextProvider";

const Filesystem = () => {
  const { fileData } = useContext(FileContext);

  return (
    <DndProvider backend={HTML5Backend}>
      {fileData?.map((file: File) => (
        <File key={file.lastModified} file={file} />
      ))}
    </DndProvider>
  );
};

export default Filesystem;
