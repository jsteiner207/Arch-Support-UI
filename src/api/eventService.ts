export const getEvents = async () => {
  const response = await fetch(
    `https://v3.openstates.org/events?jurisdiction=Missouri&per_page=20`,
    {
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
    }
  );
  return await response.json();
};
