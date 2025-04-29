const BASE_URL = import.meta.env.VITE_API_URL;

// TODO add JSDoc overhead
export const getBills = async (pageNumber: number, search: string) => {
  const response = await fetch(
    `${BASE_URL}/bills?jurisdiction=Missouri&per_page=20&page=${pageNumber}&q=${search}`
  );
  const data = await response.json();
  return data;
};

// TODO add JSDoc overhead
export const getBillDetails = async (billId: string) => {
  const response = await fetch(`${BASE_URL}/bills/${billId}`);
  const data = await response.json();
  return data;
};
