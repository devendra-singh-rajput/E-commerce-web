const mongoose = require('mongoose');

const CustomizationSchema = new mongoose.Schema({
  logo: {
    type: String,
  },
  categories: {
    type: [String],
    default: [],
  },
  banners: {
    desktop: {
      type: [String], // URLs for desktop banners
      default: [],
    },
    mobile: {
      type: [String], // URLs for mobile banners
      default: [],
    },
  },
  primaryColor: {
    type: String,
    default: "#3498db",
  },
  secondaryColor: {
    type: String,
    default: "#2ecc71",
  },
});

const Customization = mongoose.model('Customization', CustomizationSchema);
module.exports = Customization;
