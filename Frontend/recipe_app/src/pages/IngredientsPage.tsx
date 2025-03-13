// Manages state (ingredients)
// Fetches data from API
// Passes ingredients to IngredientList
// Passes handlers for adding/removing ingredients to IngredientInput

import { useState } from "react";
import Header from "../components/Header";
import IngredientInput from "../components/IngredientInput";
import ListGroup from "../components/ListGroup";

export default function IngredientsPage() {
  // ingredientsList will be fetched from database

  const [ingredients, setIngredients] = useState(
    new Set(["apple", "potatos", "butter"])
  );

  function addIngredient(ingredient: string) {
    setIngredients(
      (prevIngredients) => new Set([...prevIngredients, ingredient])
    );
    console.log(`${ingredient} added`);
  }

  function deleteIngredient(ingredient: string) {
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
