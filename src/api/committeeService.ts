const BASE_URL = import.meta.env.VITE_API_URL;
const X_API_KEY = import.meta.env.VITE_API_KEY;

export const getCommittees = async () => {
  const response = await fetch(
    `${BASE_URL}/committees?jurisdiction=ocd-jurisdiction/country:us/state:mo/government&per_page=20`,
    {
      headers: {
        "x-api-key": X_API_KEY,
      },
    }
  );
  return await response.json();
};
