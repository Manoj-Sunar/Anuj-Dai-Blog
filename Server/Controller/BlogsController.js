import { BlogModel } from "../Models/BlogModelSchema.js";
import UsersRegisterModel from "../Models/UsersRegisterModel.js";


export const BlogsCreate = async (req, res) => {
  try {
    const { title, banner, content, tags, des } = req.body;
    const { userId, email } = req.user;

    const isValidUserToCreateBlog = await UsersRegisterModel.findOne({ _id: userId, email });

    if (!isValidUserToCreateBlog) {
      return res.status(401).json({ status: false, msg: "Unauthorized access" });
    }

    if (!isValidUserToCreateBlog.isAdmin) {
      return res.status(403).json({ status: false, msg: "You don't have permission to create blog" });
    }

    if (!title?.trim()) {
      return res.status(400).json({ status: false, msg: "Title is required" });
    }

    if (!des?.trim()) {
      return res.status(400).json({ status: false, msg: "Description is required" });
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({ status: false, msg: "Tags are required" });
    }

    if (!content || content.length === 0) {
      return res.status(400).json({ status: false, msg: "Blog content is required" });
    }

    if (!banner || banner.length === 0) {
      return res.status(400).json({ status: false, msg: 'Banner image is required' });
    }

    // Step 1: Create the blog
    const blogCreated = await BlogModel.create({
      title,
      banner,
      content,
      tags,
      des,
      author: userId,
    });

    if (!blogCreated) {
      return res.status(400).json({ status: false, msg: 'Blog creation failed' });
    }

    // Step 2: Update user's blog list and total_posts count
    await UsersRegisterModel.findByIdAndUpdate(
      userId,
      {
        $push: { blog: blogCreated._id },
        $inc: { "acoutInfo.total_posts": 1 }
      },
      { new: true }
    );

    return res.status(201).json({ msg: 'Blog posted successfully ✅', blogCreated });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};





export const getAllBlogs = async (req, res) => {


  try {
    const { tags, title, author } = req.query;

    let filter = {};

    // Filter by title (case-insensitive, partial match)
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    // Filter by tags (match if any tag exists in the array)
    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagsArray };
    }

    // If filtering by author name (match NewUser.name)
    let authorIds = [];
    if (author) {
      const matchedAuthors = await UsersRegisterModel.find({
        name: { $regex: author, $options: 'i' }
      }).select('_id');
      authorIds = matchedAuthors.map(user => user._id);
      filter.author = { $in: authorIds };
    }

    const blogs = await BlogModel.find(filter)
      .populate({
        path: 'author',
        select: 'name email'
      })
      .sort({ createdAt: -1 }); // Optional: latest blogs first

    res.status(200).json({
      status: true,
      count: blogs.length,
      data: blogs
    });

  } catch (error) {
    console.error('Error in getAllBlogs:', error);
    res.status(500).json({ status: false, msg: 'Internal server error' });
  }
};




export const LikesBlogs = async (req, res) => {

  try {
    const { blogId } = req.params;
    const { userId, email } = req.user;

    if (!blogId) {
      return res.status(400).json({ msg: 'Blog ID is required', status: false });
    }

    const user = await UsersRegisterModel.findOne({ _id: userId, email });
    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized: Please login to like', status: false });
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found', status: false });
    }

    const userObjectId = user._id;

    const alreadyLiked = blog.activity.likes.includes(userObjectId);

    let updatedBlog;

    if (alreadyLiked) {
      // 👎 Unlike: remove user ID from likes array
      updatedBlog = await BlogModel.findByIdAndUpdate(
        blogId,
        { $pull: { 'activity.likes': userObjectId } },
        { new: true }
      );
    } else {
      // 👍 Like: add user ID to likes array
      updatedBlog = await BlogModel.findByIdAndUpdate(
        blogId,
        { $addToSet: { 'activity.likes': userObjectId } }, // addToSet prevents duplicates
        { new: true }
      );
    }

    return res.status(200).json({
      msg: alreadyLiked ? 'Blog unliked' : 'Blog liked',
      status: true,
      likesCount: updatedBlog.activity.likes.length,
      likes: updatedBlog.activity.likes,
    });
  } catch (error) {
    console.error('Like Blog Error:', error);
    return res.status(500).json({ msg: 'Server error', status: false });
  }
};





