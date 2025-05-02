// Manages state (ingredients)
// Fetches data from API
// Passes ingredients to IngredientList
// Passes handlers for adding/removing ingredients to IngredientInput

import { useEffect, useState } from "react";
import Header from "../components/Header";
import IngredientInput from "../components/IngredientInput";
import ListGroup from "../components/ListGroup";
import Recipe from "../components/Recipe";
import {
  getIngredients,
  postIngredient,
  deleteIngredient,
} from "../services/ingredientService";

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState(new Set<string>());

  function updateList() {
    getIngredients().then((data) => {
      if (data) setIngredients(new Set(data));
    });
  }

  // display ingredients list at the beggining
  useEffect(updateList, []);

  function handleAddIngredient(ingredient: string) {
    // make a POST request and update ingredients list if added successfully
    (async function () {
      const result = await postIngredient(ingredient);
      // console.log("result:", result);
      if (result) updateList();
    })();
  }

  function handleDeleteIngredient(ingredient: string) {
    // make a DELETE request and update ingredients list if removed successfully
    (async function () {
      const result = await deleteIngredient(ingredient);
      console.log("result:", result);
      if (result) updateList();
    })();
  }

  return (
    <div>
      <Header></Header>
      <main>
        <div className="main-content-wrapper">
          <IngredientInput
            addIngredient={handleAddIngredient}
          ></IngredientInput>
          <ListGroup
            onItemClick={handleDeleteIngredient}
            items={ingredients}
            heading="My ingredients"
          ></ListGroup>
          <Recipe ingredients={ingredients}></Recipe>
        </div>
      </main>
    </div>
  );
}
