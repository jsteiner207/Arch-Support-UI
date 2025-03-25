export const dateParser = (data: string) => {
  let date = new Date(data);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
