

const TextAreaField = ({ label, name, value, setState, placeholder,rowValue,labelColor,fontWeight,fontSize,Border,shadow,handleKeyDown,bgColor}) => {


    const handleTextAreaInputField=(e)=>{
        const {name,value}=e.target;
        const input=e.target;
        input.style.height='auto';
        input.style.height=input.scrollHeight + "px";
        setState(prev=>({
            ...prev,
            [name]:value,
        }))
    }

    return (
       
            <div className={`flex flex-col p-1 gap-y-1 ${labelColor?labelColor:'text-[#1E1E1E]'}`}>
               <label htmlFor={label} className={`text-sm ${labelColor?labelColor:'text-gray-600'}  ${fontWeight?fontWeight:'font-medium'}`}>{label}</label>
                <textarea  name={name} value={value} onChange={handleTextAreaInputField} rows={rowValue} className={`p-2 focus:ring-gray-100 rounded-sm px-3 resize-none ${Border}  placeholder:text-gray-500 ${fontWeight} ${bgColor} outline-none border-gray-400 ${shadow}  ${fontSize} text-gray-700 focus:ring-1`} placeholder={placeholder} onKeyDown={handleKeyDown}/>
            </div>
       
    )
}

export default TextAreaField