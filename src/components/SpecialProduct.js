import React from 'react'
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const SpecialProduct = (props) => {
    const {title ,brand,totalrating,price,quantity,sold,images ,id}=props;
    return (
  
        <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-3 w-100">
  <div className="special-product-card">
    <div className="d-flex justify-content-between">
      <div>
        <img src={images} className="img-fluid" alt="watch" />
      </div>
      <div className="special-product-content">
        <h5 className="brand">{brand}</h5>
        <h6 className="title">{title}</h6>
        <ReactStars count={5} size={24} value={totalrating} edit={false} activeColor="#ffd700" />
        <p className="price">
          <span className="red-p">${price}</span>&nbsp;
        </p>
   
        <div className="prod-count my-3">
          <p>Products: {quantity}</p>
          <div class="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: (quantity / (quantity + sold)) * 100 + "%" }}
              aria-valuenow={(quantity / (quantity + sold)) * 100}
              aria-valuemin={quantity}
              aria-valuemax={sold + quantity}
            ></div>
          </div>
        </div>

        <Link className="button" id={`Hii-${id}`} to={"/product/" + id}>
          View
        </Link>
      </div>
    </div>
  </div>
</div>

    )
}

export default SpecialProduct