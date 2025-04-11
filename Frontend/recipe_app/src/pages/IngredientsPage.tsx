// Manages state (ingredients)
// Fetches data from API
// Passes ingredients to IngredientList
// Passes handlers for adding/removing ingredients to IngredientInput

import { useEffect, useState } from "react";
import Header from "../components/Header";
import IngredientInput from "../components/IngredientInput";
import ListGroup from "../components/ListGroup";
import { getIngredients, postIngredient } from "../services/ingredientService";

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState(new Set<string>());

  function updateList() {
    getIngredients().then((data) => {
      if (data) setIngredients(new Set(data));
    });
  }
  // display ingredients list at the beggining
  useEffect(updateList, []);

  function addIngredient(ingredient: string) {
    // POST request and update ingrediend list if successful
    (async function () {
      const result = await postIngredient(ingredient);
      // console.log("result:", result);
      if (result) updateList();
    })();
  }

  function deleteIngredient(ingredient: string) {
    // 1. delete request
    // 2. get request
    // 3. update state
    console.log(ingredient);
  }

  return (
    <div>
      <Header></Header>
      <IngredientInput addIngredient={addIngredient}></IngredientInput>
      <ListGroup
        onItemClick={deleteIngredient}
        items={ingredients}
        heading="My ingredients"
      ></ListGroup>
    </div>
  );
}
