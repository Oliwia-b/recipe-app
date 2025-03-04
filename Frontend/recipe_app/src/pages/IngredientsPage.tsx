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

  const [ingredients, setIngredients] = useState([
    "apple",
    "potatos",
    "butter",
  ]);

  function addIngredient(ingredient: string) {
    console.log(`${ingredient} added`);
  }

  return (
    <div>
      <Header></Header>
      <IngredientInput addIngredient={addIngredient}></IngredientInput>
      <ListGroup items={ingredients} heading="My ingredients"></ListGroup>
    </div>
  );
}
