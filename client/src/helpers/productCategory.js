import axios from "axios";
import summmryApi from "../common";

// Predefined categories array
const productCategroy = [
  // Add predefined categories here if needed
];

// Helper function to capitalize the first letter
export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

// Function to fetch data and update productCategroy
const updateProductCategories = async () => {
  try {
    const { data } = await axios.get(summmryApi.getCustomization.url, {
      withCredentials: true,
    });

    if (data.categories) {
      const formattedCategories = data.categories.map((category, index) => ({
        id: productCategroy.length + index + 1, // Auto-incremented ID
        label: capitalizeFirstLetter(category), // Capitalized category name
        value: category.toLowerCase(), // Lowercase category value
      }));

      // Update productCategroy array
       productCategroy.push(...formattedCategories);
    }
  } catch (error) {
    console.error("Failed to fetch customization:", error);
  }
};
export { productCategroy, updateProductCategories };
export default productCategroy
