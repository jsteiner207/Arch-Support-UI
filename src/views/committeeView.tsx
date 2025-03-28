import { useQuery } from "@tanstack/react-query";
import { getCommittees } from "../api/committeeService";

function CommitteeView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["missouri-events"],
    queryFn: () => getCommittees(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <br />
      <h1>Committees</h1>
      <br />
      <ul>
        {data.results.map((item: any) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

export default CommitteeView;
