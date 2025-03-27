const BASE_URL = import.meta.env.VITE_API_URL;
const X_API_KEY = import.meta.env.VITE_API_KEY;

export const getPeople = async () => {
  const response = await fetch(
    `${BASE_URL}/people?jurisdiction=Missouri&per_page=20`,
    {
      headers: {
        "x-api-key": X_API_KEY,
      },
    }
  );
  return await response.json();
};
