

const InputTextField = ({label,type,name,state,setState,placeHolder,handleKeyDown}) => {

  const handleInputChange=(e)=>{

     const{name,value}=e.target;
     setState(prev=>({
      ...prev,
      [name]:value,
     }));
    
  }

  return (
    <div className={`flex flex-col gap-y-1 p-1 gap-2`}>
      <label className="text-sm text-gray-600 ">{label}</label>
      <input type={type} name={name} value={state} onChange={handleInputChange}  placeholder={placeHolder} className={`bg-gray-100 px-2 text-[12px] py-2 text-gray-700 focus:shadow-xs focus:border-1 focus:border-gray-100 focus:ring-1 focus:ring-gray-200 outline-none rounded-sm`} onKeyDown={handleKeyDown}/>
    </div>
  )
}

export default InputTextField