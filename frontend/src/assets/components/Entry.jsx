const Entry = ({ courseName, date, status, onDeleteEntry }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        width: "100%",
        height: "40px",
        background: "white",
        borderBottom: "2px solid black",
        color: "green",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", width: "25%" }}>
        {courseName}
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "25%" }}>
        {date}
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "25%" }}>
        {status}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "30px",
          width: "25%",
        }}
      >
        <button
          style={{ background: "red", color: "white", width: "70%" }}
          onClick={() => {
            onDeleteEntry(date);
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default Entry;
