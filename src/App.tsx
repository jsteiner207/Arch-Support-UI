import "./app.scss";
import BillView from "./components/billview";
import BillDetails from "./components/billDetails";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, Route, Routes } from "react-router-dom";
import SignUp from "./components/signup";
import NotFound from "./views/NotFound";

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
              <Link to="/sign-up">Sign up</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<h1>hello</h1>} />
        <Route path="/bills" element={<BillView />} />
        <Route path="/bills/:id" element={<BillDetails />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ReactQueryDevtools />
    </>
  );
}

export default App;
