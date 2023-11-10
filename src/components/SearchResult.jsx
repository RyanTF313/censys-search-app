import HostResultsList from "./HostResultsList";
import Pagination from "./Pagination";

function SearchResult({ results, inputValue }) {
  return results ? (
    <div className="ResultsList">
      <HostResultsList results={results} />
      <Pagination inputValue={inputValue} />
    </div>
  ) : (
    <div className="ResultsList"></div>
  );
}

export default SearchResult;
