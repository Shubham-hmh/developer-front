import React, { useState, useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ReactStars from 'react-rating-stars-component';
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';
const OurStore = () => {
    const [grid, setGrid] = useState(4);
    const productState = useSelector((state) => state.product.product);
    const dispatch = useDispatch();
    useEffect(() => {
        getProducts();
    },[])

    const getProducts = () => {
        dispatch(getAllProducts());
    }
    return (
        <>
            <Meta title={"Our Store"} />
            <BreadCrumb title="Our Store" />
            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        <div className='filter-card mb-3'><h3 className="filter-title">
                            Shop By Categories
                        </h3>
                            <div>
                                <ul className='ps-0'>
                                    <li>Watch</li>
                                    <li>TV</li>
                                    <li>Camera</li>
                                    <li>Phone</li>
                                </ul>
                            </div>
                        </div>
                        <div className='filter-card mb-3'><h3 className="filter-title">
                            Filter By
                        </h3>
                            <div>
                                <h5 className="sub-title">
                                    Availablity
                                </h5>
                                <div>
                                    <div className="form-check">

                                        <input className="form-check-input" type="checkbox" value="" />
                                        <label htmlFor="" className="form-check-label">In Stock (1)</label>
                                    </div>
                                    <div className="form-check">

                                        <input className="form-check-input" type="checkbox" value="" />
                                        <label htmlFor="" className="form-check-label">Out of  Stock (0)</label>
                                    </div>
                                </div>
                                <h5 className="sub-title">
                                    Price
                                </h5>
                                <div className='d-flex align-items-center gap-10'>
                                    <div className="form-floating ">
                                        <input type="email" className="form-control" id="floatingInput" placeholder="From" />
                                        <label htmlFor="floatingInput">From</label>
                                    </div>
                                    <div className="form-floating ">
                                        <input type="email" className="form-control" id="floatingInput1" placeholder="To" />
                                        <label htmlFor="floatingInput1">To</label>
                                    </div>
                                </div>
                                <h5 className="sub-title">
                                    Colors
                                </h5>
                                <div >
                                    <Color />
                                </div>
                                <h5 className="sub-title">
                                    Size
                                </h5>
                                <div>

                                    <div className="form-check">

                                        <input className="form-check-input" type="checkbox" value="" id='color-1' />
                                        <label htmlFor="color-1" className="form-check-label">S(2)</label>
                                    </div>
                                    <div className="form-check">

                                        <input className="form-check-input" type="checkbox" value="" id='color-2' />
                                        <label htmlFor="color-2" className="form-check-label">M(2)</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='filter-card mb-3'><h3 className="filter-title">
                            Product Tags
                        </h3>
                            <div>
                                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                    <span className="badge bg-light text-secondary py-2 px-3 rounded-3">
                                        Headphone
                                    </span>
                                    <span className="badge bg-light text-secondary py-2 px-3 rounded-3">
                                        Laptop
                                    </span>
                                    <span className="badge bg-light text-secondary py-2 px-3 rounded-3">
                                        Mobile
                                    </span>
                                    <span className="badge bg-light text-secondary py-2 px-3 rounded-3">
                                        Wire
                                    </span>
                                    <span className="badge bg-light text-secondary py-2 px-3 rounded-3">
                                        TV
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='filter-card mb-3'><h3 className="filter-title">
                            Random Tags
                        </h3>
                            <div>
                                <div className="random-products mb-3 d-flex">
                                    <div className="w-50">
                                        <img src="images/watch.jpg" alt="watch" className='img-fluid' />
                                    </div>
                                    <div className="w-50">
                                        <h5>Kids Headphones bulk 10 pack multi colored </h5>
                                        <ReactStars
                                            count={5} size={24} value={3} edit={false} activeColor="#ffd700"
                                        />
                                        <b>$300</b>

                                    </div>
                                </div>
                                <div className="random-products d-flex">
                                    <div className="w-50">
                                        <img src="images/watch.jpg" alt="watch" className='img-fluid' />
                                    </div>
                                    <div className="w-50">
                                        <h5>Kids Headphones bulk 10 pack multi colored </h5>
                                        <ReactStars
                                            count={5} size={24} value={4} edit={false} activeColor="#ffd700"
                                        />
                                        <b>$300</b>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="filter-sort-grid mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-10">
                                    <p className="mb-0 d-block" style={{ width: "100px" }}>Sort By:</p>
                                    <select name="form-control form-select" id="">
                                        <option value="manual">Featured</option>
                                        <option value="best-selling" >Best selling</option>
                                        <option value="title-ascending">Alphabetically,A-Z</option>
                                        <option value="title-descending">Alphabetically,A-Z</option>

                                        <option value="price-ascending"> Price , low to high</option>
                                        <option value="price-descending">Price , high to low</option>
                                        <option value="created-ascending">Date,old to new </option>
                                        <option value="created-descending">Date, new to old</option>
                                    </select>
                                </div>
                                <div className="d-flex align-items-center gap-10">
                                    <p className="totalproducts mb-0">21 Products</p>
                                    <div className="d-flex gap-10 align-items-center grid">
                                        <img src="images/gr4.svg" alt="grid" onClick={() => { setGrid(3) }} className="d-block img-fluid" />
                                        <img src="images/gr3.svg" alt="grid" onClick={() => { setGrid(4) }} className="d-block img-fluid" />
                                        <img src="images/gr2.svg" alt="grid" onClick={() => { setGrid(6) }} className="d-block img-fluid" />
                                        <img src="images/gr.svg" alt="grid" onClick={() => { setGrid(12) }} className="d-block img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="products-list pb-5">
                            <div className="d-flex flex-wrap gap-10">
                                <ProductCard data={productState ? productState : []} grid={grid} />
                            </div>
                        </div>

                    </div>
                </div>

            </Container>
        </>
    )
}

export default OurStore