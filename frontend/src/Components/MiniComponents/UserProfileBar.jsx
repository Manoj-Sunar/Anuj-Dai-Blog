import React from "react";
import Avatar from "@mui/material/Avatar";
import { motion } from "framer-motion";

const UserProfileBar = React.memo(({ authorName, formattedDate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between gap-2 w-full"
    >
      {/* Avatar + Name */}
      <div className="flex items-center gap-2 min-w-0">
        <Avatar
          src="/profileImg.jpg"
          alt={`${authorName}'s profile picture`}
          sx={{ width: 32, height: 32 }}
        />
        <span
          className="text-sm font-semibold text-gray-700 truncate max-w-[120px]"
          title={authorName}
        >
          {authorName}
        </span>
      </div>

      {/* Date */}
      <span
        className="text-sm text-gray-500 whitespace-nowrap"
        title={formattedDate}
      >
        {formattedDate}
      </span>
    </motion.div>
  );
});

export default UserProfileBar;
