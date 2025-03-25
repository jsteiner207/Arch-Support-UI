import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import Table from "./table/Table";
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
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    )
  );

  const [element, setElement] = useState(null);
  const [page, setPage] = useState(1); // state of current page
  const [allResults, setAllResults] = useState([]); // state to store all results

  const { data, isLoading, error } = useQuery({
    queryKey: ["missouri-bills", page],
    queryFn: () => getBills(page),
    staleTime: 500000,
  });

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    if (data?.results) {
      setAllResults((prevResults) => [...prevResults, ...data.results]);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [data, element]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (error) return <div>{error.message}</div>;
  return (
    <>
      <br />
      <h1>Legislation Search</h1>
      <br />
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
            <td ref={setElement}>
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
    </>
  );
}

export default BillView;
