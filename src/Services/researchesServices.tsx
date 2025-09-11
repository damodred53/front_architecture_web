const URL = import.meta.env.VITE_API_BASE_URL;

import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const getResearches = async (query: string) => {
    const response = await fetch(`${URL}/api/docs/search?q=${query}`);
    const data = await response.json();
    return data;
};

export const getHistoricResearches = async (query: string) => {
    const response = await fetch(`${URL}/FireBaseRecherche/recherche/${query}`);
    const data = await response.json();

    if (data && data.status === 404) {
        return [];
    }
    return data;
};

export const downloadPDF = async (bookTitle: string, start?: number) => {
    try {
        const response = await fetch(
            `${URL}/api/pdf/1/8000/${encodeURIComponent(bookTitle)}?zoom=1.25`
        );
        if (!response.ok) {
            throw new Error("Erreur lors du téléchargement du PDF");
        }

        const blob = await response.blob();

        if (start !== undefined) {
            openPDFAtStart(blob, start);
        } else {
            openPDFNewTab(blob);
        }
    } catch (error) {
        console.error("Erreur lors du téléchargement du PDF :", error);
    }
};

const openPDFAtStart = async (blob: Blob, start: number) => {
    const url = URL.createObjectURL(blob);
    const pdf = await pdfjsLib.getDocument(url).promise;

    let targetPage = 1;

    // Parcourt toutes les pages pour trouver celle où tombe "start"
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

        start -= pageTextLength; // décrémente "start" pour la page suivante
    }

    window.open(`${url}#page=${targetPage}`, "_blank");
};

const openPDFNewTab = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
};