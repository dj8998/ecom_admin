const Category = require('../models/category');
var slugify = require('slugify');

function createCategories( categories, parentId =null){
    const catergoryList = [];
    let category;
    if(parentId === null){
        category = categories.filter(cat => cat.parentId == undefined)
    }else{
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for(let cate of category){
        catergoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id),
            parentId: cate.parentId
        });
    }
    return catergoryList
}

exports.addCategory = (req, res) => {


    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.file){
        categoryObj.categoryImage = "http://localhost:2000/public/" + req.file.filename;
    }


    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId; 
    }
    const cat = new Category(categoryObj);
    cat.save((error, category) =>{
        if(error)
        return res.status(400).json({error}) 
        if(category){
            return res.status(201).json({category})
        }
    })
}

exports.getCategory = (req, res) =>{
    Category.find({})
    .exec((error, categories) =>{
        if(error){
            return res.status(400).json({error})
        }
        
        if(categories){
            const catergoryList = createCategories(categories);
            return res.status(201).json({catergoryList})
        }   
    })
}