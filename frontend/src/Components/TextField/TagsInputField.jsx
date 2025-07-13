import  { useState } from 'react';


const TagsInputField = ({ label, tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== "") {
      e.preventDefault();
      const newTag = inputValue.trim();

      if (!tags.includes(newTag)) {
        setTags(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      setInputValue("");
    }
  };

  


  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input
        type="text"
        placeholder="Press Enter to add tag"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="p-2 text-[12px] rounded-sm bg-gray-100 focus:outline-none focus:border-1 focus:border-gray-200 focus:ring-1 focus:ring-gray-100"
      />
     
    </div>
  );
};

export default TagsInputField;
