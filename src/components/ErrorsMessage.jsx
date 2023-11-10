function ErrorsMessage({ errors }) {
  return (
    <div
      className="errors-message"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        backgroundColor: "red",
        fontSize: "18px",
      }}
    >
      {!!errors.code && <p>{errors.code}</p>}
      {!!errors.status && <p>{errors.status}</p>}
      {!!errors.message && <p>{errors.message}</p>}
    </div>
  );
}

export default ErrorsMessage;
