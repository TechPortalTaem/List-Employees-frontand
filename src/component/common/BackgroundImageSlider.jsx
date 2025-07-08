import React, {useState} from "react";
  import { Carousel } from "react-bootstrap";
import { p2,p3,p4,p5, p6 } from "../../assets/images";
 

const BackgroundImageSlider = () => {
  const backgrounds = [ p3, p2,p6,  p4, p5, ];
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='background-slider'>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={20000}>
        {backgrounds.map((background, idx) => (
          <Carousel.Item key={idx}>
            <img
              className='d-block w-100'
              src={background}
              alt={`Slide ${idx}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default BackgroundImageSlider;
