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

  const sendFilesToServer = (files: any) => {
    // add stuff here
  };

  const handleUpload = (event: any) => {
    const uploadedFiles: File[] = Array.from(event.target.files);
    addNewFiles(uploadedFiles);
    sendFilesToServer(uploadedFiles);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleUpload} />
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
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>
        </div>
      </FileContextProvider>
    </main>
  );
}
