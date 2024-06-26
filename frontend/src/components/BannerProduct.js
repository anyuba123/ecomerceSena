import React, { useEffect, useState, useCallback, useMemo } from 'react';
import image1 from '../assest/banner/img1.jpg';

import image2 from '../assest/banner/im2.png';

import image3 from '../assest/banner/img3.jpg';

/* import image4 from '../assest/banner/img4.jpg';

import image5 from '../assest/banner/img5.webp'; */

import image1Mobile from '../assest/banner/img1_mobile (2).jpg';

import image2Mobile from '../assest/banner/img2_mobile.png';

import image3Mobile from '../assest/banner/img3_mobile.jpg';

/* import image4Mobile from '../assest/banner/img4_mobile.jpg';

import image5Mobile from '../assest/banner/img5_mobile.png'; */

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = useMemo(() => [
    image1,
    image2,
    image3,
/*     image4,
    image5 */
  ], []);
  const mobileImages = useMemo(() => [
    image1Mobile,
    image2Mobile,
    image3Mobile,
/*     image4Mobile,
    image5Mobile */
  ], []);

  const nextImage = useCallback(() => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage(prev => prev + 1);
    } else {
      setCurrentImage(0);
    }
  }, [desktopImages.length, currentImage]);

  const prevImage = useCallback(() => {
    if (currentImage !== 0) {
      setCurrentImage(prev => prev - 1);
    } else {
      setCurrentImage(desktopImages.length - 1);
    }
  }, [currentImage, desktopImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextImage, desktopImages]);

  return (
    <div className='container mx-auto px-4 rounded'>
      <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
          <div className='flex justify-between w-full text-2xl'>
            <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
            <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
          </div>
        </div>

        <div className='hidden md:flex h-full w-full overflow-hidden'>
          {desktopImages.map((imageURl, index) => (
            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
              <img src={imageURl} className='w-full h-full' alt={`Banner ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className='flex h-full w-full overflow-hidden md:hidden'>
          {mobileImages.map((imageURl, index) => (
            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
              <img src={imageURl} className='w-full h-full object-cover' alt={`Mobile Banner ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
