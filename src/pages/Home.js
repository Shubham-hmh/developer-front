import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import { useEffect } from 'react';
import { services } from '../utils/Data';
import { getAllBlogs } from '../features/blogs/blogSlice';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';
import { addToWishlist } from '../features/products/productSlice';
import ReactStars from 'react-rating-stars-component';


const Home = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state.product.product);
  console.log(productState);
  useEffect(() => {
    getblogs();
    getProducts();

  }, [])

  const getblogs = () => {
    dispatch(getAllBlogs());
  }

  const getProducts = () => {
    dispatch(getAllProducts());
  }

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  }

  return (
    <>



      <Container class1="home-wrapper-1 py-5">
  <div className="row">
    <div className="col-md-6">
      <div className="main-banner position-relative">
        <img src="images/main-banner.jpg" alt="main -banner" className="img-fluid rounded-3" />
        <div className="main-banner-content position-absolute">
          <h4>SUPERCHARGED FOR PROS.</h4>
          <h5>iPad S13+ Pro.</h5>
          <p>From $999.00 or $41.62/mo.</p>
          <Link className="button">BUY NOW</Link>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
        <div className="small-banner position-relative">
          <img src="images/catbanner-01.jpg" alt="main -banner" className="img-fluid rounded-3" />
          <div className="small-banner-content position-absolute">
            <h4>SUPERCHARGED FOR PROS.</h4>
            <h5>iPad S13+ Pro.</h5>
            <p>From $999.00 or<br /> $41.62/mo.</p>
          </div>
        </div>
        <div className="small-banner position-relative">
          <img src="images/catbanner-02.jpg" alt="main -banner" className="img-fluid rounded-3" />
          <div className="small-banner-content position-absolute">
            <h4>SUPERCHARGED FOR PROS.</h4>
            <h5>iPad S13+ Pro.</h5>
            <p>From $999.00 or<br /> $41.62/mo.</p>
          </div>
        </div>
        <div className="small-banner position-relative">
          <img src="images/catbanner-03.jpg" alt="main -banner" className="img-fluid rounded-3" />
          <div className="small-banner-content position-absolute">
            <h4>SUPERCHARGED FOR PROS.</h4>
            <h5>iPad S13+ Pro.</h5>
            <p>From $999.00 or<br /> $41.62/mo.</p>
          </div>
        </div>
        <div className="small-banner position-relative">
          <img src="images/catbanner-04.jpg" alt="main -banner" className="img-fluid rounded-3" />
          <div className="small-banner-content position-absolute">
            <h4>SUPERCHARGED FOR PROS.</h4>
            <h5>iPad S13+ Pro.</h5>
            <p>From $999.00 or<br /> $41.62/mo.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</Container>

<Container class1="home-wrapper-2 py-5">
  <div className="row">
    <div className="col-12">
      <div className="services d-flex flex-wrap align-items-center justify-content-between">
        {services?.map((i, j) => {
          return (
            <div className="d-flex align-items-center gap-15" key={j}>
              <img src={i.image} alt="services" />
              <div>
                <h6>{i.title}</h6>
                <p className="mb-0">{i.tagline}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</Container>



      <Container class1="featured-wrapper py-5 home-wrapper-2">
  <div className="row">
    <div className="col-12">
      <h3 className="section-heading">
        Featured Collections
      </h3>
    </div>
    {productState &&
      productState.map((item, index) => {
        if (item.tags === "featured") {
          return (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                  <button className="border-0 bg-transparent" onClick={(e) => { addToWish(item?._id) }}>
                    <img src="images/wish.svg" alt="wishlist" />
                  </button>
                </div>
                <div className="product-image">
                  <img src={item?.images[0].url} className="img-fluid mx-auto" alt="product-image" width={160} />
                  <img src="images/tv.jpg" className="img-fluid mx-auto" alt="product-image" width={160} />
                </div>
                <div className="product-details">
                  <h6 className="brand">{item?.brand}</h6>
                  <h5 className="product-title">
                    {item?.title}
                  </h5>
                  <ReactStars
                    count={5} size={24} value={item?.totalrating} edit={false} activeColor="#ffd700"
                  />
                  <p className="price">
                    $ {item?.price}
                  </p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <button className="border-0 bg-transparent">
                      <img onClick={() => { navigate("/product/" + item?._id) }} src="images/view.svg" alt="view" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
  </div>
</Container>


      <Container class1="famous-wrapper py-5 home-wrapper-2">
  <div className="row">
    <div className="col-md-3 col-sm-6">
      <div className="famous-card position-relative">
        <img src="https://images.unsplash.com/photo-1537589376225-5405c60a5bd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80" className='img-fluid' alt="" />
        <div className="famous-content position-absolute">
          <h5 className='text-dark'>Big Screen</h5>
          <h6 className='text-dark'>Smart Watch Series S7</h6>
          <p className='text-dark'>From $399 or $16.62/mo. for 24 mon.*</p>
        </div>
      </div>
    </div>

    <div className="col-md-3 col-sm-6">
      <div className="famous-card position-relative">
        <img src="https://images.unsplash.com/photo-1550029402-226115b7c579?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGlwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" className='img-fluid' alt="" />
        <div className="famous-content position-absolute">
          <h5 className='text-white'>Big Screen</h5>
          <h6 className='text-white'>Smart Watch Series S7</h6>
          <p className='text-white'>From $399 or $16.62/mo. for 24 mon.*</p>
        </div>
      </div>
    </div>
    
    <div className="col-md-3 col-sm-6">
      <div className="famous-card position-relative">
        <img src="https://images.unsplash.com/photo-1550029402-226115b7c579?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGlwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" className='img-fluid' alt="" />
        <div className="famous-content position-absolute">
          <h5 className='text-white'>Big Screen</h5>
          <h6 className='text-white'>Smart Watch Series S7</h6>
          <p className='text-white'>From $399 or $16.62/mo. for 24 mon.*</p>
        </div>
      </div>
    </div>
    
    <div className="col-md-3 col-sm-6">
      <div className="famous-card position-relative">
        <img src="https://images.unsplash.com/photo-1550029402-226115b7c579?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGlwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" className='img-fluid' alt="" />
        <div className="famous-content position-absolute">
          <h5 className='text-white'>Big Screen</h5>
          <h6 className='text-white'>Smart Watch Series S7</h6>
          <p className='text-white'>From $399 or $16.62/mo. for 24 mon.*</p>
        </div>
      </div>
    </div>
  </div>
</Container>





      <Container class1="special-wrapper home-wrapper-2 py-5">
  <div className="row">
    <div className="col-12">
      <h3 className="section-heading">Special Products</h3>
    </div>
  </div>
  <div className="row">
    {productState &&
      productState?.map((item, index) => {
        if (item.tags === "special") {
          return (
            <div key={index} className="col-12 col-md-4">
              <SpecialProduct
                id={item?._id}
                sold={item?.sold}
                quantity={item?.quantity}
                images={item?.images[0].url}
                brand={item?.brand}
                title={item?.title}
                price={item?.price}
                totalrating={item?.totalrating}
              />
            </div>
          );
        }
      })}
  </div>
</Container>

<Container class1="popular-wrapper py-5 home-wrapper-2">
  <div className="row">
    <div className="col-12">
      <h3 className="section-heading">Our Popular Products</h3>
    </div>
  </div>
  <div className="row">
    {productState &&
      productState?.map((item, index) => {
        if (item.tags === "popular") {
          return (
            <div key={index} className="col-6 col-md-3">
              <div className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                  <button
                    className="border-0 bg-transparent"
                    onClick={(e) => {
                      addToWish(item?._id);
                    }}
                  >
                    <img src="images/wish.svg" alt="wishlist" />
                  </button>
                </div>
                <div className="product-image">
                  <img
                    src={item?.images[0].url}
                    className="img-fluid mx-auto"
                    alt="product-image"
                    width={160}
                  />
                  <img
                    src="images/tv.jpg"
                    className="img-fluid mx-auto"
                    alt="product-image"
                    width={160}
                  />
                </div>
                <div className="product-details">
                  <h6 className="brand">{item?.brand}</h6>
                  <h5 className="product-title">{item?.title}</h5>
                  <ReactStars
                    count={5}
                    size={24}
                    value={item?.totalrating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="price">$ {item?.price}</p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-15">
                    <button className="border-0 bg-transparent">
                      <img
                        onClick={() => {
                          navigate("/product/" + item?._id);
                        }}
                        src="images/view.svg"
                        alt="view"
                      />
                    </button>
                    {/* <button className='border-0 bg-transparent'>
                      <img src="images/prodcompare.svg" alt="prodcompare" />
                    </button>
                    <button className='border-0 bg-transparent'>
                      <img src="images/add-cart.svg" alt="addcart" />
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
  </div>
</Container>



      <Container class1="marque-wrapper home-wrapper-2 py-5">
  <div className="row">
    <div className="col-12">
      <div className="marquee-inner-wrapper card-wrapper">
        <Marquee className="d-flex flex-wrap">
          <div className="mx-4 w-25">
            <img src="images/brand-01.png" alt="" />
          </div>
          <div className="mx-4 w-25">
            <img src="images/brand-02.png" alt="brand" />
          </div>
          <div className="mx-4 w-25">
            <img src="images/brand-03.png" alt="brand" />
          </div>
          <div className="mx-4 w-25">
            <img src="images/brand-04.png" alt="brand" />
          </div>
          <div className="mx-4 w-25">
            <img src="images/brand-05.png" alt="brand" />
          </div>
          <div className="mx-4 w-25">
            <img src="images/brand-06.png" alt="brand" />
          </div>
          <div className="mx-4 w-25">
            <img src="images/brand-07.png" alt="brand" />
          </div>
          <div className="mx-4 w-25">
            <img src="images/brand-08.png" alt="brand" />
          </div>
        </Marquee>
      </div>
    </div>
  </div>
</Container>

<Container class1="blog-wrapper py-5 home-wrapper-2">
  <div className="row">
    <div className="col-12">
      <h3 className="section-heading">Our latest blogs</h3>
    </div>
  </div>
  <div className="row">
    {blogState &&
      blogState?.map((item, index) => {
        if (index < 3) {
          return (
            <div key={index} className="col-12 col-md-4">
              <BlogCard
                id={item?._id}
                title={item?.title}
                description={item?.description}
                image={item?.images[0]?.url}
                date={moment(item?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              />
            </div>
          );
        }
      })}
  </div>
</Container>


    </>
  )
}

export default Home