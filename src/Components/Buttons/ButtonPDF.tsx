import { Button } from "@mui/material";
import { downloadPDF } from "../../Services/researchesServices";

type ButtonPDFprops = {
  bookTitle: string;
  position: number; 
};

const ButtonPDF = ({ bookTitle, position }: ButtonPDFprops) => {
    console.log("voici la position dans ButtonPDF:", position);
  const handleClick = () => {
    downloadPDF(bookTitle, position);
  };

  return (
    <Button onClick={handleClick} variant="text">
      Voir dans le PDF
    </Button>
  );
};

export default ButtonPDF;
