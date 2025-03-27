import { useQuery } from "@tanstack/react-query";
import { getPeople } from "../api/peopleService";
import Table from "../components/table/Table";

function PeopleView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["people"],
    queryFn: () => getPeople(),
  });

  if (isLoading) return <h1>loading</h1>;

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <br />
      <h1>People</h1>
      <br />
      <Table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Party</td>
            <td>Title</td>
            <td>photo</td>
          </tr>
        </thead>
        <tbody>
          {data.results.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.party}</td>
              <td>{item.current_role.title}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ height: "60px", width: "50px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default PeopleView;
