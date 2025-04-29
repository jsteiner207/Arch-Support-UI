import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Table from "../components/table/Table";
import { getBills } from "../api/billService";
import { Link } from "react-router-dom";
import { dateParser } from "../helper/helper";

interface Item {
  id: string;
  identifier: string;
  title: string;
  created_at: string;
}

function BillView() {
  const [page, setPage] = useState(1); // state of current page
  const [allResults, setAllResults] = useState([]); // state to store all results
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["missouri-bills", page, search],
    queryFn: () => getBills(page, search),
    staleTime: 500000,
  });

  useEffect(() => {
    if (data?.results) {
      setAllResults((prevResults) => [...prevResults, ...data.results]);
    }
  }, [data]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (error) return <div>{error.message}</div>;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
    setAllResults([]);
  }
  return (
    <>
      <br />
      <h1>Legislation Search</h1>
      <br />
      <div className="box-1">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchInput}
            placeholder="Filter bills by subject"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
        <Table>
          <thead>
            <tr>
              <th>identifier</th>
              <th>title</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {allResults.map((item: Item) => (
              <tr key={item.id}>
                <td>
                  <Link to={`/bills/${encodeURIComponent(item.id)}`}>
                    {item.identifier}
                  </Link>
                </td>
                <td>{item.title}</td>
                <td>{dateParser(item.created_at)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <button onClick={loadMore}>load more</button>
              </td>
            </tr>
            {isLoading && (
              <tr>
                <td>
                  <div>Loading more bills</div>
                </td>
              </tr>
            )}
          </tfoot>
        </Table>
      </div>
    </>
  );
}

export default BillView;
