import { useState } from "react";
import styles from "./page.module.css";

const File = ({ fileObject }: any) => {
  // show preview is an array of strings
  const [showPreview, setShowPreview] = useState<string[]>([]);;
  // const [previewContent, setPreviewContent] = useState('');

  const [isSummaryShown, setIsSummaryShown] = useState(false); // State to track if summary is shown


  const file = fileObject;

  const renderFilePreview = () => {
    if (!file) {
      return null;
    }

    if (file.type?.includes("image/")) {
      return <img src={URL.createObjectURL(file)} alt="File Preview" />;
    }

    if (file.type === "application/pdf") {
      return (
        <embed
          src={URL.createObjectURL(file)}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      );
    }

    return <p>Unsupported file format</p>;
  };
  const formatUnixTime = (unixTime: number): string => {
    let date = new Date(unixTime); // JavaScript uses milliseconds, so we need to multiply by 1000
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // JavaScript's getMonth() starts at 0 for January
    let day = date.getDate();

    return month + "-" + day + "-" + year;
  };
  const preview = (
    <div style={{ width: 200, backgroundColor: "grey", flex: 1 }}>
      {renderFilePreview()}
    </div>
  );

  function handleShowPreview() {
    // Assuming `file` is the file to preview
    const formData = new FormData();
    formData.append('image', file);
  
    fetch('http://localhost:5000/ocr', {
      // add cors
      mode: 'cors',
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      // convert json value into string
      const paragraphs = data.split('\n');
      // let dataString = data;
      // let dataString = JSON.stringify(data);
      // const dataString = JSON.stringify(data['extracted_text']);
      // setShowPreview(data);

      // format the data
      // dataString.replace(/\\n/g, '\n');

      setShowPreview(paragraphs); 
      setIsSummaryShown(true); // Update the state to indicate the summary has been shown
    })
    .catch(error => {
      console.error('Error fetching the summary:', error);
    });
  }; 

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 800 }}>
      {!isSummaryShown && (
        <>
          <div style={{ display: "flex", alignItems: "center", cursor: "move", height: 50, backgroundColor: "grey" }}>
            <button
              onClick={handleShowPreview}
              style={{ marginRight: 24, marginLeft: 4, width: 150 }}
            >
              Summarize Document
            </button>
            <p style={{ width: 400 }}> {file?.name}</p>
            <p style={{ marginLeft: 12, width: 200 }}>
              {formatUnixTime(file?.lastModified)}
            </p>
          </div>
        </>
      )}
      {/* This will now only show after the summary is fetched */}
      {isSummaryShown && (
  <div className={styles.summaryContainer} style={{ width: "100%", backgroundColor: "lightgrey" }}>
    {showPreview.map((paragraph, index) => (
      <p key={index} className={styles.previewParagraph}>{paragraph}</p> // Render each string in a <p> tag
    ))}
  </div>
)}
    </div>
  );
};

export default File;