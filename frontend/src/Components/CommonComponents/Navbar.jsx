import { useState } from 'react'
import Buttons from '../MiniComponents/Buttons';
import SearchIcon from '@mui/icons-material/Search';
import { Link, Outlet } from 'react-router-dom';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { useContext } from 'react';
import { BlogContext } from '../../ContextAPI/BlogContextAPI';
import { useEffect } from 'react';

const Navbar = () => {

  const [searchInput, setSearch] = useState("");
  const { authUser, setQuery, } = useContext(BlogContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(prev => {
        if (prev.search === searchInput) return prev;
        return {
          ...prev,
          search: searchInput,
          searchBy: 'title', // You can toggle this manually if needed
        };
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchInput, setQuery]);


  return (

    <div className=''>


      <div className='flex justify-between flex-col gap-y-2 md:flex-row md:items-center py-5 md:px-20 px-4 bg-gray-100'>
        <div>

          <div>
            {/*  */}
          </div>

          <div className=' border-2 border-gray-300 shadow-2xs rounded-full pr-2 px-2 flex md:justify-between items-center'>
            <SearchIcon sx={{ padding: '2px', color: 'gray' }} />
            <input type="text" name='search' className='outline-none rounded-full py-2  px-1 text-xs text-gray-600' placeholder='search' value={searchInput} onChange={(e) => setSearch(e.target.value)} />
          </div>

        </div>


        <div className='flex gap-x-2 items-center'>

          {
            authUser?.isAdmin ? <Link to={"/blog-editor"} className='border border-[#8f71ff] px-3 py-1 rounded-full flex items-center gap-x-2 text-[#8f71ff]'>
              <DriveFileRenameOutlineOutlinedIcon />
              <span className='text-sm'>Write</span>
            </Link> : ""
          }


          {
            authUser ? <Link to={'/logout'}>
              <Buttons type={'button'} text={'Logout'} bgColor={'bg-[#8f71ff]'} borderRadius={'rounded-full'} textColor={'text-white'} p={'md:px-4  px-3  py-2'} fontSize={'md:text-sm text-xs'} />
            </Link> : <>

              <Link to={'/sign-in'}>
                <Buttons type={'button'} text={'Sign In'}  borderRadius={'border border-[#8f71ff] rounded-full'} textColor={'text-[#8f71ff]'} p={'md:px-4  px-3  py-2'} fontSize={'md:text-sm text-xs'} />
              </Link>

              <Link to={'/sign-up'}>
                <Buttons type={'button'} text={'Sign Up'} bgColor={'bg-[#8f71ff]'} borderRadius={'border border-[#8f71ff] rounded-full'} textColor={'text-white'} p={'md:px-5 px-3 py-2'} fontSize={'md:text-sm text-xs'} />
              </Link>

            </>
          }



        </div>
      </div>

      <div>
        <Outlet />
      </div>

    </div>

  )
}

export default Navbar