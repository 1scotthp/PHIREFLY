"use client";
import React, { useState, useCallback, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import File from "./File";
import FileList from "./FileList";
import { FileContext } from "./FileContextProvider";

const Filesystem = () => {
  const { fileData } = useContext(FileContext);

  const moveFile = useCallback((id, toListId) => {
    // Logic for moving file from one list to another
    // Modify this as needed
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <FileList id={1}>
        {fileData?.map((file) => (
          <File
            key={file.lastModified}
            file={file}
            name={file.name}
            moveFile={moveFile}
          />
        ))}
      </FileList>
    </DndProvider>
  );
};

export default Filesystem;
