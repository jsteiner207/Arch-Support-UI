import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBillDetails } from "../api/billService";
import Table from "../components/table/Table";
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
  const decodedId = decodeURIComponent(id);

  const { data, isLoading } = useQuery({
    queryKey: ["missouri-bills", decodedId],
    queryFn: () => {
      if (!decodedId) {
        throw new Error("Id is undefined");
      }
      return getBillDetails(decodedId);
    },
  });

  if (!id) return <div>id not found</div>;

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

      <br />
      <h1>Sponsorships</h1>

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.sponsorships.map((sponsor: any) => (
            <tr key={sponsor.id}>
              <td>{sponsor.name}</td>
              <td>{sponsor.person.party}</td>
              <td>{sponsor.person.current_role.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default BillDetails;
