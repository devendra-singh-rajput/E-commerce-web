import summmryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
  try {
    const response = await fetch(summmryApi.productCategoryWise.url, {
      cache: 'force-cache',
      method: summmryApi.productCategoryWise.method,
      headers: {
        
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category: category
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const dataResponse = await response.json();
    return dataResponse;
  } catch (error) {
    console.error("Fetch error:", error.message);
    return { error: error.message };
  }
};

export default fetchCategoryWiseProduct;
