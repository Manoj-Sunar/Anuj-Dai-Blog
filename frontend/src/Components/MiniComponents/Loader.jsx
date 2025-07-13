

const BlogLoader = () => {
    return (
        <div className="min-h-screen flex  flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100   p-4">
            {/* SVG Book Animation */}
            <div className="w-50 h-50 mb-2 animate-fadeIn">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g fill="none" stroke="#4f46e5" strokeWidth="5">
                        <path d="M50 30 Q70 10 90 30 T130 30" />
                        <path d="M50 30 Q70 50 90 30 T130 30">
                            <animate
                                attributeName="d"
                                values="
                  M50 30 Q70 10 90 30 T130 30;
                  M50 30 Q70 50 90 30 T130 30;
                  M50 30 Q70 10 90 30 T130 30"
                                dur="1.5s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <line x1="90" y1="30" x2="90" y2="80" />
                        <line x1="90" y1="30" x2="90" y2="80" />
                        <line x1="50" y1="30" x2="50" y2="80" />
                        <line x1="130" y1="30" x2="130" y2="80" />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default BlogLoader;
