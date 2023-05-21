import { useDrop } from "react-dnd";

const FileList = ({ id, children }) => {
  const [, drop] = useDrop(() => ({
    accept: "file",
    drop: () => ({ id }),
  }));

  return (
    <div ref={drop} style={{ border: "1px white" }}>
      {children}
    </div>
  );
};

export default FileList;
