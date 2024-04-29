
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const { apiBase } = useRuntimeConfig();
  
  const getData = async () => {
    const internalAPIFetch = $fetch.create({
      query,
      parseResponse: response => {
        return response ? JSON.parse(response) : response;
      },
      baseURL: apiBase + "method/"
    });
    return await internalAPIFetch("orders.getTest");
  }
  try {
    return getData()
  } catch(e){
    return {error: e}
  }
  
})