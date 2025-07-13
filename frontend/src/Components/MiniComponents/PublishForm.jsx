import { useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { BlogContext } from '../../ContextAPI/BlogContextAPI';
import InputTextField from '../TextField/InputTextField';
import TextAreaField from '../TextField/TextAreaTextField';
import TagsInputField from '../TextField/TagsInputField';
import Buttons from './Buttons';
import { CreateBlog, GetAllBlogs } from '../../actions/BlogAPI';



const PublishForm = () => {

  const { setBlogEditor, Blog, setBlog, textEditor, blogTitle, setBlogTitle, allBlogs, setAllBlogs } = useContext(BlogContext);

  const [isLoading, setLoding] = useState(false);

  const handleRemoveTag = (tagToRemove) => {
    setBlog(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };



  // handle publish form submit
  const handlePublishFormSubmit = async (e) => {

    e.preventDefault();

    setLoding(true);


    const finalBlogData = {
      ...Blog,
      title: blogTitle?.title,
      des: blogTitle?.description,
      content: Blog?.content, // if using Editor.js
    };





    try {
      await CreateBlog(finalBlogData);



    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }


  }



  return (

    <div className=' relative md:py-3 md:px-7 rounded-sm p-3  border border-gray-200 shadow-xs md:w-[90%] md:mt-5 md:mx-auto'>
      <div className=' flex justify-end '>
        <CloseIcon onClick={() => setBlogEditor('Editor')} sx={{ color: '#ccc', cursor: 'pointer' }} />
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-sm">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-gray-800 border-opacity-70"></div>
        </div>
      )}

      <div className='grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-5'>
        <div className='p-1 flex flex-col gap-y-2'>
          <p className='text-xl text-gray-700 font-semibold'>Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey-300 mt-4">
            <img loading='lazy' src={Blog?.banner} alt="" className="w-full h-full object-cover rounded-lg" />
          </div>

          <h1 className='text-xl text-gray-800 font-semibold'>{blogTitle?.title}</h1>
          <p className='text-sm text-gray-800 '>{blogTitle?.description}</p>

        </div>

        <form onSubmit={handlePublishFormSubmit} className='flex flex-col gap-y-2  justify-center'>
          <InputTextField type={'text'} label={"Blog Title"} name={'title'} state={blogTitle?.title} setState={setBlogTitle} />
          <TextAreaField label={"Blog Description"} name={'description'} state={blogTitle?.description} setState={setBlogTitle} fontSize={'text-[12px]'} rowValue={5} Border={' focus:border-1 focus:border-gray-200'} bgColor={'bg-gray-100'} />
          <div className=' py-3'>

            <TagsInputField
              label="Topics - (Helps in searching and ranking your blog)"
              tags={Blog.tags}
              setTags={setBlog}
            />


            <div className={`flex flex-wrap mt-2 gap-2 bg-gray-100 ${Blog?.tags?.length === 0 ? 'p-0' : 'p-3'} rounded-sm`}>
              {Blog?.tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex text-[12px] items-center bg-white  text-gray-600 px-2 py-1 rounded-full"
                >
                  {tag}
                  <CloseIcon
                    sx={{ fontSize: 16, marginLeft: 1, cursor: 'pointer', color: '' }}
                    onClick={() => handleRemoveTag(tag)}
                  />
                </span>
              ))}
            </div>



          </div>

          <Buttons type={'submit'} text={`${isLoading ? 'Publishing...' : 'Publish'}`} bgColor={'bg-gray-800'} textColor={'text-white'} fontSize={'text-sm'} p={'px-4 py-2'} borderRadius={'rounded-full'} disabled={isLoading} />
        </form>
      </div>

    </div>
  )
}

export default PublishForm