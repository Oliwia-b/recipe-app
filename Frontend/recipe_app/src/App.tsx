import IngredientsPage from "./pages/IngredientsPage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>} />

        <Route
          path="/dashboard"
          element={<IngredientsPage></IngredientsPage>}
        />
      </Routes>
    </>
  );
}

export default App;
