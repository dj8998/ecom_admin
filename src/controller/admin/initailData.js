const Category = require('../../models/category')
const Products = require('../../models/product')

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

exports.initailData = async (req, res ) => {
    const categories = await Category.find({}).exec();
    const products = await Products.find({}).select('_id name price quantity description slug productPictures  category')
    .populate({path: 'category', select: '_id name'}).exec();
    res.status(200).json({
        categories: createCategories(categories),
        products
    })
}