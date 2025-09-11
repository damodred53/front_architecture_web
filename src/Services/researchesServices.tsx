
export const getResearches = async (query: string) => {
    const response = await fetch(`http://localhost:5030/api/docs/search?q=${query}`);
    const data = await response.json();
    return data;
};


export const getHistoricResearches = async (query: string) => {
    const response = await fetch(`http://localhost:5030/FireBaseRecherche/recherche/${query}`);
    const data = await response.json();

    if(data && data.status === 404) {
        return [];
    }
    return data;
}

export const downloadPDF = async (bookTitle: string) => {
    try {
        const response = await fetch(`http://localhost:5030/api/pdf/1/8000/${encodeURIComponent(bookTitle)}?zoom=1.25`);
        if (!response.ok) {
            throw new Error("Erreur lors du téléchargement du PDF");
        }

        const blob = await response.blob();
        managePDFDownloaded(blob, bookTitle);

        
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
