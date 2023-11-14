import HostResultsList from "./HostResultsList";
import Pagination from "./Pagination";

function SearchResult({ results, inputValue }) {
  return results ? (
    <div className="Results">
      <HostResultsList results={results} />
      <Pagination inputValue={inputValue} />
    </div>
  ) : (
    <div className="Results"></div>
  );
}

export default SearchResult;
