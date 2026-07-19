import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "300px",
      }}
    >
      <ClipLoader
        color="#2563eb"
        size={60}
      />
    </div>
  );
}

export default Loader;