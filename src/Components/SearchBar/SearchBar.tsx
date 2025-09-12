import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { getHistoricResearches, getResearches } from '../../Services/researchesServices';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  onValueChange: (results: any[]) => void;
  onSearchValueChange: (value: string) => void;
}

export default function SearchBar({ onValueChange, onSearchValueChange }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      console.log("Fetching suggestions for:", searchValue);
      if (searchValue.trim() === '') {
        setOptions([]);
        return;
      } 

      try {
        const result = await getHistoricResearches(searchValue);
        
        if (Array.isArray(result)) {
          const mots = result.map((item: any) => item.mot);
          setOptions(mots);
        } else {
          setOptions([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'historique :", error);
        setOptions([]);
      }
    };

    fetchSuggestions();
  }, [searchValue]);

  const handleSearchClick = async () => {

    if (searchValue.trim() === '') {
      return;
    }
    try {
      const response = await getResearches(searchValue);
      if (response && response.results) {
        onValueChange(response.results);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
    <>
      <SearchIcon
        onClick={handleSearchClick}
        className="search-icon"
        style={{ width: 44, height: 44, cursor: 'pointer' }}
      />
      <Stack className="searchBarStack" sx={{ width: 700 }}>
        <Autocomplete
          id="free-solo-2-demo"
          options={options}
          freeSolo
          inputValue={searchValue}
          onInputChange={(_, value) => {
            setSearchValue(value);
            onSearchValueChange?.(value);
          }}
          onChange={(_, value) => {
            if (typeof value === 'string') {
              setSearchValue(value);
              
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Votre recherche"
              style={{ width: 600 }}
              type="search"
            />
          )}
        />
      </Stack>
    </>
  );
}
