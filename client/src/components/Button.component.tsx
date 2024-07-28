import React from "react";

const Button = ({ text, onClick }: {text: string, onClick: ()=> null}) => {
    console.log('Button component rendered');
    return (
        <button onClick={onClick} className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-white text-black hover:bg-gray-100`}>
            {text}
        </button>
    )
}

export default Button;