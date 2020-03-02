const Category = require('../models/category');

exports.create = (req,res) => {
    const category = new Category(req.body);

    Category.save((err,data) => {
        
    })
}