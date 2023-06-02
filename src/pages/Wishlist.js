import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import Meta from '../components/Meta';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/products/productSlice';

const Wishlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getWishlistFromDb();
    }, [])

    const getWishlistFromDb = () => {
        dispatch(getUserProductWishlist());
    }

    const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
    console.log(wishlistState, "❤️❤️");
    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id));
        setTimeout(()=>{
            dispatch(getUserProductWishlist());

        },300);
    };
    const myarr=[];
    return (
        <>
            <Meta title={"Wishlist"} />
            <BreadCrumb title="Wishlist" />
       
            <Container className="wishlist-wrapper home-wrapper-2 py-5">
  <div className="row">
    {wishlistState?.length === 0 && <div className="text-center fs-3">No Data</div>}
    {wishlistState?.map((item, index) => (
      <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
        <div className="wishlist-card position-relative">
          <img
            onClick={() => {
              removeFromWishlist(item?._id);
            }}
            src="images/cross.svg"
            alt="cross"
            className="position-absolute cross img-fluid"
          />

          <div className="wishlist-card-image bg-white">
            <img
              src={item?.images[0].url ? item?.images[0].url : "images/watch.jpg"}
              className="img-fluid d-block mx-auto"
              alt="watch"
              width={160}
            />
          </div>
          <div className="py-3 px-3">
            <h5 className="title">{item?.title}</h5>
            <h6 className="price">$ {item?.price}</h6>
          </div>
        </div>
      </div>
    ))}
  </div>
</Container>

        </>
    )
}

export default Wishlist