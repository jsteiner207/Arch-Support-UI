const BASE_URL = import.meta.env.VITE_API_URL;
const X_API_KEY = import.meta.env.VITE_API_KEY;

// TODO add JSDoc overhead
export const getBills = async (pageNumber: number) => {
  const response = await fetch(
    `${BASE_URL}/bills?jurisdiction=Missouri&per_page=20&page=${pageNumber}`,
    {
      headers: {
        "x-api-key": X_API_KEY,
      },
    }
  );
  const data = await response.json();
  return data;
};

// TODO add JSDoc overhead
export const getBillDetails = async (billId: string) => {
  const response = await fetch(
    `${BASE_URL}/bills/${billId}?include=actions&include=votes&include=documents&include=sponsorships`,
    {
      headers: {
        "x-api-key": X_API_KEY,
      },
    }
  );
  const data = await response.json();
  return data;
};
