export const dateParser = (data: string, includeTime: boolean = false) => {
  const date = new Date(data);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(includeTime && {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
  });
};
