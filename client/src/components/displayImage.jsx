import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const DisplayImage = ({ imgUrl, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-60'>
            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
                <button className='block ml-auto hover:text-primary font-bold text-2xl' onClick={onClose}>
                    <IoClose />
                </button>
                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                    <img src={imgUrl} alt="Product display" className='w-full object-contain' />
                </div>
            </div>
        </div>
    );
};

export default DisplayImage;
