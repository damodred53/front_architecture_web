import { Button } from "@mui/material";
import { downloadPDF } from "../../Services/researchesServices";

type ButtonPDFprops = {
  bookTitle: string;
  position?: number;
  searchWord: string;
  start: number;
  end: number;
  index: number;
};

const ButtonPDF = ({ bookTitle, position, searchWord, start, end, index }: ButtonPDFprops) => {
    console.log("voici la position dans ButtonPDF:", position);
  const handleClick = () => {
    downloadPDF(bookTitle,  searchWord, start, end, index);
  };

  return (
    <Button onClick={handleClick} variant="text">
      Voir dans le PDF
    </Button>
  );
};

export default ButtonPDF;
