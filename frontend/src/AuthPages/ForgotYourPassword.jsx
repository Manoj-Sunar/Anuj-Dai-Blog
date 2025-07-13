import React, { useState } from 'react'
import LabelInputField from '../Components/TextField/LabelInputField';
import Buttons from '../Components/MiniComponents/Buttons';

const ForgotYourPassword = () => {

    const [forgotEmail,setForgotEmail]=useState({
        email:"",
    });


  return (
    <div className='md:w-[35%] mx-auto md:p-2 p-5 md:my-30 mt-10 flex flex-col gap-y-3'>
        <h1 className='text-xl text-gray-600'>Forgot your Password</h1>
        <form>
            <LabelInputField type={'email'} name={'email'} value={forgotEmail.email} label={'Email'} placeholder={"Enter your register email"}/>
             <Buttons type={'submit'} text={'Submit'} textColor={'text-white'} bgColor={"bg-[#AD49E1]"} p={'py-2 px-5'} fontSize={'text-sm'} borderRadius={'rounded-sm'} width={'w-full'} m={'mt-2'} />
        </form>

    </div>
  )
}

export default ForgotYourPassword