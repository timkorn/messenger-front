import UniversalLoader from "./common/loader";

function Loading() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <UniversalLoader size={50} />
    </div>
  );
}

export default Loading;
