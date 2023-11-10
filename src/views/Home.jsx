import { useState, useContext } from "react";
import { ResultsContext } from "../context/ResultsContext";

import Logo from "../components/Logo";
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";

function Home() {
  const resultsContext = useContext(ResultsContext);
  const { results, setResults } = resultsContext;
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="Home" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Logo />
      <Search setResults={setResults} inputValue={inputValue} setInputValue={setInputValue} />
      <SearchResult results={results} inputValue={inputValue}/>
    </div>
  );
}

export default Home;
