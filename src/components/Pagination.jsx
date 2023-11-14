import { useContext } from "react";
import { SearchAPIService } from "../apis/SearchAPIService";
import { ResultsContext } from "../context/ResultsContext";
import { PaginationContext } from "../context/PaginationContext";
import { RequestParamBuilderContext } from "../context/RequestParamBuilderContext";

function Pagination() {
  const requestParamBuilderContext = useContext(RequestParamBuilderContext);

  const { prev, setPrev, next, setNext } = useContext(PaginationContext);
  const { setResults } = useContext(ResultsContext);
  const { params, setParams } = requestParamBuilderContext;

  const handleClick = (e) => {
    e.preventDefault();
    options[e.target.value]();
  };

  const nextPage = async () => {
    const res = await SearchAPIService.search({
      ...params,
      ...{ cursor: next },
    });
    setParams({ ...params, ...{ cursor: res.links.next } });
    setResults(res.hits);
    setPrev(res.links.prev);
    setNext(res.links.next);
  };

  const prevPage = async () => {
    const res = await SearchAPIService.search({
      ...params,
      ...{ cursor: prev },
    });
    setParams({ ...params, ...{ cursor: res.links.prev } });
    setResults(res.hits);
    setPrev(res.links.prev);
    setNext(res.links.next);
  };

  const options = {
    next: nextPage,
    prev: prevPage,
  };

  return (
    <div
      className="Pagination"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 24,
      }}
    >
      <div>
        <button
        className="PrevBtn"
          style={{ width: 200, height: 24 }}
          value={"prev"}
          onClick={handleClick}
        >
          Prev
        </button>
      </div>
      <div>
        <button
        className="NextBtn"
          style={{ width: 200, height: 24 }}
          value={"next"}
          onClick={handleClick}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