// this is for authenticated user
export const BlogLikeDetails = async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!blogId) {
      return res.status(400).json({ msg: 'Blog ID is required', status: false });
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found', status: false });
    }

    const likes = blog.activity.likes || [];

    let likedByCurrentUser = false;

    // Only check if user is logged in
    if (req.user?.userId) {
      likedByCurrentUser = likes.some(
        (id) => id.toString() === req.user.userId.toString()
      );
    }

    return res.status(200).json({
      status: true,
      likesCount: likes.length,
      likedByCurrentUser,
    });
  } catch (error) {
    console.error('Error fetching like details:', error);
    return res.status(500).json({ msg: 'Server error', status: false });
  }
};




// this is for all users
export const BlogLikeDetailForAll = async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!blogId) {
      return res.status(404).json({ msg: 'Blog Id is required', status: false });
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog is not found' });
    }

    const likes = blog.activity.likes || [];

    return res.status(200).json({ status: true, likesCount: likes.length });

  } catch (error) {
    return res.status(500).json({ status: false, msg: "Server error" });
  }
}



// auth user can comment
export const UserCanCommentToBlog = async (req, res) => {

  try {

    const { blogId } = req.params;
    const { comment } = req.body;


    if (!blogId) {
      return res.status(400).json({ msg: 'Blog Id is required' });
    }

    if (!req.user || !req.user.userId) {
      return res.status(404).json({ msg: 'You are not able to comment' });
    }

    const blog = await BlogModel.findById(blogId);

    const newComment = {
      user: req.user.userId,
      text: comment,
      date: Date.now(),
    };

    blog.activity.comments.push(newComment);

    await blog.save();


    return res.status(201).json({
      msg: 'Comment added successfully',
      comment: newComment
    });

  } catch (error) {
    console.log(error);
  }
}



export const getAllComments = async (req, res) => {

  try {

    const { blogId } = req.params;



    if (!blogId) {
      return res.status(400).json({ status: false, msg: 'Blog id is required' });
    }

    const blog = await BlogModel.findOne({ _id: blogId }).populate('activity.comments.user', 'name email profileImage');
  
    const allCommentsOfSpecificBlog = blog.activity.comments;



    return res.status(200).json({ status: true, comments: allCommentsOfSpecificBlog });

  } catch (error) {
    console.log(error);
  }
}



// 

export const CommentDeleteByIdOnlyValidUser = async (req, res) => {

  try {

    const { blogId, commentId } = req.params;

    

    if (!blogId) {
      return res.status(400).json({ status: false, msg: 'blog Id is required' });
    }

    if (!commentId) {
      return res.status(400).json({ status: false, msg: 'comment Id is required' });
    }


    if (!req.user || !req.user.userId) {
      return res.status(404).json({ status: false, msg: 'unauthorized access' });
    }

    const blog=await BlogModel.findById(blogId);

  

    const commentToDelete = blog.activity.comments.find(
      (item) =>
        item._id.toString() === commentId &&
        item.user.toString() === req.user.userId.toString()
    );

    if(!commentToDelete){
      return res.status(404).json({status:false,msg:'Not allowed to delete this comment'});
    }

     // Filter out the comment
    blog.activity.comments = blog.activity.comments.filter(
      (item) => item._id.toString() !== commentId
    );

    await blog.save();

    return res.status(200).json({comments:blog.activity.comments});


  } catch (error) {
    return res.status(500).json({ status: false, msg: 'Internal error' });
  }
}


