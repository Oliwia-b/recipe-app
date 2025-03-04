import potImage from "../assets/pot.png";

function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 10,
      }}
    >
      <div>
        <img style={{ height: 50 }} src={potImage} alt="pot" />
      </div>

      <h1 style={{ margin: 0, fontSize: "1.5rem" }}> Kitchen Compass</h1>
    </header>
  );
}

export default Header;
