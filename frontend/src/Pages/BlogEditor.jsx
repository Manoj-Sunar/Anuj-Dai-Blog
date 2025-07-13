import { useContext, useEffect, useRef, useState } from 'react';
import Buttons from '../Components/MiniComponents/Buttons';
import TextAreaField from '../Components/TextField/TextAreaTextField';
import EditorJS from '@editorjs/editorjs';
import { tools } from '../EditorTools/EditorTools';
import { BlogContext } from '../ContextAPI/BlogContextAPI';
import { UploadFileIntoCloudinary } from '../Utility/UploadFileInToCloudinary';
import UploadingSpinner from '../Components/MiniComponents/UploadingSpinner';

const BlogEditor = () => {
  const {
    setBlogEditor,
    Blog,
    setBlog,
    uploadImgPreview,
    setUploadImgPreview,
    blogTitle,
    setBlogTitle,
  } = useContext(BlogContext);

  const editorRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [shouldPublish, setShouldPublish] = useState(false);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const hanldeChangeFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl=await UploadFileIntoCloudinary(setUploading, file);
    setUploadImgPreview(imageUrl);
  };

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'textEditor',
        data: Blog?.content?.length ? { blocks: Blog.content } : {},
        tools: tools,
        placeholder: "Let's write an awesome story",
        onReady: () => {
          editorRef.current = editor;
        },
      });
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const publishAndGoToForm = async () => {
    if (!uploadImgPreview) return alert("Upload a banner image first.");

    if (editorRef.current) {
      try {
        const data = await editorRef.current.save();

        if (data.blocks.length) {
          const updatedBlog = {
            ...Blog,
            banner: uploadImgPreview,
            title: blogTitle.title,
            des: blogTitle.description,
            content: data.blocks,
          };

          setBlog(updatedBlog);
          setShouldPublish(true);
        }
      } catch (err) {
        console.error("Failed to save content:", err);
      }
    } else {
      console.warn("Editor not initialized yet.");
    }
  };

  useEffect(() => {
    if (
      shouldPublish &&
      Blog?.title &&
      Blog?.banner &&
      Blog?.content?.length > 0
    ) {
      setBlogEditor("Publish");
      setShouldPublish(false);
    }
  }, [Blog, shouldPublish]);

  return (
    <div className='flex flex-col items-center'>
      <nav className='flex justify-between items-center py-5 md:px-20 px-4 bg-gray-100 w-full'>
        <div className='flex justify-end ml-auto gap-2'>
          <span onClick={publishAndGoToForm}>
            <Buttons
              type={'button'}
              text={'Publish'}
              bgColor={'bg-[#8f71ff]'}
              borderRadius={'rounded-full'}
              textColor={'text-white'}
              p={'md:px-5 px-3 py-2'}
              fontSize={'md:text-sm text-xs'}
            />
          </span>
          <span>
            <Buttons
              type={'button'}
              text={'Save Draft'}
              bgColor={''}
              borderRadius={'border-2 border-[#8f71ff] rounded-full'}
              textColor={'text-[#8f71ff]'}
              p={'md:px-4 px-2 py-2'}
              fontSize={'md:text-sm text-xs'}
              fontWeight={'font-semibold'}
            />
          </span>
        </div>
      </nav>

      <section className='p-2 md:w-[60%] mx-auto'>
        <div className='relative border opacity-80 bg-gray-100 border-gray-300 aspect-video rounded-xs w-full mx-auto'>
          <label
            htmlFor="uploadBanner"
            className="w-full h-full flex items-center justify-center cursor-pointer"
          >
            {uploading && (
             <UploadingSpinner/>
            )}
            {uploadImgPreview ? (
              <img
                loading='lazy'
                src={uploadImgPreview}
                alt="banner"
                className={`w-full h-full object-cover rounded-xs`}
              />
            ) : (
              <img
                loading='lazy'
                src='/uploadpng.png'
                alt='upload'
                className={`w-fit h-fit rounded-xs`}
              />
            )}
          </label>
          <input
            type="file"
            id="uploadBanner"
            hidden
            accept=".png,.jpg,.jpeg"
            onChange={hanldeChangeFile}
          />
        </div>

        <div>
          <TextAreaField
            placeholder={"Blog Title"}
            fontSize={"text-2xl"}
            fontWeight={"font-semibold"}
            name={'title'}
            value={blogTitle.title}
            setState={setBlogTitle}
            handleKeyDown={handleKeyDown}
          />
        </div>

        <div id='textEditor' className='text-sm bg-gray-100 py-2 h-auto'></div>
      </section>
    </div>
  );
};

export default BlogEditor;
