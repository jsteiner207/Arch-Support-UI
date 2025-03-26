import Table from "../components/table/Table";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../api/eventService";
import { dateParser } from "../helper/helper";

function EventView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["missouri-events"],
    queryFn: () => getEvents(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <br />
      <h1>Event Search</h1>
      <br />
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Classification</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>{item.classification}</td>
              <td>{dateParser(item.start_date, true)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default EventView;
