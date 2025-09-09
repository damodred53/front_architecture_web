
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import './searchBarComponent.css'
import { Box } from '@mui/material';


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

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

const BlackSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: 'black'
}));



export default function PrimarySearchAppBar() {

  return (
    <Box sx={{ width: '90%'  }} className="search-bar">
          <Search>
            <SearchIconWrapper>
              <BlackSearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Entrez votre recherche ici…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
    </Box>
  );
}
