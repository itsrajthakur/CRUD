import Product from "../model/product.model.js";

// Add a new product
export const add = (req, res) => {
    Product.create({
        brand: req.body.brand,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    })
        .then(() => res.status(200).json({ message: "Product Saved...." }))
        .catch(err => res.status(500).json({ error: "Internal server error...", err }));
};

// Update Product details
export const update = (req, res) => {
    Product.update({
        brand: req.body.brand,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }, {
        where: { id: req.body.id },
        raw: true,
    })
        .then(result => result[0] ? res.status(200).json({ message: "Product data updated...." }) : res.status(401).json({ message: "unauthorized req...." }))
        .catch(err => res.status(500).json({ error: "internal server error....", err }));
};

// List all Products
export const list = (req, res) => {
    Product.findAll({ raw: true })
        .then(result => res.status(200).json({ data: result }))
        .catch(err => res.status(500).json({ error: "Internal server error...", err }));
};

// Remove a Product
export const remove = (req, res) => {
    Product.destroy({
        where: { id: req.body.id },
        raw: true,
    })
        .then(result => result ? res.status(200).json({ message: "Product deleted...." }) : res.status(401).json({ message: "unauthorized req...." }))
        .catch(err => res.status(500).json({ error: "Internal server error.....", err }));
};