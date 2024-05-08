import React from 'react'
import Slider from "react-slick";
import img1 from '../../assets/img/health.png'
import img2 from '../../assets/img/lap.png'
import img3 from '../../assets/img/mobile.png'
import img4 from '../../assets/img/Market.png'
import img5 from '../../assets/img/Baby.png'

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='row g-0'>
      <div className="col-md-8">
      <Slider {...settings}>
      <img src={img3} className='w-100' alt='img' height={500} />
      <img src={img4} className='w-100' alt='img' height={500}/> 
      <img src={img5} className='w-100' alt='img' height={500}/>
      </Slider>
      </div>
      <div className="col-md-4">
        <img src={img1} className='w-100' alt='img' height={250} />
        <img src={img2} className='w-100' alt='img' height={250}/>

      </div>
    </div>
  )
}
