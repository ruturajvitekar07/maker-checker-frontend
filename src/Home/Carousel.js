import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  const slides = [
    { id: 1, image: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?cs=srgb&dl=pexels-pixabay-147411.jpg&fm=jpg' },
    { id: 2, image: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?cs=srgb&dl=pexels-pixabay-147411.jpg&fm=jpg' },
    { id: 3, image: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?cs=srgb&dl=pexels-pixabay-147411.jpg&fm=jpg' }
  ];

  return (
    <Slider {...settings}>
      {slides.map(slide => (
        <div key={slide.id} style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={slide.image} alt={`Slide ${slide.id}`} width={1300} height={600} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
