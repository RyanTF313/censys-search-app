function Logo() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: '30px auto'
      }}
    >
      <img
        src="https://search.censys.io/static/img/censys-2022.svg"
        alt="Censys Logo"
      />
    </div>
  );
}

export default Logo;
