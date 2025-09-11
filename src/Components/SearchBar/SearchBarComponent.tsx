
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import './searchBarComponent.css'
import { Box } from '@mui/material';
import { useState } from 'react';
import {getResearches} from '../../Services/researchesServices';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'whitesmoke',
  width: '100%',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  border: '1px solid black',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '140ch',
    },
  },
}));

const BlackSearchIcon = styled(SearchIcon)(() => ({
  paddingLeft: '10px',
  color: 'black',
  fontSize: '40px',
}));

interface SearchBarProps {
  onValueChange: (results: any[]) => void;
}


export default function PrimarySearchAppBar({ onValueChange }: SearchBarProps) {

  const [searchValue, setSearchValue] = useState<string>('');

  const handleResearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchValue(event.target.value);
  };

   const handleSearchIconClick = async () => {
    try {
      const response = await getResearches(searchValue);
      if (response && response.results) {
          onValueChange(response?.results);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
    <Box sx={{ width: '90%' }} className="search-bar">
      <Search sx={{ display: 'flex', alignItems: 'center' }}>

        <div onClick={handleSearchIconClick}>
          <BlackSearchIcon cursor="pointer"/>
        </div>
          
        <StyledInputBase
          placeholder="Entrez votre recherche ici…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchValue}    
          onChange={handleResearchChange}
        />
        
      </Search>
    </Box>
  );
}
