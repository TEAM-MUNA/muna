import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./ImageSlider.scss";
import { Link, useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../assets/svg/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/svg/ArrowRightIcon";

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
  const sliderRef = useRef<Slider | null>(null);
  const [centerPadding, setCenterPadding] = useState<string>("100px");
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const navigate = useNavigate();

  const updateCenterPadding = () => {
    if (window.innerWidth <= 300) {
      setCenterPadding("50px");
    } else if (window.innerWidth <= 350) {
      setCenterPadding("70px");
    } else if (window.innerWidth <= 420) {
      setCenterPadding("100px");
    } else {
      setCenterPadding("110px");
    }
  };

  const goToSlide = () => {
    if (sliderRef.current) {
      // console.log("go to slide");
      sliderRef.current.slickGoTo(0);
    }
  };

  useEffect(() => {
    updateCenterPadding();
    goToSlide();

    window.addEventListener("resize", updateCenterPadding);
    return () => window.removeEventListener("resize", updateCenterPadding);
  }, [images]);

  return (
    <div className='slider-container'>
      <Slider
        ref={sliderRef}
        arrows
        slidesToScroll={1}
        slidesToShow={1}
        className='center'
        centerMode
        autoplay
        infinite
        centerPadding={centerPadding}
        speed={500}
        beforeChange={(current: number, next: number) => {
          if (next === -1) {
            setCurrentPosterIndex(0);
            setCurrentSlide(0);
            return;
          }
          setCurrentPosterIndex(next);
          setCurrentSlide(next);
        }}
        nextArrow={
          <span>
            <ArrowRightIcon size='24' />
          </span>
        }
        prevArrow={
          <div>
            <ArrowLeftIcon size='24' />
          </div>
        }
      >
        {images.map((image, index) => (
          <Link
            className='link'
            key={image.id}
            to={currentSlide === index ? `/concert/${image.id}` : "/"}
            onClick={(e) => {
              if (currentSlide === index) {
                navigate(`/concert${image.id}`);
              } else {
                e.preventDefault();
              }
            }}
          >
            <img
              className='image'
              src={image.poster}
              alt={image.title}
              height={300}
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
}
