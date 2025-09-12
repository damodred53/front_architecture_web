import { Button } from "@mui/material";
import { downloadPDF, downloadPDFWithPage } from "../../Services/researchesServices";

type ButtonPDFprops = {
  bookTitle: string;
  position?: number;
  searchWord: string;
  start: number;
  end: number;
  index: number;
  fichierUrl: string;
  snippet: string;
  otherFichierUrl: string;
};

const ButtonPDF = ({ bookTitle, position, searchWord, start, end, index, fichierUrl, snippet, otherFichierUrl }: ButtonPDFprops) => {
  const handleClick = () => {

    const word = "pomme";
    const index = 1;
    // downloadPDF(bookTitle,  searchWord, start, end, index);
    downloadPDFWithPage(word, index, otherFichierUrl, snippet);
  };

  return (
    <Button onClick={handleClick} variant="text">
      Voir dans le PDF
    </Button>
  );
};

export default ButtonPDF;
