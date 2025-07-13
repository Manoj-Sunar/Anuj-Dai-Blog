
import { Link } from 'react-router-dom'


const Toolip = () => {

    

    return (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-3 rounded shadow-sm animate-fade-in-out w-[200px] flex flex-col items-center justify-center gap-1 z-50">
            <h1 className='text-lg font-semibold text-center'>Like this blog?</h1>
            <p className=' mb-2'>you need to Sign in</p>
            <Link to={'/sign-in'} className='w-full text-center px-2 p-2 rounded-lg font-semibold bg-white text-gray-600'>Sign In</Link>
        </div>
    )
}

export default Toolip