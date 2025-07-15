import Avatar from '@mui/material/Avatar';
import React, { useContext, useState } from 'react'
import LabelInputField from '../../Components/TextField/LabelInputField';
import { BlogContext } from '../../ContextAPI/BlogContextAPI';

const AdminProfile = () => {

    const { authUser } = useContext(BlogContext);
    console.log(authUser);

    const [previewImg, setPreviewImg] = useState("");

    const [profile, setProfile] = useState({
        profileImage:"",
        name: "",
        email: '',
        phone: '',
        address: '',
    });

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });


    const UploadFileChanged = (e) => {

        const file = e.target.files[0];
        if (file) {
            const image = URL.createObjectURL(file);
            setPreviewImg(image)
        }

        if (previewImg) {
            setProfile(prev => ({
                ...prev,
                profileImage: previewImg,
            }));
        }

    }


    const HandleProfileSubmitForm = (e) => {
        e.preventDefault();
        console.log(profile);
    }

    const HandlePasswordSubmitForm = (e) => {
        e.preventDefault();
        
    }

    useState(()=>{

       setPreviewImg(authUser?.profileImage),

       setProfile({
        name:authUser?.name,
        email:authUser?.email,
        phone:authUser?.phone,
        address:authUser?.address,
    });


    },[])

    return (
        <div className='flex flex-col gap-y-10 md:w-[70%]'>
            <div className='border border-gray-300 shadow-2xs rounded-lg md:p-3 p-1'>
                <form onSubmit={HandleProfileSubmitForm} className='flex flex-col  p-3 gap-y-2'>
                    <label htmlFor="profileImage" className='relative flex items-center justify-center  bg-gray-200 w-[100px] h-[100px] rounded-full'>
                        <Avatar src={previewImg} sx={{ width: '100%', height: '100%' }} />
                        <input type='file' accept='.jpg,.png.jpeg' className='absolute z-8 w-full h-full rounded-full opacity-0' onChange={UploadFileChanged} />

                    </label>
                    <div className='flex flex-col md:flex-row md:gap-3'>
                        <LabelInputField type={'text'} label={'Name'} name={"name"} value={profile?.name} setState={setProfile} />
                        <LabelInputField type={'text'} label={'Email'} name={"email"} value={profile?.email} setState={setProfile} />

                    </div>
                    <div className='flex flex-col md:flex-row md:gap-3'>
                        <LabelInputField type={'text'} label={'Contact Number'} name={'phone'} value={profile?.phone} setState={setProfile} />
                        <LabelInputField type={'text'} label={'Address'} name={'address'} value={profile?.address} setState={setProfile} />
                    </div>

                    <button type='submit' className='w-full mt-3 p-2 font-medium text-xs text-white rounded-sm bg-[#7E60BF]'>Save Changes</button>
                </form>
            </div>



            <div className='border border-gray-300 shadow-2xs rounded-lg p-3'>
                <h1 className='font-semibold text-gray-700 text-xl'>Password Changes</h1>
                <form onSubmit={HandlePasswordSubmitForm} className='flex flex-col  p-3'>
                    <LabelInputField type={'password'} label={'Current Password'} name={'currentPassword'} value={password?.currentPassword} setState={setPassword} placeholder={""}/>
                    <LabelInputField type={'password'} label={'New Password'} name={'newPassword'} value={password?.newPassword} setState={setPassword} />
                    <LabelInputField type={'password'} label={'Confirm Password'} name={'confirmPassword'} value={password?.confirmPassword} setState={setPassword} />
                    <button type='submit' className='w-full text-xs mt-3 p-2 font-medium text-white rounded-sm bg-[#7E60BF]'>Save Changes</button>
                </form>
            </div>
        </div>
    )
}

export default AdminProfile