import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

const URLroot = import.meta.env.VITE_API_BASE_URL;


pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const getResearches = async (query: string) => {
    console.log(URLroot);
    const response = await fetch(`${URLroot}/api/docs/search?q=${query}`);
    const data = await response.json();
    return data;
};

export const getHistoricResearches = async (query: string) => {
    const response = await fetch(`${URLroot}/FireBaseRecherche/recherche/${query}`);
    const data = await response.json();

  if (data && data.status === 404) {
    return [];
  }
  return data;
};

export const downloadPDF = async (bookTitle: string, position: number) => {
    try {
        const response = await fetch(`http://localhost:5030/api/pdf/1/8000/${encodeURIComponent(bookTitle)}?zoom=1.25`);
        if (!response.ok) {
            throw new Error("Erreur lors du téléchargement du PDF");
        }
        console.log(response);
        const blob = await response.blob();
        openPDFAtStart(blob, position);
        
    } catch (error) {
        console.error("Erreur lors du téléchargement du PDF :", error);
    }
  }

const managePDFDownloaded = (blob: Blob, bookTitle: string) => {
    const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${bookTitle}.pdf`; 
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
}   

const openPDFAtStart = async (blob: Blob, start: number) => {
  const url = window.URL.createObjectURL(blob); // ← corrige ici
  const pdf = await pdfjsLib.getDocument(url).promise;

  let targetPage = 1;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    const pageTextLength = textContent.items.reduce(
      (acc: number, item: any) => acc + (item.str?.length || 0),
      0
    );

    if (start <= pageTextLength) {
      targetPage = i;
      break;
    }

    start -= pageTextLength;
  }

  window.open(`${url}#page=${targetPage}`, "_blank");
};

const openPDFNewTab = (blob: Blob) => {
  const url = window.URL.createObjectURL(blob); // ← corrige ici aussi
  window.open(url, "_blank");
};