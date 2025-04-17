const API_URL = "http://localhost:5000/api/ingredients";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NDU2OTkyOCwianRpIjoiNWFkZTZmMDktMzg5MS00ZGZlLWI4MDEtZmE1NDQ1NDRiNTU5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3NDQ1Njk5MjgsImNzcmYiOiJkMGY1Y2UyZC1lMGYwLTRhZGYtOTE2Ny1kMTUxNTU3MzJkZTQiLCJleHAiOjE3NDUxNzQ3Mjh9.YhTQihu6j0lajZKn_-HzhZUx0oJxYv1mCzqYhjOfVos";

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
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `Error ${response.status}: ${response.statusText}`
      );
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

export async function deleteIngredient(ingredient: string) {
  try {
    const response = await fetch(`${API_URL}/${ingredient}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.error ||
          `Unexpected error ${response.status}: ${response.statusText}`
      );
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
