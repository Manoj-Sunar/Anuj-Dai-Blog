
import HomePageComponent from '../Components/MiniComponents/HomePageComponent'
import FiltersByInterestedBlog from '../Components/MiniComponents/FiltersByInterestedBlog'
import { useContext } from 'react'
import { BlogContext } from '../ContextAPI/BlogContextAPI'
import { useMemo } from 'react'
import BlogLoader from '../Components/MiniComponents/Loader'

const HomePage = () => {

    const { allBlogs } = useContext(BlogContext);

    // 🏷️ Extract unique tags using useMemo for performance
    const uniqueTags = useMemo(() => {
        const tagsSet = new Set();

        allBlogs?.data?.forEach(blog => {
            blog?.tags?.forEach(tag => {
                tagsSet.add(tag.trim());
            });
        });

        return Array.from(tagsSet);
    }, [allBlogs]);



    return (
        <div className={`${allBlogs?.data?.length>0?'md:px-20 md:py-10 p-5 flex flex-col-reverse md:grid grid-cols-1 md:grid-cols-3 gap-10':'w-full'}`}>

            {
                allBlogs?.data?.length > 0 ? <>
                    <div className={`md:col-span-2 ${allBlogs?.data?.length > 0 ? ' border-r-1 border-gray-100 shadow-xs ' : 'border-0 shadow-none'} rounded-xs `}>


                        <div className='border-b-1 md:p-3  border-gray-100 px-1'>
                            {
                                allBlogs?.data?.map((item, index) => <HomePageComponent data={item} href={`/blog/${item?.title}/${item?._id}`} key={index} />)
                            }
                        </div>


                    </div>

                    <div className='md:col-span-1'>
                        <FiltersByInterestedBlog tags={uniqueTags} />
                    </div>
                </> : <BlogLoader />

            }

        </div>
    )
}



export default HomePage