
const getResearches = async (query: string) => {
    const response = await fetch(`http://localhost:5030/api/docs/search?q=${query}`);
    const data = await response.json();
    return data;
};
export default getResearches;