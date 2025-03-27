import "./app.scss";
import BillView from "./views/billView";
import BillDetails from "./views/billDetails";
import EventView from "./views/eventView";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, Route, Routes } from "react-router-dom";
import SignUp from "./components/signup";
import NotFound from "./views/NotFound";
import PeopleView from "./views/peopleView";

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">Arch Support</div>
          <ul className="nav">
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/bills">Legislation</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign up</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<h1>hello</h1>} />
        <Route path="/bills" element={<BillView />} />
        <Route path="/bills/:id" element={<BillDetails />} />
        <Route path="/events" element={<EventView />} />
        <Route path="/people" element={<PeopleView />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ReactQueryDevtools />
    </>
  );
}

export default App;
