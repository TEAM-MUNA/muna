import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./ImageSlider.css";

export interface ImageType {
  alt: string;
  src: string;
}

export default function ImageSlider({ images }: { images: ImageType[] }) {
  return (
    <div className='slider-container'>
      <Slider
        arrows
        slidesToScroll={1}
        slidesToShow={1}
        // autoplay
        className='center'
        centerMode
        infinite
        centerPadding='100px'
        speed={500}
      >
        {/* // 182.1 x 285.48 */}
        {images.map((image) => (
          <img
            className='image'
            src={image.src}
            key={image.src}
            alt={image.alt}
          />
        ))}
      </Slider>
    </div>
  );
}
