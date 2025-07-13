import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { BlogContext } from '../../ContextAPI/BlogContextAPI';
import { CommentsDeleteById, CommentTheBlogById, getCommentsById } from '../../actions/BlogAPI';
import { FormatedDateFunction } from '../../Utility/CommonFunctions';



const CommentSection = ({ open, onClose, blogId,setTotalComments}) => {

  const { authUser} = useContext(BlogContext);





  const [comment, setComment] = useState('');

  const [comments, setComments] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const submitComment = async () => {

    if (!comment.trim()) return;

    await CommentTheBlogById({ blogId, comment });
    setComment('');
    fetchComments();

  };



const deleteComment = async (id) => {
  try {
    await CommentsDeleteById(blogId, id);
    await fetchComments(); // Ensure you fetch only after successful deletion
  } catch (err) {
    console.error("Error deleting comment", err);
  }
};




  const startEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };



  const saveEdit = (id) => {
    if (!editedText.trim()) return;
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, comment: editedText } : c
      )
    );
    setEditingId(null);
    setEditedText('');
  };


  const fetchComments = async () => {
    try {
      const result = await getCommentsById(blogId);
      setComments(result?.comments);
      setTotalComments(result?.comments?.length);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };


  useEffect(() => {
    fetchComments();
  }, [blogId]);


  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.4 }}
          className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 p-4 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Comments</h2>
            <button onClick={onClose} className="text-sm text-red-500 cursor-pointer">
              Close
            </button>
          </div>

          <div className="mb-4">

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`${authUser ? `Comment as ${authUser?.name}` : 'you need to Login...'}`}
              className="w-full border border-gray-200 rounded-md p-2 text-gray-700 text-xs resize-none focus:outline-none"
              rows={3}
              disabled={!authUser}
            />

            <button
              onClick={submitComment}
              className="mt-2 bg-blue-500 text-white px-4 py-1 cursor-pointer rounded-sm text-xs hover:bg-blue-600"
            >
              Post
            </button>

          </div>


          <div className="space-y-4">
            {comments?.map(({ user, text, date, _id }) => (
              <div
                key={_id}
                className="flex items-start gap-3 border-b border-gray-300 pb-3 relative"
              >
                <Avatar
                  src={user?.profileImage}
                  alt={user?.name}
                  sx={{ width: 32, height: 32 }}
                />
                <div className="flex-1 p-[8px] bg-gray-100 rounded-sm">
                  <p className="text-sm font-semibold text-gray-700">
                    {user?.name}
                  </p>

                  {editingId === _id ? (
                    <>
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        rows={2}
                        className="w-full border outline-none border-gray-300 resize-none mt-1 text-gray-600 rounded text-[12px] p-1"
                        disabled={!authUser}
                      />
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => saveEdit(_id)}
                          className="text-[12px] px-2 py-0.5 bg-green-500 text-white transition-all duration-200 ease-in-out cursor-pointer rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-[12px] px-2 py-0.5 text-gray-600 cursor-pointer transition-all duration-200 ease-in-out bg-gray-300 rounded hover:bg-gray-400 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-gray-600">{text}</p>
                      <span className="text-xs text-gray-400">{FormatedDateFunction(date)}</span>

                      <div className="mt-1 flex gap-3 text-xs text-blue-500">

                        {
                          authUser?._id === user?._id && <button onClick={() => startEdit(_id, comment)} className="hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        }


                        {
                          authUser?._id === user?._id && <button onClick={() => deleteComment(_id)} className="hover:underline text-red-500 cursor-pointer">
                            Delete
                          </button>
                        }

                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommentSection;
