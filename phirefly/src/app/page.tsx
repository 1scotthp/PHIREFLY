//page.tsx
"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useContext, useState } from "react";
import FileSystem from "./FileSystem";
import { FileContext, FileContextProvider } from "./FileContextProvider";

function FileUploadComponent() {
  const { fileData, addNewFiles } = useContext(FileContext);
  const [files, setFiles] = useState<File[]>([]);

  // track if file is picked
  const [isFilePicked, setIsFilePicked] = useState(false);


  const sendFilesToServer = (files: any) => {
    // add stuff here
    const formData = new FormData();
    formData.append("image", files[0]);
    // fetch("http://localhost:5000/ocr", {
    //   // add cors
    //   mode: "cors",
    //   method: "POST",
    //   body: formData,
    // })
  };
  // add handleButtonClick function
  const handleButtonClick = () => {
    const fileInput = document.getElementById("hiddenFileInput");
    fileInput?.click();
  };

  const handleUpload = (event: any) => {
    const uploadedFiles: File[] = Array.from(event.target.files);
    if (uploadedFiles.length > 0) {
      setIsFilePicked(true); // Update the state to true when files are picked
    };
    addNewFiles(uploadedFiles);
    sendFilesToServer(uploadedFiles);
  };

  return (
    <div>
      {!isFilePicked && (
      <button className={styles.fileUploadBtn} onClick={handleButtonClick}>Please upload your health document</button>
      )}
      <input type="file"
       id="hiddenFileInput"
       multiple 
       onChange={handleUpload} 
       style={{ display: 'none' }} 
       /> 
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file?.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.main}>
      <FileContextProvider>
        <div className={styles.description}>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" PHIREFLY"}
            </a>
          </div>
        </div>

        <FileUploadComponent />
        <FileSystem />

        <div className={styles.grid}>
        </div>
      </FileContextProvider>
    </main>
  );
}
