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
    }
  }

  return (
    <form action={onSubmit}>
      <input
        type="text"
        name="ingredient"
        aria-label="Add ingredient"
        placeholder="e.g. butter"
      />
      <button>Add ingredient</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default IngredientInput;
