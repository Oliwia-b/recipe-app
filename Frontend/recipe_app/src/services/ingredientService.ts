const API_URL = "http://localhost:5000/api/ingredients";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NDI4OTkxNiwianRpIjoiMzcyNTczMmUtMjA2My00ODA5LTkyODEtZDhhYTIwNGFjNTQ1IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFsYSIsIm5iZiI6MTc0NDI4OTkxNiwiY3NyZiI6ImVlNjA3OTViLWIyYzgtNDNhNC04OTJmLTJhMDdkYWIwNWVkZiIsImV4cCI6MTc0NDg5NDcxNn0.hf5hDfGpS0wbaUkRa1W95FJiiqUBl98Lf9bI0Fbtoz8";

export async function getIngredients() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "Unauthorized: Your session has expired. Please log in again."
        );
      }
      if (response.status === 403) {
        throw new Error(
          "Forbidden: You don't have permission to access this resource."
        );
      }
      if (response.status === 422) {
        throw new Error("Invalid request: Please check your request format.");
      }
      throw new Error(
        `Unexpected error ${response.status}: ${response.statusText}`
      );
    }
    const json = await response.json();
    return json;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    alert(message);
    return null;
  }
}

export async function postIngredient(ingredient: string) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${ingredient}` }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        data.error || `Error ${response.status}: ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert(`Unexpected error: ${error}`);
    }
    return null;
  }
}
