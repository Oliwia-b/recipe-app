const API_URL = "https://recipe-app-oedw.onrender.com/api/ingredients";

export async function getIngredients() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
