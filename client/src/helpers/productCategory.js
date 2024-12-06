import axios from "axios";
import summmryApi from "../common";

// Predefined categories array
const productCategroy = [
  // { id: 1, label: "Airpodes", value: "airpodes" },
  // { id: 2, label: "Camera", value: "camera" },
  // { id: 3, label: "Earphones", value: "earphones" },
  // { id: 4, label: "Moblies", value: "mobiles" },
  // { id: 5, label: "Mouse", value: "mouse" },
  // { id: 6, label: "Printers", value: "printers" },
  // { id: 7, label: "Processor", value: "processor" },
  // { id: 8, label: "Refrigerator", value: "refrigerator" },
  // { id: 9, label: "Speakers", value: "speakers" },
  // { id: 10, label: "Trimmers", value: "trimmers" },
  // { id: 11, label: "Televisions", value: "televisions" },
  // { id: 12, label: "Watches", value: "watches" },
];

// Helper function to capitalize the first letter
const capitalizeFirstLetter = (string) =>
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

// Call the function to update the productCategroy array
updateProductCategories();

export default productCategroy;
