import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import UserProfileBar from "./UserProfileBar";
import LikeCommentSection from "./LikeCommentSection";
import { FormatedDateFunction } from "../../Utility/CommonFunctions";

const HomePageComponent = ({ data, href }) => {


    const formattedDate = useMemo(() => {
        return FormatedDateFunction(data?.createdAt);
    }, [data?.createdAt]);

    const authorName = useMemo(() => data?.author?.name || "Anonymous", [data?.author?.name]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.9 }}
            className="flex flex-col gap-y-4 py-5 border-b border-gray-200 px-3 md:px-5 w-full"
        >
            <UserProfileBar authorName={authorName} formattedDate={formattedDate} />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Blog text section */}
                <div className="flex flex-col gap-y-3 md:flex-1">
                    <Link to={href} className="hover:underline transition-all duration-200 ease-in-out">
                        <h1 className="font-semibold text-lg md:text-xl text-gray-800 line-clamp-2">
                            {data?.title}
                        </h1>
                        <p className="text-sm text-gray-700 mt-1 line-clamp-3">
                            {data?.des}
                        </p>
                    </Link>

                    <LikeCommentSection blogId={data?._id} />
                </div>

                {/* Banner image */}
                <img
                    loading="lazy"
                    src={data?.banner}
                    alt={data?.title || "Blog banner"}
                    className="w-full md:w-[150px] h-auto md:h-[120px] object-cover rounded-md shadow-sm"
                />
            </div>
        </motion.div>
    );
};

export default memo(HomePageComponent);
