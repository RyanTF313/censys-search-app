import { useContext, useEffect, useState } from "react";
import { SearchAPIService } from "../apis/SearchAPIService";
import { ErrorContext } from "../context/ErrorsContext";
import { ResultsContext } from "../context/ResultsContext";
import { PaginationContext } from "../context/PaginationContext";
import { RequestParamBuilderContext } from "../context/RequestParamBuilderContext";

function Search({ inputValue, setInputValue }) {
  const [loading, setLoading] = useState(false);
  const errorContext = useContext(ErrorContext);
  const resultsContext = useContext(ResultsContext);
  const paginationContext = useContext(PaginationContext);
  const requestParamBuilderContext = useContext(RequestParamBuilderContext);
  const { setErrors } = errorContext;
  const { results, setResults } = resultsContext;
  const { setPrev, setNext } = paginationContext;
  const { params, setParams } = requestParamBuilderContext;

  useEffect(() => {}, [results]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setParams({ ...params, ...{ q: e.target.value } });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    setLoading(true);
    const res = await SearchAPIService.search(params);
    if (res) {
      setLoading(false);
    }

    if (res.code !== 200) {
      setErrors(res);
      return;
    }

    setParams({ ...params, ...{ cursor: res.links.next } });
    setResults(res.hits);
    setPrev(res.links.prev);
    setNext(res.links.next);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div
      className="Search"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form
        className="HostSearch"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: " 24px 0",
        }}
      >
        <input
          type="text"
          name="input"
          id="search-input"
          value={inputValue}
          onChange={handleChange}
          style={{ minWidth: 600, minHeight: 50, fontSize: 24 }}
          placeholder="Search an IP address, name, protocol or field: value"
        />
        <button
          onClick={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            minWidth: 20,
            minHeight: 55,
            fontSize: 24,
            backgroundColor: "blue",
            color: "white",
            padding: 10,
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
