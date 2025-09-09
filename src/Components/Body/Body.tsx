import SearchBar from "../SearchBar/SearchBar";
import './body.css';


const Body = () => {
    return (
        <div className="body">   
            <h1 className="body-title">Entrez votre recherche ici…</h1>
                <SearchBar />
        </div>
    )
}

export default Body;