import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";

import Quote from '@editorjs/quote';
import InlineCode from '@editorjs/inline-code';

const uploadByUrl = (e) => {
    const link = new Promise((resolve, reject) => {
        try {
            resolve(e)
        } catch (error) {
            reject(error);
        }
    });

    return link.then(url => {
        return {
            success: 1,
            file: { url },
        }
    })
}


const uploadByFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);  // ← DO NOT use file.target.files[0] here
    formData.append('upload_preset', 'anujDai_blog_img');
    formData.append('cloud_name', 'manojadmin');

    try {
        const res = await fetch('https://api.cloudinary.com/v1_1/manojadmin/image/upload', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();

        if (res.ok && data.url) {
            return {
                success: 1,
                file: {
                    url: data.url
                }
            };
        } else {
            throw new Error(data.error?.message || 'Upload failed');
        }

    } catch (error) {
        console.error('Image upload failed:', error);
        return {
            success: 0
        };
    }
};


export const tools = {
    header: {
        class: Header,
        config: {
            placeholder: "Type heading...",
            levels: [1, 2, 3],
            defaultLevel: 1,
        },

    },
    list: {
        class: List,
        inlineToolbar: true,

    },
    embed: Embed,
    image: {
        class: Image,
        config: {
            captionPlaceholder: 'Enter a caption',
            withBorder: true,
            withBackground: true,
            buttonContent: 'Select an Image',
            uploader: {
                uploadByUrl,
                uploadByFile,
            }
        }
    },
    quote: Quote,
    inlineCode: InlineCode
}