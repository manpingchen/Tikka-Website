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

const homeDesktopPadOnlySlideConfig = (slidesToShow) => ({
  slidesToShow: slidesToShow,
  slidesToScroll: slidesToShow,
  infinite: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 767,
      settings: "unslick",
    },
  ],
});
