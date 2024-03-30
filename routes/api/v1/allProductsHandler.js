import ProductModel from "../../../models/products/index.js";

export const allProductsHandler = async (req, res) => {
    try {
        // Parse query parameters from the request URL
        const { brand, model } = req.query;

        // Construct a MongoDB query object based on the provided brand or model
        let query = {};

        // If either brand or model is provided, construct the query accordingly
        if (brand) {
            query.brand = { $regex: new RegExp(brand, 'i') };
        }
        if (model) {
            query.model = { $regex: new RegExp(model, 'i') };
        }

        // If neither brand nor model is provided, return a 400 status with an appropriate message
        if (!brand && !model) {
            return res.status(400).json({
                message: "Please provide either brand or model parameter for search."
            });
        }

        // Search for products in the database using the constructed query
        const searchResults = await ProductModel.find(query);

        // If no products are found, return a 404 status with an appropriate message
        if (!searchResults || searchResults.length === 0) {
            return res.status(404).json({
                message: "No Products Found"
            });
        }

        // Return the search results as a JSON response
        return res.status(200).json({
            searchResults
        });
    } catch (error) {
        // If an error occurs, return a 500 status with details of the error
        return res.status(500).json({ error });
    }
};
