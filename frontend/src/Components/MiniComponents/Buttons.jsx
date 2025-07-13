import React from 'react'

const Buttons = ({type,text,bgColor,p,m,borderRadius,textColor,fontWeight,fontSize,width,disabled}) => {
  return (
    <button type={type} className={` ${p} ${m} ${bgColor} ${borderRadius} ${textColor} ${fontWeight} cursor-pointer ${fontSize} ${width}`} disabled={disabled}>{text}</button>
  )
}

export default Buttons