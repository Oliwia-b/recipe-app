interface Props {
  addIngredient: (ingredient: string) => void;
}

function IngredientInput({ addIngredient }: Props) {
  function onSubmit(formData: FormData) {
    const newIngredient = formData.get("ingredient") as string;

    if (newIngredient) {
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
    </form>
  );
}

export default IngredientInput;
