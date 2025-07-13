

import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogContext } from '../../ContextAPI/BlogContextAPI';





const FiltersByInterestedBlog = ({ tags }) => {




  const [selectedTags, setSelectedTags] = useState(() => []);
  const { setQuery, query } = useContext(BlogContext);

  const toggleTag = useCallback((tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);



  const sortedNewTags = useMemo(() => [...selectedTags].sort().join(','), [selectedTags]);



  const sortedOldTags = useMemo(() => [...(query.tags || [])].sort().join(','), [query.tags]);




  useEffect(() => {
    if (sortedOldTags !== sortedNewTags) {
      setQuery((prev) => ({ ...prev, tags: selectedTags }));
    }
  }, [sortedNewTags, sortedOldTags, selectedTags, setQuery]);




  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <h1 className="font-semibold text-gray-800 text-lg mb-2">Filters by Interested Blog</h1>

      <div className="flex gap-2 flex-wrap">
        <AnimatePresence>
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <motion.button
                key={tag}
                layout
                onClick={() => toggleTag(tag)}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`rounded-full px-3 py-1 text-xs transition-colors duration-300 
                  ${isSelected ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {tag}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FiltersByInterestedBlog;
