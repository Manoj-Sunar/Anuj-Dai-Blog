import { useState } from "react"
import LabelInputField from "../Components/TextField/LabelInputField";
import Buttons from "../Components/MiniComponents/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../actions/AuthLogic";
import { BlogContext } from "../ContextAPI/BlogContextAPI";
import { useContext } from "react";


const SignIn = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });


    const Navigate = useNavigate();

    const { isPending, startTransition, error, setError, setAuthUser } = useContext(BlogContext);


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(user).forEach(([key, value]) => {
            formData.append(key, value);
        });

        startTransition(() => {
            LoginUser(formData)
                .then((res) => {

                    localStorage.setItem("token", res?.token);
                    setAuthUser(res?.isUserExist);
                    setUser({
                        email: "",
                        password: "",
                    });

                    Navigate("/");

                })
                .catch((err) => {
                    setError(`${err}`);
                });
        });
    };



    return (
        <div className="md:shadow-2xs md:rounded-lg  md:border md:border-gray-100 md:w-[35%] m-auto mt-[50px] py-5 px-10">
            <h1 className="text-xl font-semibold text-gray-700">Sign In</h1>
            <div className="mt-7">
                <form onSubmit={handleSubmit}>

                    <LabelInputField type={'email'} name={'email'} value={user.email} setState={setUser} placeholder={'Enter your email'} label={'email'} />

                    <LabelInputField type={'password'} name={'password'} value={user.password} setState={setUser} placeholder={'Enter your password'} label={'Password'} />
                    <div className="flex  justify-end my-2">
                        <Link to={'/forgot-password'} className="text-xs italic text-[#4C3BCF] underline">Forgot your password</Link>
                    </div>
                    <Buttons
                        type="submit"
                        text={isPending ? "Signing In..." : "Sign In"}
                        textColor="text-white"
                        bgColor="bg-[#8f71ff]"
                        p="py-2 px-5"
                        fontSize="text-sm"
                        borderRadius="rounded-sm"
                        width="w-full"
                        m="mt-2"
                    />

                    {error && <p className="text-red-500 text-xs mt-2 text-center">{error?.slice(7, error?.length)}</p>}

                    <div className="w-full flex items-center justify-center gap-2 mt-2">
                        <span className="text-xs">don't have an Account </span>
                        <Link to='/sign-up' className="text-xs underline">Sign Up</Link>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default SignIn