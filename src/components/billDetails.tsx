import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBillDetails } from "../api/billService";
import Table from "./table/Table";
import { dateParser } from "../helper/helper";

interface Action {
  id: string;
  organization: {
    name: string;
  };
  description: string;
  date: string;
}

function BillDetails() {
  const { id } = useParams();

  if (!id) return <div>id not found</div>;

  const decodedId = decodeURIComponent(id);

  const { data, isLoading } = useQuery({
    queryKey: ["missouri-bills", decodedId],
    queryFn: () => {
      if (!decodedId) {
        throw new Error("Id is undefined");
      }
      return getBillDetails(decodedId);
    },
    staleTime: 500000,
  });

  if (isLoading) return <h1>loading</h1>;
  return (
    <>
      <br />
      <h1>Title: {data.title}</h1>
      <br />
      <h2>Origin: {data.from_organization.name}</h2>
      <br />

      <h1>Actions</h1>
      <Table>
        <thead>
          <tr>
            <th>Organization</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.actions.map((action: Action) => (
            <tr key={action.id}>
              <td>{action.organization.name}</td>
              <td>{action.description}</td>
              <td>{dateParser(action.date)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default BillDetails;
