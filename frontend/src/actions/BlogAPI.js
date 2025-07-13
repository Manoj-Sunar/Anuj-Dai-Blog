




export async function CreateBlog(blogData) {

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog/create-blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.msg || 'failed');
    }

    const result = await response.json();

    return result;
  } catch (err) {
    throw err;
  }
}



// Get all blogs api calls
export async function GetAllBlogs(query) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog/get/all-blogs?${query}`, {
      method: 'GET',
    });

    const res = await response.json();

    if (response.ok) {
      return res;
    } else {
      return res;
    }

  } catch (error) {
    console.log(error);
  }
}



//user can likes any blog
export async function UserLikesBlogs(blogId) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog/blog-like/${blogId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    const result = await response.json();
    if (response.ok) {
      return result;
    } else return result;

  } catch (error) {
    console.log(error);
  }
}



//get blog like detail for only authorized user
export async function GetBlogLikeDetails(blogId) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog/blog-like-details/${blogId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    const result = await response.json();
    if (response.ok) {
      return result;
    } else return result;

  } catch (error) {
    console.log(error);
  }
}



//get blog like details for all users specially for user who not like this blog

export async function GetBlogLikeDetailsForAll(blogId) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog/blog-like-details-all/${blogId}`, {
      method: 'GET',
    });

    const result = await response.json();
    if (response.ok) {
      return result;
    } else return result;

  } catch (error) {
    console.log(error);
  }
}





export async function CommentTheBlogById({ blogId, comment }) {

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog/blog-comment/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ comment }),
    });

    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      return result
    }

  } catch (error) {
    console.log(error);
  }
}




export async function getCommentsById(blogId) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog/get-blog-comment/${blogId}`, {
      method: 'GET',
    });

    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      return result;
    }

  } catch (error) {
    console.log(error);
  }
}



export async function CommentsDeleteById(blogId, commentId) {

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog/delete-comment/${blogId}/${commentId}`, {
      method: 'DELETE',
      headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      return result;
    }

  } catch (error) {
    console.log(error);
  }
}