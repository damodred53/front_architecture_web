import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import './body.css';
import ButtonPDF from "../Buttons/ButtonPDF";
import SearchBar from "../SearchBar/SearchBar";

const Body = () => {
  const [researchResults, setResearchResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Valeur à envoyer au bouton pour la recherche dans le pdf
  const [searchValue, setSearchValue] = useState('');
  const resultsPerPage = 1;


  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = researchResults.slice(indexOfFirstResult, indexOfLastResult);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);

    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };
console.log("Body - researchResults:", researchResults);
  const titleFileName = currentResults.map(result => result.fileName);
  const positionInText = currentResults.map(result => result.occurrences[0]?.start || 0);
  const startInText = currentResults.map(result => result.occurrences[0]?.start || 0);
  const endInText = currentResults.map(result => result.occurrences[0]?.end || 0);

  return (
    <div className="body" data-testid="body-component">   
      <h1 className="body-title">Entrez votre recherche ici…</h1>
      <div className="search-bar-with-icon">

        <SearchBar onValueChange={setResearchResults} onSearchValueChange={setSearchValue} />
      </div>

      <div className="results_div" >

        {currentResults.length > 0 ? (
          currentResults.map((doc, index) => (
            <div className="document-result" key={index}>
              <h3 className="document-title">{doc.fileName}</h3>
              <div className="snippets results-section">
                {doc.snippets.map((snippet: string, i: number) => (
                  <ul className="results-list" key={i}>
                    <div>...</div>
                    <li 
                    className="result-item snippet"
                    >
                        ... <span dangerouslySetInnerHTML={{ __html: snippet }} /> ...
                    </li>
                    <ButtonPDF bookTitle={titleFileName[index]} position={positionInText[index]} searchWord={searchValue} start={startInText[index]} end={endInText[index]} />
                  </ul>
                ))}
              </div>
            </div>  
          ))
        ) 
         : (
          <p className="no-results">Aucun résultat trouvé.</p>
        )}
      </div>

      {researchResults.length > resultsPerPage && (
        <Pagination
          count={Math.ceil(researchResults.length / resultsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: 2 }}
        />
      )}
    </div>
  );
};

export default Body;
