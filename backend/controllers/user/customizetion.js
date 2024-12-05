const Customization = require("../../models/Customize");

const updatedCustomization= async(req, res) => {
  try {
    const { logo, categories, banners, primaryColor, secondaryColor } = req.body;

    // Find the existing customization document
    let customization = await Customization.findOne();

    if (customization) {
      // Update the existing document
      customization.logo = logo || customization.logo;
      customization.categories = categories || customization.categories;
      customization.banners = banners || customization.banners;
      customization.primaryColor = primaryColor || customization.primaryColor;
      customization.secondaryColor = secondaryColor || customization.secondaryColor;

      const updatedCustomization = await customization.save();
      return res.status(200).json(updatedCustomization);
    }

    // Create a new customization document if none exists
    const newCustomization = new Customization({
      logo,
      categories,
      banners,
      primaryColor,
      secondaryColor,
    });
    const savedCustomization = await newCustomization.save();

    res.status(201).json(savedCustomization);
  } catch (err) {
    res.status(500).json({ error: "Failed to create or update customization" });
  }
}

// GET: Fetch the single customization object
const getCustomizations= async (req, res) => {
  try {
    const customization = await Customization.findOne();
    if (!customization) {
      return res.status(404).json({ error: "No customization found" });
    }
    res.status(200).json(customization);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customization" });
  }
};





module.exports={getCustomizations,updatedCustomization}