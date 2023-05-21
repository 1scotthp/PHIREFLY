import { useState } from "react";
import { useDrag } from "react-dnd";

const File = ({ id, name, moveFile, file }) => {
  const [showPreview, setShowPreview] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "file",
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        moveFile(item.id, dropResult.id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const renderFilePreview = () => {
    if (!file) {
      return null;
    }

    if (file.type.includes("image/")) {
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

  const formatUnixTime = (unixTime) => {
    // const milliseconds = unixTime * 1000; // Convert Unix timestamp to milliseconds
    const date = new Date(unixTime);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleString(undefined, options);
  };

  const preview = (
    <div style={{ width: 200, backgroundColor: "grey", flex: 1 }}>
      {renderFilePreview()}
    </div>
  );

  return (
    <div
      ref={drag}
      style={{
        display: "flex",
        alignItems: "center",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        width: 800,
        height: 50,
        backgroundColor: "grey",
      }}
    >
      <button
        onClick={() => setShowPreview(!showPreview)}
        style={{ marginRight: 24, marginLeft: 4, width: 150 }}
      >
        Show Preview
      </button>
      <p style={{ width: 400 }}> {name}</p>

      <p style={{ marginLeft: 12, width: 200 }}>
        {formatUnixTime(file.lastModified)}
      </p>

      {showPreview && preview}
    </div>
  );
};

export default File;
