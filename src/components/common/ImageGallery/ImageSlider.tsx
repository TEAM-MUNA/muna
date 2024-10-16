import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./ImageSlider.css";

export interface SliderPosterType {
  id: string;
  title: string;
  poster: string;
}

export default function ImageSlider({
  images,
  setCurrentPosterIndex,
}: {
  images: SliderPosterType[];
  setCurrentPosterIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [initialSlideIndex, setInitialSlideIndex] = useState<number>(0);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    if (images.length > 0) {
      setInitialSlideIndex(0);
    }
  }, [images]);

  useEffect(() => {
    console.log("?");
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(initialSlideIndex);
    }
  }, [initialSlideIndex]);

  return (
    <div className='slider-container'>
      <Slider
        ref={sliderRef}
        initialSlide={initialSlideIndex}
        arrows
        slidesToScroll={1}
        slidesToShow={1}
        className='center'
        centerMode
        infinite
        centerPadding='125px'
        speed={500}
        beforeChange={(current: number, next: number) => {
          if (next === -1) {
            setCurrentPosterIndex(0);
            return;
          }
          setCurrentPosterIndex(next);
        }}
      >
        {images.map((image) => (
          <img
            className='image'
            src={image.poster}
            key={image.id}
            alt={image.title}
            height={300}
          />
        ))}
      </Slider>
    </div>
  );
}
