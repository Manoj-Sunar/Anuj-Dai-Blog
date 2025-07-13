
const LabelInputField = ({label,name,value,setState,placeholder,type}) => {

    const handleInputChange=(e)=>{
        const{name,value}=e.target;
        setState(prev=>({
            ...prev,
            [name]:value,
        }));
    }

    return (
        <div className="mt-5 relative w-full  ">
            {/* Label positioned on the border */}
            <div className="absolute -top-4 left-2 bg-white px-1">
                <label className="text-[13px] font-medium text-gray-700">
                    {label} 
                </label>
            </div>

            {/* Input field with adjusted border */}
            <input
                type={type||'text'}
                name={name}
                value={value}
                onChange={handleInputChange}
                className="w-full  px-3 py-[10px] text-[13px] shadow-xs placeholder-gray-400 border-[1px] ring-[0.5px] border-gray-400 rounded-md 
                   focus:outline-none focus:ring-[0.8px] focus:shadow-sm focus:ring-gray-600 
                   "
                placeholder={placeholder}
            />
        </div>

    )
}

export default LabelInputField