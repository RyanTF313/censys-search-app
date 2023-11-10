import HostResultItem from "./HostResultItem";
function HostResultsList({ results }) {
  return (
    <div>
      {results.length > 0 && results.map((result) => (
        <HostResultItem key={result.ip} result={result} />
      ))}
    </div>
  );
}

export default HostResultsList;
