import React from 'react';
import img1  from '../images/Home_img1.avif';
import img2 from '../images/Home_img2.webp';
import img3 from '../images/Home_img4.jpg';
const Home = () => {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item">
      <img src={img1} className="d-block" alt="..."/>
    </div>
    <div className="carousel-item">
      <img  src={img2} className="d-block" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={img3} className="d-block" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  );
};

export default Home;
