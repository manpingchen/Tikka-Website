const productListSlideConfig = {
  slidesToShow: 5,
  slidesToScroll: 5,
  infinite: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: "unslick",
    },
  ],
};

const highlightSlideConfig = { infinite: true, dots: true };
