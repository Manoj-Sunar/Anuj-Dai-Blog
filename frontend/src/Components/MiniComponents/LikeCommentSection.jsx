import { useCallback, useEffect, useState, useContext } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import CommentSection from './CommentSection';
import {
    GetBlogLikeDetails,
    GetBlogLikeDetailsForAll,
    UserLikesBlogs
} from '../../actions/BlogAPI';
import { BlogContext } from '../../ContextAPI/BlogContextAPI';
import { Link } from 'react-router-dom';
import Toolip from './Toolip';

const LikeCommentSection = ({ blogId }) => {

    const [liked, setLiked] = useState(false);

    const [likesCount, setLikesCount] = useState(0);

    const [showComments, setShowComments] = useState(false);

    const [totalComments,setTotalComments]=useState(0);

    const [showTooltip, setShowTooltip] = useState(false);

    const { authUser,comments} = useContext(BlogContext);

    const isLoggedIn = !!authUser;

    // Fetch for logged-in user
    useEffect(() => {
        if (!isLoggedIn) return;

        const fetchLikeData = async () => {
            try {
                const res = await GetBlogLikeDetails(blogId);
                if (res.status) {
                    setLikesCount(res.likesCount);
                    setLiked(res.likedByCurrentUser || false);
                }
            } catch (err) {
                console.error('Failed to fetch like details', err);
            }
        };

        fetchLikeData();
    }, [blogId, isLoggedIn, likesCount]);




    // Fetch for guest users
    useEffect(() => {
        if (isLoggedIn) return;

        const fetchLikeCount = async () => {
            try {
                const res = await GetBlogLikeDetailsForAll(blogId);
                if (res.status) {
                    setLikesCount(res.likesCount);
                }
            } catch (err) {
                console.error('Failed to fetch public like count', err);
            }
        };

        fetchLikeCount();
    }, [blogId, isLoggedIn]);




    // Handle like toggle
    const toggleLike = useCallback(async () => {

        if (!isLoggedIn) {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2500);
            return;
        }

        try {
            const res = await UserLikesBlogs(blogId);
            if (res.status) {
                setLikesCount(res.likesCount);
                setLiked(res.likedByCurrentUser);
            }
        } catch (err) {
            console.error('Failed to toggle like', err);
        }
    }, [blogId, isLoggedIn]);



    const toggleComments = useCallback(() => {
        setShowComments(prev => !prev);
    }, []);





    return (
        <>
            <div className="flex gap-x-4 items-center relative ">



                <div className="flex items-center gap-2 text-sm text-gray-700 relative">
                    {liked ? (
                        <span className='w-[35px] p-1 h-[35px] bg-gray-200 flex items-center justify-center rounded-full'>
                            <FavoriteIcon
                                sx={{ fontSize: '1.3rem', cursor: 'pointer', color: '#ef4444' }}
                                onClick={toggleLike}
                            />
                        </span>
                    ) : (

                        <span className='w-[35px] p-1 h-[35px] bg-gray-200 flex items-center justify-center rounded-full'>
                            <FavoriteBorderIcon
                                sx={{ fontSize: '1.3rem', cursor: 'pointer', color: '#1e1e1e' }}
                                onClick={toggleLike}
                            />
                        </span>

                    )}
                    <span>{likesCount}</span>

                    {/* Tooltip popup */}
                    {showTooltip && (
                        <Toolip />
                    )}
                </div>


                <div className='flex items-center  gap-2'>
                    <span className='w-[35px] p-1 h-[35px] bg-gray-200 flex items-center justify-center rounded-full'>
                        <ChatBubbleOutlineRoundedIcon
                            sx={{ fontSize: '20px', cursor: 'pointer' }}
                            onClick={toggleComments}
                        />
                    </span>
                    <span className='text-sm'>{totalComments}</span>
                </div>



            </div>


            <CommentSection open={showComments} onClose={toggleComments} blogId={blogId} setTotalComments={setTotalComments}/>
        </>
    );
};

export default LikeCommentSection;
