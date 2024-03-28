import { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material"
import "./Carousel.css";

import image_1 from "../Assets/Carousel_Images/image_1.jpg";
import image_2 from "../Assets/Carousel_Images/image_2.jpg";
import image_3 from "../Assets/Carousel_Images/image_3.jpg";
import image_4 from "../Assets/Carousel_Images/image_4.jpg";

const images = [
    {
      image: image_1,
    },
    {
      image: image_2,
    },
    {
      image: image_3,
    },
    {
      image: image_4,
    }
  ];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut = null;

  useEffect(() => {
    timeOut =
      autoPlay &&
      setTimeout(() => {
        slideRight();
      }, 3500);
  });

  const slideRight = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const slideLeft = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <Grid
      className="carousel"
      onMouseEnter={() => {
        setAutoPlay(false);
        clearTimeout(timeOut);
      }}
      onMouseLeave={() => {
        setAutoPlay(true);
      }}
    >
      <Grid className="carousel_wrapper">
        {images.map((image, index) => {
          return (
            /* (condition) ? true : false */

            <Grid
              key={index}
              className={
                index == current
                  ? "carousel_card carousel_card-active"
                  : "carousel_card"
              }
            >
              <img className="card_image" src={image.image} alt="" />
              <Grid className="card_overlay"></Grid>
            </Grid>
          );
        })}
        <div className="carousel_arrow_left" onClick={slideLeft}>
          &lsaquo;
        </div>
        <div className="carousel_arrow_right" onClick={slideRight}>
          &rsaquo;
        </div>
        <Grid className="carousel_pagination">
          {images.map((_, index) => {
            return (
              <Grid
                key={index}
                className={
                  index == current
                    ? "pagination_dot pagination_dot-active"
                    : "pagination_dot"
                }
                onClick={() => setCurrent(index)}
              ></Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Carousel;