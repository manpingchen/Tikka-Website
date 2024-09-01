const productListSlideConfig = {
  slidesToShow: 4,
  slidesToScroll: 4,
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

const productDetailMainPicSlideConfig = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: ".product-nav",
};

const productNavSlideConfig = {
  slidesToShow: 4.5,
  slidesToScroll: 1,
  asNavFor: ".product-zoom-in",
  focusOnSelect: true,
  arrows: false,
  infinite: false,
};
