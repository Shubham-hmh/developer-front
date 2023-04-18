import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard';
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbGitCompare } from 'react-icons/tb'
import { AiOutlineHeart } from 'react-icons/ai';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { addRating, getAProduct, getAllProducts } from '../features/products/productSlice';
import { addProdToCart, getUserCart } from '../features/user/userSlice';
import { toast } from "react-toastify";
const SingleProduct = () => {
    const [color, setColor] = useState(null);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [popularProduct, setPopularProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const getProductId = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const productState = useSelector(state => state?.product?.singleproduct);
    const productsState = useSelector(state => state?.product?.product)
    const cartState = useSelector(state => state.auth.cartProducts);
    useEffect(() => {
        dispatch(getAProduct(getProductId));
        dispatch(getUserCart());
        dispatch(getAllProducts());
    }, [])


    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) {

            if (getProductId === cartState[index]?.productId?._id) {
                setAlreadyAdded(true);

            }
        }
    }, [])

    const uploadCart = async () => {
        if (color === null) {
            toast.error("Please Choose Color");
            return false;
        }
        else {
            await dispatch(addProdToCart({ productId: productState?._id, quantity, color, price: productState?.price }))
            navigate('/cart');

        }
    }
    const props = { width: 400, height: 600, zoomWidth: 600, img: productState?.images[0]?.url ? productState?.images[0]?.url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN81v_dSEsK8Cp7wzpvt5DRU5R4iaR0aKzBFSR45LG&s" };
    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    useEffect(() => {
        let data = [];
        for (let index = 0; index < productsState.length; index++) {
            const element = productsState[index];
            if (element.tags === "popular") {
                data.push(element)
            }
            setPopularProduct(data);

        }
    }, [productState])
    const [orderedProduct, setOrderedProduct] = useState(true);

    const [star, setStar] = useState(null);
    const [comment, setComment] = useState(null);

    const addRatingToProduct = () => {
        if (star === null) {
            toast.error("Please Add Star Rating")
            return false;
        }
        else if (comment === null) {
            toast.error("Please Write review about Product ")
            return false;

        }
        else {
            dispatch(addRating({ star: star, comment: comment, prodId: getProductId }));
            setTimeout(()=>{
             dispatch(getAProduct());
            },100)
        }

        return false;
    }





    return (
        <>
            <Meta title={"Product Name"} />
            <BreadCrumb title={productState?.title} />

            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>

                        <div className="other-product-images d-flex flex-wrap gap-15">
                            {
                                productState?.images.map((item, index) => {
                                    return (
                                        <div><img src={item?.url} alt="" className='img-fluid' /></div>

                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className='border-bottom'>
                                <h3 className='title'>{productState?.title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">$ {productState?.price}</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars
                                        count={5} size={24} value={productState?.totalrating} edit={false} activeColor="#ffd700"
                                    />
                                    <p className="mb-0 t-review">(2 Reviews)</p>
                                </div>
                                <a className='review-btn' href="#review">Write a Review</a>
                            </div>
                            <div className="py-3">
                                <div className="d-flex gap-10 align-items-center my-2"><h3 className='product-heading'>Type:</h3><p className='product-data'>Watch</p></div>
                                <div className="d-flex gap-10 align-items-center my-2"><h3 className='product-heading'>Brand:</h3><p className='product-data'>{productState?.brand}</p></div>
                                <div className="d-flex gap-10 align-items-center my-2"><h3 className='product-heading'>Category:</h3><p className='product-data'>{productState?.category}</p></div>
                                <div className="d-flex gap-10 align-items-center my-2"><h3 className='product-heading'>Tags:</h3><p className='product-data'>{productState?.tags}</p></div>
                                <div className="d-flex gap-10 align-items-center my-2"><h3 className='product-heading'>Availablity:</h3><p className='product-data'>In Stock</p></div>
                                <div className="d-flex gap-10 flex-column mt-2 mb-3"><h3 className='product-heading'>Size:</h3>
                                    <div className="d-flex flex-wrap gap-15">
                                        <span className="badge border border-1 bg-white text-dark border-secondary">S</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">M</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">XL</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">XXL</span>

                                    </div>
                                </div>
                                {
                                    alreadyAdded === false && <>
                                        <div className="d-flex gap-10 flex-column mt-2 mb-3">

                                            <h3 className='product-heading'>Color:</h3>
                                            <Color setColor={setColor} colorData={productState?.color} />
                                        </div>

                                    </>
                                }
                                <div className="d-flex gap-15 align-items-center flex-row mt-2 mb-3">

                                    {
                                        alreadyAdded === false && <>
                                            <h3 className='product-heading'>Quantity:</h3>
                                            <div className="">
                                                <input className='form-control' type="number" id='' name='' onChange={(e) => { setQuantity(e.target.value) }} value={quantity} min={1} max={10} style={{ width: "70px" }} />
                                            </div>
                                        </>
                                    }

                                    <div className={alreadyAdded ? "ms-0" : "ms-5" + 'd-flex align-items-center gap-30 ms-5'}>
                                        <button onClick={() => { alreadyAdded ? navigate('/cart') : uploadCart() }} className="button border-0" type='submit'>
                                            {alreadyAdded ? "Go To Cart " : " Add To Cart"}
                                        </button>

                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <div><a href=""><TbGitCompare className='fs-5 me-2' /> Add to Compare</a></div>
                                    <div><a href=""><AiOutlineHeart className='fs-5 me-2' />Add to Wishlist</a></div>
                                </div>
                                <div className="d-flex gap-10 flex-column   my-2"><h3 className='product-heading'>Shipping & Returns :</h3>
                                    <p className='product-data'>Free shipping and returns available on all orders! <br />
                                        we ship all us domestic orders with in <b>5-10 Business day</b> </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2"><h3 className='product-heading'>Product link :</h3>
                                    <a href="javascript:void(0);" onClick={() => {
                                        copyToClipboard(
                                            window.location.href
                                        )
                                    }}>
                                        Copy Product Link
                                    </a>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>

                        <div className="bg-white p-3">
                            <p dangerouslySetInnerHTML={{ __html: productState?.description }}>
                            </p>
                        </div>
                    </div>
                </div>

            </Container>
            <Container class1="reviews-wrapper  home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4 id='review'>Reviews</h4>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className='mb-2'>Customer Review</h4>
                                    <div className='d-flex gap-10 align-items-center'>
                                        <ReactStars
                                            count={5} size={24} value="3" edit={false} activeColor="#ffd700"
                                        />
                                        <p className='mb-0'>Based on 2 Reviews</p>
                                    </div>

                                </div>
                                {
                                    orderedProduct && (
                                        <div>
                                            <a className='text-dark text-decoration-underline' href="">Write a Review</a>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="review-form py-4">
                                <h4>Write a Review</h4>
                                <div>
                                    <ReactStars
                                        count={5} size={24} value="3" edit={true} activeColor="#ffd700"
                                        onChange={(e) => { setStar(e) }}
                                    />
                                </div>
                                <div>
                                    <textarea name="" className='w-100 form-control' onChange={(e) => { setComment(e.target.value) }}
                                        id="" cols="30" rows="4" placeholder='Comments'></textarea>
                                </div>
                                <div className='d-flex justify-content-end mt-3'>
                                    <button className="button border-0" onClick={addRatingToProduct} type='button'>Submit Review</button>
                                </div>
                            </div>

                            <div className="reviews mt-4">
                                {
                                    productState && productState.ratings?.map((item, index) => {
                                        return (
                                            <div key={index} className="review">
                                                <div className="d-flex gap-10 align-items-center">
                                                    <ReactStars
                                                        count={5} size={24} value={item?.star} edit={false} activeColor="#ffd700"
                                                    />
                                                </div>
                                                <p className='mt-3'>
                                                {item?.comment}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="popular-wrapper  py-5 home-wrapper-2">
                <div className="row ">
                    <div className="col-12">
                        <h3 className="section-heading">
                            Our Popular Products
                        </h3>
                    </div>

                </div>
                <div className="row ">
                    <ProductCard data={popularProduct} />

                </div>

            </Container>
        </>
    )
}

export default SingleProduct