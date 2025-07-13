import React, { useContext } from 'react';
import { BlogContext } from '../ContextAPI/BlogContextAPI';
import BlogEditor from '../Pages/BlogEditor';
import PublishForm from '../Components/MiniComponents/PublishForm';

const BlogEditorAndPublishFormWrapper = () => {
  const context = useContext(BlogContext);

  // ⛔ If the context is undefined, it means your BlogContextProvider isn't working correctly or is lost during hot reload.
  if (context === undefined || context.blogEditor === undefined) {
    // Instead of showing loading forever, fallback to Editor as default
    return <BlogEditor />;
  }

  const { blogEditor } = context;

  return (
    <>
      {blogEditor === 'Editor' ? <BlogEditor /> : <PublishForm />}
    </>
  );
};

export default BlogEditorAndPublishFormWrapper;
