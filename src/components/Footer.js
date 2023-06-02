import React from 'react'
import { BsSearch } from 'react-icons/bs';
import {Link} from 'react-router-dom';
import { BsLinkedin,BsGithub,BsYoutube,BsInstagram } from 'react-icons/bs';

const Footer = () => {
  return (
    <>


      <footer className="py-4">
  <div className="container-xxl">
    <div className="row align-items-center">
      <div className="col-12 col-md-5 mb-3 mb-md-0">
        <div className="footer-top-data d-flex gap-30 align-items-center">
          <img src="images/newsletter.png" alt="newsletter" />
          <h2 className="mb-0 text-white">Sign Up for newsletter</h2>
        </div>
      </div>
      <div className="col-12 col-md-7">
        <div className="input-group">
          <input type="text" className="form-control py-1 mb-1" placeholder="Your Email Address.." aria-label="Your Email Address.." aria-describedby="basic-addon2" />
          <span className="input-group-text p-2 mb-1" id="basic-addon2">
            <BsSearch className="fs-6" />
            Subscribe
          </span>
        </div>
      </div>
    </div>
  </div>
</footer>

<footer className="py-4">
  <div className="container-xxl">
    <div className="row">
      <div className="col-12 col-md-4 mb-4">
        <h4 className="text-white mb-4">Contact Us</h4>
        <div>
          <address className="text-white fs-6">
            Hno : 277 Near vill chopal, <br />
            Florida, New York <br />
            Pin code: us 12421
          </address>
          <a href="tel:+91 826676547" className="mt-3 d-block mb-1 text-white">
            +91 826676547
          </a>
          <a href="mailto:ecom@gmail.com" className="mt-2 d-block mb-0 text-white">
            ecom@gmail.com
          </a>
          <div className="social_icons d-flex align-items-center gap-30 mt-4">
            <a className="text-white" href="#">
              <BsGithub className="text-white fs-3" />
            </a>
            <a className="text-white" href="#">
              <BsLinkedin className="text-white fs-3" />
            </a>
            <a className="text-white" href="#">
              <BsInstagram className="text-white fs-3" />
            </a>
            <a className="text-white" href="#">
              <BsYoutube className="text-white fs-3" />
            </a>
          </div>
        </div>
      </div>
      <div className="col-6 col-md-3 mb-4">
        <h4 className="text-white mb-4">Information</h4>
        <div className="footer-links d-flex flex-column">
          <Link to="/privacy-policy" className="text-white mb-1 py-2">
            Privacy Policy
          </Link>
          <Link to="/shipping-policy" className="text-white mb-1 py-2">
            Shipping Policy
          </Link>
          <Link to="/refund-policy" className="text-white mb-1 py-2">
            Refund Policy
          </Link>
          <Link to="/term-policy" className="text-white mb-1 py-2">
            Terms & Conditions
          </Link>
          <Link className="text-white mb-1 py-2">Blogs</Link>
        </div>
      </div>
      <div className="col-6 col-md-3 mb-4">
        <h4 className="text-white mb-4">Account</h4>
        <div className="footer-links d-flex flex-column">
          <Link className="text-white mb-1 py-2">About Us</Link>
          <Link className="text-white mb-1 py-2">Faq</Link>
          <Link className="text-white mb-1 py-2">Contact</Link>
        </div>
      </div>
      <div className="col-12 col-md-2">
        <h4 className="text-white mb-4">Quick links</h4>
        <div className="footer-links d-flex flex-column">
          <Link className="text-white mb-1 py-2">Laptops</Link>
          <Link className="text-white mb-1 py-2">Headphones</Link>
          <Link className="text-white mb-1 py-2">Tablets</Link>
          <Link className="text-white mb-1 py-2">Watch</Link>
        </div>
      </div>
    </div>
  </div>
</footer>

<footer className="py-4">
  <div className="container-xxl">
    <div className="row">
      <div className="col-12">
        <p className="text-center mb-0 text-white">
          &copy;{new Date().getFullYear()}; Powered by Developer Shubham Kumar.
        </p>
      </div>
    </div>
  </div>
</footer>


    </>
  )
}

export default Footer