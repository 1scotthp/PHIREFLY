import { useState } from "react";

const File = ({ fileObject }: any) => {
  const [showPreview, setShowPreview] = useState('');
  // const [previewContent, setPreviewContent] = useState('');
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
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // convert json value into string
      const dataString = JSON.stringify(data);
      // const dataString = JSON.stringify(data['extracted_text']);
      // setShowPreview(data);
      setShowPreview(dataString); 
      // Handle the preview data
      // display data to the screen
      // For example, setting it to state and then displaying it
    })
    .catch(error => {
      // Handle any errors here
    });
  }; 

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "move",
        width: 800,
        height: 50,
        backgroundColor: "grey",
      }}
    >
      <button
        onClick={handleShowPreview}
        style={{ marginRight: 24, marginLeft: 4, width: 150 }}
      >
        Show Preview
      </button>
      <div className="preview-container">
        {showPreview}
      </div>
      <p style={{ width: 400 }}> {file?.name}</p>

      <p style={{ marginLeft: 12, width: 200 }}>
        {formatUnixTime(file?.lastModified)}
      </p>

      {showPreview && preview}
    </div>
  );
};

export default File;
