export default async function login(username: string, password: string) {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
      }),
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
      return error.message;
    }
  }
}

export async function register(username: string, password: string) {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
      }),
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
      return error.message;
    }
  }
}
