const authorModel = require("../Models/authorModel");
const blogModel = require("../Models/blogModel");

const createBlog = async function (req, res) {
  try {
    const data = req.body;
    let authorId = await authorModel.findById(data.authorId);
    if (!authorId) {
      return res.status(400).send("Author Id Invalid");
    }
    const newBlog = await blogModel.create(data);
    res.status(201).send({ status: true, data: newBlog });
  } catch (err) {
    res.status(500).send(err.msg);
  }
}; // post

// const getBlog = async function (req, res) {
//   try {
//     // let keys = req.query;
//     // let authId = keys.authorId;
//     // let blogCategory = keys.category;
//     // let blogSpecifyTag = keys.specify - tag;
//     // let blogsubCategory = keys.sub - category;

//     // let fetchBlogs = await blogModel.find({ isDeleted: false,isPublished: true});
    
    
//     let variable = fetchBlogs.length;
//     if (variable == 0) {
//         return res.status(404).send({ status: false, msg: "Blog is not found" });
//     }
    
// } catch (err) {
//     res.status(500).send(err.msg);
//   }
// };
// let getByAutherId= async function(req, res) {

//  try {
//     let keys = req.query;
//     let authId = keys.authorId;
//     let blogCategory = keys.category;
//     let blogSpecifyTag = keys.specify - tag;
//     let blogsubCategory = keys.sub - category;

//     let authorId = await blogModel.findById(authId);
//     if (!authorId) {
//       return res.status(400).send("Author Id Invalid");
//     }
//     let authAndCategoryId = await blogModel.findMany({authId}, {caegorytblogCategory});
//     res.status(200).send({ status: true, data: authAndCategoryId });
    
//  }catch (err) {
//     res.status(500).send(err.msg);
//   }

// }

const getBlog = async (req, res) => {
  try {
      let queries = req.query;
      let filterData = {
          isDeleted: false,
          isPublished: true,

          //* using spread to add queries taken from req *// 
          ...queries
      }
      // passing the filter variable inside find for validation
      let allBlogs = await BlogModel.find(filterData)
      if (allBlogs.length == 0) return res.status(404).send({ status: false, msg: ">> No blog found" })

      res.status(200).send({ status: true, data: allBlogs })
  } catch (err) {
      res.status(500).send({ status: "error", error: err.message })
  }
}
module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;
// module.exports.getByAutherId = getByAutherId;
