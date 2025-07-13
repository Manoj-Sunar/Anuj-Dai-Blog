import { useState } from "react";
import LabelInputField from "../Components/TextField/LabelInputField";
import Buttons from "../Components/MiniComponents/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../actions/AuthLogic";
import { useContext } from "react";
import { BlogContext } from "../ContextAPI/BlogContextAPI";
import Avatar from '@mui/material/Avatar';
import { UploadFileIntoCloudinary } from "../Utility/UploadFileInToCloudinary";

const SignUp = () => {

  const [signUpUser, setSignUpUser] = useState({

    profileImage: '',
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",

  });


  const [previewImg, setPreviewImg] = useState("");
  const [uploading, setUploading] = useState(false);

  const Navigate = useNavigate();

  const { isPending, startTransition, error, setError, setAuthUser } = useContext(BlogContext);


  const handleFileChange = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = await UploadFileIntoCloudinary(setUploading, file);
    console.log(imageUrl);
    setPreviewImg(imageUrl);
    setSignUpUser(prev=>({...prev,profileImage:imageUrl}));

  }




  const handleSubmit = (e) => {

    e.preventDefault();
    const formData = new FormData();
    Object.entries(signUpUser).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      registerUser(formData)
        .then((res) => {

          localStorage.setItem("token", res?.token);
          setAuthUser(res?.newUser);
          setSignUpUser({
            name: "",
            email: "",
            phone: "",
            address: "",
            password: "",
          });

          Navigate("/sign-in")

        })
        .catch((err) => {
          setError(`${err}`);
        });
    });

  };




  return (
    <div className="md:shadow-2xs md:rounded-lg md:border md:border-gray-100 md:w-[35%] m-auto mt-[20px] py-5 px-10">
      <h1 className="text-xl font-semibold text-gray-700">Sign Up</h1>

      <form onSubmit={handleSubmit} className="mt-7">
        <div className="flex flex-col items-start justify-center gap-3 ">
          <label htmlFor="profile">
            <Avatar sx={{ width: '80px', height: '80px' }} src={previewImg}/>
          </label>
          <div className="mt-5 relative w-full  ">
            {/* Label positioned on the border */}
            <div className="absolute -top-4 left-2 bg-white px-1">
              <label className="text-[13px] font-medium text-gray-700">
                profile Image
              </label>
            </div>

            {/* Input field with adjusted border */}
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full  px-3 py-[10px] text-[13px] shadow-xs placeholder-gray-400 border-[1px] ring-[0.5px] border-gray-400 rounded-md 
                   focus:outline-none focus:ring-[0.8px] focus:shadow-sm focus:ring-gray-600 
                   "
            />
          </div>
        </div>
        <LabelInputField type="text" name="name" value={signUpUser.name} setState={setSignUpUser} placeholder="Enter your name" label="Name" />
        <LabelInputField type="email" name="email" value={signUpUser.email} setState={setSignUpUser} placeholder="Enter your email" label="Email" />
        <LabelInputField type="number" name="phone" value={signUpUser.phone} setState={setSignUpUser} placeholder="Enter your phone" label="Phone" />
        <LabelInputField type="text" name="address" value={signUpUser.address} setState={setSignUpUser} placeholder="Enter your address" label="Address" />
        <LabelInputField type="password" name="password" value={signUpUser.password} setState={setSignUpUser} placeholder="Enter your password" label="Password" />

        <Buttons
          type="submit"
          text={isPending ? "Signing Up..." : "Sign Up"}
          textColor="text-white"
          bgColor="bg-[#AD49E1]"
          p="py-2 px-5"
          fontSize="text-sm"
          borderRadius="rounded-sm"
          width="w-full"
          m="mt-2"
        />

        {error && <p className="text-red-500 text-xs mt-2 border text-center">{error?.slice(7, error?.length)}</p>}

        <div className="w-full flex items-center justify-center gap-2 mt-2">
          <span className="text-xs">Already have an Account</span>
          <Link to="/sign-in" className="text-xs underline">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
