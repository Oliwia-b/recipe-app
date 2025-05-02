const API_URL = "http://localhost:5000/api/ingredients";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NjEyNjgxNywianRpIjoiOWMzMDIzNGYtZmJiYS00NjVmLWI2OTQtMDgzNWI0OGEzOWEyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3NDYxMjY4MTcsImNzcmYiOiIzZWYyMTBjYS1hNzMzLTRjMTYtOGQ5Mi1kZmIwNDA4NDIzMzYiLCJleHAiOjE3NDY3MzE2MTd9.xqH04N0ExH88wRWvn8UZ7Sfb4aDLsKX4SaJ3r3Z5bl0";

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
