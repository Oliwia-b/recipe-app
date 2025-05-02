import { useRef, useState } from "react";
import generateRecipe from "../services/recipeService";
import ReactMarkdown from "react-markdown";

interface Props {
  ingredients: Set<string>;
}

export default function Recipe({ ingredients }: Props) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const recipeRef = useRef<HTMLDivElement | null>(null);

  async function handleClick() {
    setLoading(true);
    setRecipe(null);

    const result = await generateRecipe(ingredients);

    if (result) {
      setRecipe(result.recipe);
    }
    setLoading(false);
  }

  return (
    <div className="recipe-wrapper">
      <button className="generate-recipe-btn" onClick={handleClick}>
        Generate Recipe
      </button>
      {loading && <div className="loader"></div>}
      {recipe && (
        <section className="recipe" ref={recipeRef} aria-live="polite">
          <ReactMarkdown>{recipe}</ReactMarkdown>
        </section>
      )}
    </div>
  );
}
