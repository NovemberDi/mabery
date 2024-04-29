type SearchParameters = Record<string, any>;


const getData = async (myquery:SearchParameters) => {
    const query: SearchParameters = myquery;
    const internalAPIFetch = $fetch.create({
        query,
        parseResponse: response => {
          return response ? JSON.parse(response) : response;
        },
        baseURL: "/lk/api"
      });
    return await internalAPIFetch("");
}
export {
    type SearchParameters,
    getData
}