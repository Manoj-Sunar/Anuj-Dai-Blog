import React, { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { BlogContext } from '../ContextAPI/BlogContextAPI';
import UserProfileBar from '../Components/MiniComponents/UserProfileBar';
import LikeCommentSection from '../Components/MiniComponents/LikeCommentSection';
import { FormatedDateFunction } from '../Utility/CommonFunctions';
import { motion } from 'framer-motion';
import BlogContent from '../Components/MiniComponents/BlogContent';
import BlogLoader from '../Components/MiniComponents/Loader';

const BlogPageSpecific = () => {
  const { allBlogs } = useContext(BlogContext);
  const { blogId } = useParams();

  const blog = useMemo(() => {
    return allBlogs?.data?.find((data) => data?._id === blogId) || null;
  }, [allBlogs?.data, blogId]);

  const formattedDate = useMemo(() => {
    return blog?.createdAt ? FormatedDateFunction(blog.createdAt) : '';
  }, [blog?.createdAt]);

  const content = useMemo(() => {
    return blog?.content?.map(({ data, type }) => ({ data, type })) || [];
  }, [blog?.content]);

  if (!blog) {
    return (
      <BlogLoader/>
    );
  }

  return (
    <section className="px-4 py-8 bg-gray-50 min-h-screen">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col border border-gray-200 md:w-[65%] p-5 m-auto rounded-2xl shadow-sm bg-white"
      >
        {blog?.banner && (
          <motion.img
            loading="lazy"
            src={blog.banner}
            alt={blog.title}
            className="aspect-video object-cover rounded-xl w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <header className="mt-6 space-y-3">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight font-serif">
            {blog.title}
          </h1>
          <UserProfileBar
            authorName={blog?.author?.name || 'Anonymous'}
            formattedDate={formattedDate}
          />
        </header>

        <div className="mt-6 border-t-1 border-b-1 p-1 py-2 border-t-gray-200 border-b-gray-200">
          <LikeCommentSection blogId={blogId} />
        </div>

        <div className="mt-8 space-y-6 text-[16px] text-gray-700 leading-[1.8]">
          {content.map((data, index) => (
            <BlogContent Content={data} key={index} />
          ))}
        </div>
      </motion.article>
    </section>
  );
};

export default BlogPageSpecific;




 