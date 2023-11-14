import HostResultItem from "./HostResultItem";
function HostResultsList({ results }) {
  return (
    <div className="ResultsList">
      {results.length > 0 ? results.map((result) => (
        <HostResultItem key={result.ip} result={result} />
      )) : 'No Results found'}
    </div>
  );
}

export default HostResultsList;
