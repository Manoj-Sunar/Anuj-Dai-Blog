
import { useTransition } from "react";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { AuthUser } from "../actions/AuthLogic";
import { GetAllBlogs } from "../actions/BlogAPI";




export const BlogContext = createContext({});



export const BlogContextProvider = ({ children }) => {



    const [Blog, setBlog] = useState({
        title: '',
        banner: '',
        content: [],
        tags: [],
        des: '',
        draft: "",
        author: { personal_info: {} },
    });

    const [allBlogs, setAllBlogs] = useState([]);



    const [authUser, setAuthUser] = useState(null);

    const [textEditor, setTextEditor] = useState({ isReady: false });

    const [blogEditor, setBlogEditor] = useState("Editor");

    const [uploadImgPreview, setUploadImgPreview] = useState("");

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState(null);

    const [blogTitle, setBlogTitle] = useState({
        title: "",
        description: "",
    });

    const [query, setQuery] = useState({
        author: '',
        title: '',
        tags: [],
    });


    useEffect(() => {
        startTransition(() => {
            AuthUser()
                .then((res) => {
                    console.log("Success:", res);
                    setAuthUser(res?.authUserData);
                })
                .catch((err) => {
                    setError(`${err}`);
                });
        });

    }, [])


    useEffect(() => {
        const urlParams = new URLSearchParams();

        if (query.searchBy === 'title') urlParams.append('title', query.search);
        if (query.searchBy === 'author') urlParams.append('author', query.search);
        if (query.tags?.length) urlParams.append('tags', query.tags.join(','));

        const newQueryString = urlParams.toString();

        startTransition(() => {
            GetAllBlogs(newQueryString)
                .then((res) => {
                    setAllBlogs(res);
                })
                .catch((err) => {
                    setError(`${err}`);
                });
        });
    }, [query]);
    // 🔁 track changes deeply but prevent shallow mismatch





    return (
        <>
            <BlogContext.Provider value={{

                authUser,
                setAuthUser,
                blogEditor,
                Blog,
                setBlog,
                setBlogEditor,
                textEditor,
                setTextEditor,
                uploadImgPreview,
                setUploadImgPreview,
                blogTitle,
                setBlogTitle,
                isPending,
                startTransition,
                error,
                setError,
                allBlogs,
                setAllBlogs,
                query,
                setQuery,
               

            }}>
                {children}
            </BlogContext.Provider>
        </>
    )
}