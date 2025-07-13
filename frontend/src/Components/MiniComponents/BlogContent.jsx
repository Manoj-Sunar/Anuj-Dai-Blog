import { motion } from 'framer-motion';

const BlogContent = ({ Content }) => {
    const { type, data } = Content;

    switch (type) {
        case 'paragraph':
            return (
                <motion.p
                    dangerouslySetInnerHTML={{ __html: data.text }}
                    className="text-base text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            );

        case 'header': {
            const level = data?.level || 2;
            const Tag = `h${level}`;
            const size = level === 1 ? 'text-xl' : level === 3 ? 'text-xl' : 'text-xl';
            return (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Tag className={`${size} font-semibold text-gray-900`}>{data.text}</Tag>
                </motion.div>
            );
        }

        case 'image':
            return <Image url={data?.file?.url} caption={data?.caption} />;

        case 'quote':
            return <Quote quote={data?.text} caption={data?.caption} />;

        case 'list':
            return <List style={data?.style} items={data?.items} />;

        default:
            return null;
    }
};




const Image = ({ url, caption }) => {
    return (
        <motion.div className="my-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <img loading='lazy' src={url} alt={caption || 'blog image'} className="w-full rounded-md shadow-md my-10" />
            {caption && <p className="text-sm text-gray-600 italic mt-1 text-center">{caption}</p>}
        </motion.div>
    );
};



const Quote = ({ quote, caption }) => {
    return (
        <motion.blockquote
            className="bg-purple-50 p-5 border-l-4 border-purple-600 rounded-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            <p className="text-lg text-gray-800 font-medium">{quote}</p>
            {caption && <footer className="text-sm text-purple-600 mt-2">— {caption}</footer>}
        </motion.blockquote>
    );
};



const List = ({ style, items }) => {


    const isOrdered = style === 'ordered';
    const Tag = isOrdered ? 'ol' : 'ul';
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Tag className={`pl-6 ${isOrdered ? 'list-decimal' : 'list-disc'} text-gray-700 space-y-1`}>
                {items?.map((item, index) => (
                    <li
                        key={index}
                        dangerouslySetInnerHTML={{ __html: item?.content }}
                        className="text-sm"
                    />
                ))}
            </Tag>
        </motion.div>
    );
};

export default BlogContent;
