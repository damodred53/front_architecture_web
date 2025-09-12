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

export const downloadPDF = async (bookTitle: string, searchWord: string, _start: number, _end: number, index: number) => {
  try {
    const response = await fetch(
      `${URLroot}/api/pdf/1/8000/${encodeURIComponent(bookTitle)}?zoom=1.25`
    );
    if (!response.ok) {
      throw new Error("Erreur lors du téléchargement du PDF");
    }

    const blob = await response.blob();
    openPDFOnNthOccurrence(blob, searchWord, index);
  } catch (error) {
    console.error("Erreur lors du téléchargement du PDF :", error);
  }
};

const findWordPositions = (pageText: string, word: string) => {
  const positions: { start: number; end: number }[] = [];
  let startIndex = 0;

  while ((startIndex = pageText.indexOf(word, startIndex)) !== -1) {
    positions.push({ start: startIndex, end: startIndex + word.length });
    startIndex += word.length;
  }

  return positions;
};


const openPDFOnNthOccurrence = async (blob: Blob, searchWord: string, index: number) => {
  const url = window.URL.createObjectURL(blob);
  const pdf = await pdfjsLib.getDocument(url).promise;

  let currentOccurrenceCount = 0;
  let targetPage = 1;


  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(" ");


    const positions = findWordPositions(pageText, searchWord);

    for (const _position of positions) {
      currentOccurrenceCount++;


      if (currentOccurrenceCount === index) {
        targetPage = pageNumber;
        break;
      }
    }


    if (currentOccurrenceCount === index) {
      break;
    }
  }


  if (currentOccurrenceCount >= index) {
    console.log(`Ouverture à la page ${targetPage} pour l'occurrence ${index + 1}`);
    window.open(`${url}#page=${targetPage}`, "_blank");
  } else {
    console.log(`Seulement ${currentOccurrenceCount} occurrence(s) trouvée(s). Ouverture à la page 1.`);
    window.open(`${url}#page=1`, "_blank");
  }
};


const stripHtmlTags = (html: string): string => html.replace(/<[^>]*>/g, "");

const downloadBlob = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

export const downloadPDFWithPage = async (
  word: string,
  index: number,
  otherFichierUrl: string,
  snippet: string
) => {
  try {
    // Nettoyage du snippet : balises, espaces, tirets
    const cleanSnippet = stripHtmlTags(snippet)
      .replace(/\s+/g, " ")
      .replace(/-/g, "")
      .trim();

    // Garder seulement les 5 premiers mots
    const snippetSlice = cleanSnippet.split(" ").slice(0, 5).join(" ");

    console.log("Snippet réduit à 5 mots :", snippetSlice);

    const response = await fetch(
      `${URLroot}/api/docs/findWordInPdf/${encodeURIComponent(word)}/${index}/${encodeURIComponent(otherFichierUrl)}/${encodeURIComponent(snippetSlice)}`
    );

    if (!response.ok) {
      throw new Error("Erreur lors du téléchargement du PDF");
    }

    const blob = await response.blob();

    const filename = `${otherFichierUrl}.pdf`;
    downloadBlob(blob, filename);

    console.log(`Téléchargement du PDF : ${filename}`);

  } catch (error) {
    console.error("Erreur lors du téléchargement du PDF :", error);
  }
};

