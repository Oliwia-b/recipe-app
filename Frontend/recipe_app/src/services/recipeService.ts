const API_URL = "https://recipe-app-oedw.onrender.com/api/generate-recipe";

export default async function generateRecipe(ingredientList: Set<string>) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ ingredients: [...ingredientList] }), // Change set (non possible to serialize) into array
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert(`Unexpected error: ${error}`);
    }
    return null;
  }
}
