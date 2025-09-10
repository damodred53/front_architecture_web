import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import SearchBarComponent from "../SearchBar/SearchBarComponent";
import './body.css';

const Body = () => {
  const [researchResults, setResearchResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 1; // nombre de documents par page

  // calculer les documents affichés sur la page actuelle
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = researchResults.slice(indexOfFirstResult, indexOfLastResult);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    console.log("le vrai résultat : ", researchResults);
  }, [researchResults]);

  return (
    <div className="body">   
      <h1 className="body-title">Entrez votre recherche ici…</h1>
      <SearchBarComponent onValueChange={setResearchResults} />

      <div className="results-section">
        {currentResults.length > 0 ? (
          currentResults.map((doc, index) => (
            <div className="document-result" key={index}>
              <h3 className="document-title">{doc.fileName}</h3>
              <div className="snippets">
                {doc.snippets.map((snippet: string, i: number) => (
                  <ul className="results-list" key={i}>
                    <li 
                    className="result-item snippet"
                    dangerouslySetInnerHTML={{ __html: snippet }}
                    ></li>

                  </ul>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Aucun résultat trouvé.</p>
        )}
      </div>

      {/* Pagination MUI */}
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
