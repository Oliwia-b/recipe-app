import potImage from "../assets/pot.png";

function Header() {
  return (
    <header>
      <h1> Kitchen Compass</h1>
      <img src={potImage} alt="pot" />
    </header>
  );
}

export default Header;
