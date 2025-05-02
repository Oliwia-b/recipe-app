import { useState } from "react";

interface Props {
  addIngredient: (ingredient: string) => void;
}

function IngredientInput({ addIngredient }: Props) {
  const [error, setError] = useState("");

  function onSubmit(formData: FormData) {
    const newIngredient = formData.get("ingredient") as string;

    if (newIngredient.length < 3) {
      setError("Ingredient must be at least 3 characters long.");
    } else {
      addIngredient(newIngredient);
      setError("");
    }
  }

  return (
    <form className="add-ingredient-form" action={onSubmit}>
      <input
        className="ingredient-input"
        type="text"
        name="ingredient"
        aria-label="Add ingredient"
        placeholder="e.g. butter"
      />
      <button className="add-ingredient-btn">Add ingredient</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default IngredientInput;
