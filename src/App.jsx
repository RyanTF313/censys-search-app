import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HostResultList from "./components/HostResultsList";
import HostResultItem from "./components/HostResultItem";
import Home from "./views/Home";
import ErrorsMessage from "./components/ErrorsMessage";
import "./app.css";
import { ErrorContext } from "./context/ErrorsContext";
import { PaginationContext } from "./context/PaginationContext";
import { ResultsContext } from "./context/ResultsContext";
import { RequestParamBuilderContext } from "./context/RequestParamBuilderContext";

function App() {
  const [errors, setErrors] = useState({});
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [results, setResults] = useState();
  const [params, setParams] = useState({
    q: "",
    field: "",
    per_page: 50,
    virtual_host: "EXCLUDE",
    sort: "RELEVANCE",
    cursor: "",
  });

  return (
    <div>
      <ErrorsMessage errors={errors} />
      <ErrorContext.Provider value={{ errors, setErrors }}>
        <ResultsContext.Provider value={{ results, setResults }}>
          <PaginationContext.Provider value={{ prev, setPrev, next, setNext }}>
            <RequestParamBuilderContext.Provider value={{ params, setParams }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<HostResultItem />} />
                <Route path="/search/:host" element={<HostResultList />} />
              </Routes>
            </RequestParamBuilderContext.Provider>
          </PaginationContext.Provider>
        </ResultsContext.Provider>
      </ErrorContext.Provider>
    </div>
  );
}

export default App;
