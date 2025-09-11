import { Button } from "@mui/material";
import { downloadPDF } from "../../Services/researchesServices";

type ButtonPDFprops = {
    bookTitle: string;
}

const ButtonPDF = ({ bookTitle }: ButtonPDFprops) => {


    const handleDownloadPDF = (bookTitle: string) => {
        console.log(bookTitle);
        downloadPDF(bookTitle);
    }

    return (
        <Button onClick={() => handleDownloadPDF(bookTitle)} variant="text">Voir dans le PDF</Button>
    )
}

export default ButtonPDF;