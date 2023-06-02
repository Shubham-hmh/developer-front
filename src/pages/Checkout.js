import React from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import watch from '../images/watch.jpg';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { config } from "../utils/axiosConfig";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createAnOrder, getUserCart } from '../features/user/userSlice';



const shippingSchema = yup.object({

  firstName: yup.string().required("First Name is  Required"),
  lastName: yup.string().required("Last Name is  Required"),
  address: yup.string().required("Address Details are Required"),
  state: yup.string().required("State is  Required"),
  city: yup.string().required("City is  Required"),
  country: yup.string().required("Country is  Required"),
  pincode: yup.number().required("Pin code is required"),

});
const Checkout = () => {
  const getTokenFromLocalStorage = localStorage.getItem('customer')
  ? JSON.parse(localStorage.getItem("customer")) : null;


const config2 = {
  headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : " "
          }`,
      Accept: "application/json",
  },
};

  const dispatch = useDispatch();
  const cartState = useSelector(state => state.auth.cartProducts);
  const navigate=useNavigate();
  const authState =useSelector(state=>state.auth);
  const [totalAmount, setTotalAmound] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);


  console.log( shippingInfo);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + (Number(cartState[index].quantity) * cartState[index].price);
      setTotalAmound(sum);
    }
  }, [cartState]);


  useEffect(()=>{
      dispatch(getUserCart(config2));
  },[])

  useEffect(()=>{
    if(authState?.orderedProduct?.order!==null && authState?.orderedProduct?.success===true){
      navigate("/my-orders");

    }

  },[authState])

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: ""
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
   setShippingInfo(values);
   localStorage.setItem("address",JSON.stringify(values));
      setTimeout(() => {
        checkOutHandler();

      }, 300)

    },
  });


  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    })
  }

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({ product: cartState[index].productId._id, quantity: cartState[index].quantity, color: cartState[index].color._id, price: cartState[index].price })
    }
    setCartProductState(items);
  }, [])


  const checkOutHandler = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js",);
    if (!res) {
      alert("Razorpay failed to load ");
      return
    }
    const result = await axios.post("https://developer-back.onrender.com/api/user/order/checkout", { amount: totalAmount + 5 }, config);
    // const result = await axios.post("http://localhost:5000/api/user/order/checkout", { amount: totalAmount + 5 }, config);

    if (!result) {
      alert("Something went Wrong !")
      return;
    }
    const { amount, id: order_id, currency } = result.data.order;
    const options = {
      key: "rzp_test_xf6mecNHaDBJZm", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Developer'Cprner.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post("https://developer-back.onrender.com/api/user/order/paymentVerification", data, config);
        // const result = await axios.post("http://localhost:5000/api/user/order/paymentVerification", data, config);

 
  dispatch(createAnOrder({ totalPrice: totalAmount, totalPriceAfterDiscount: totalAmount, orderItems: cartProductState, paymentInfo:result.data, shippingInfo:JSON.parse(localStorage.getItem("address")) }))
  localStorage.removeItem("address");


        


      },
      prefill: {
        name: "Dev Corner",
        email: "dev@example.com",
        contact: "999999yyy",
      },
      notes: {
        address: "ghytggg",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <>
      <Container class1="checkout-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
              <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item total-price"><Link className='text-dark' to="/cart">Cart</Link></li> &nbsp; /
                  <li className="breadcrumb-item active total-price" aria-current="page">Information</li> &nbsp; /
                  <li className="breadcrumb-item total-price">Shipping</li> &nbsp; /
                  <li className="breadcrumb-item active" aria-current="page">Payment</li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">Navdeep@gmail.com</p>
              <h4 className='mb-3'>Shipping Address</h4>
              <form action="" onSubmit={formik.handleSubmit} className='d-flex gap-15 flex-wrap justify-content-between'>
                <div className='w-100'>
                  <select name="country" value={formik.values.country} onChange={formik.handleChange("country")} onBlur={formik.handleBlur("country")} id="" className="form-control form-select">
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="India">
                      India
                    </option>
                  </select>
                  <div className="errors ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input type="text" placeholder='First Name'
                    name='firstName'
                    value={formik.values.firstName} onChange={formik.handleChange("firstName")} onBlur={formik.handleBlur("firstName")}

                    className="form-control" />
                  <div className="errors ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>

                </div>
                <div className='flex-grow-1'>
                  <input type="text" placeholder='Last Name'
                    name='lastName'
                    value={formik.values.lastName} onChange={formik.handleChange("lastName")} onBlur={formik.handleBlur("lastName")}
                    className="form-control" />
                  <div className="errors ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className='w-100'>
                  <input type="text" placeholder='Address'
                    name='address'
                    value={formik.values.address} onChange={formik.handleChange("address")} onBlur={formik.handleBlur("address")}
                    className="form-control" />
                  <div className="errors ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>

                </div>
                <div className='w-100'>
                  <input type="text" placeholder='Apartment,suit etc'
                    name='other'
                    value={formik.values.other} onChange={formik.handleChange("other")} onBlur={formik.handleBlur("other")}
                    className="form-control" />
                </div>
                <div className='flex-grow-1'>
                  <input type="text" placeholder='City'
                    name='city'
                    value={formik.values.city} onChange={formik.handleChange("city")} onBlur={formik.handleBlur("city")}
                    className="form-control" />
                  <div className="errors ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <select name="state" value={formik.values.state} onChange={formik.handleChange("state")} onBlur={formik.handleBlur("state")} id="" className="form-control form-select">
                    <option value="" selected disabled>Select State</option>
                    <option value="Punjab">
                      Punjab
                    </option>
                    <option value="Delhi">
                      Delhi
                    </option>
                  </select>
                  <div className="errors ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className='flex-grow-1'>
                  <input type="Number" placeholder='Zip Code'
                    name='pincode'
                    value={formik.values.pincode} onChange={formik.handleChange("pincode")} onBlur={formik.handleBlur("pincode")}
                    className="form-control" />
                  <div className="errors ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>

                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark"> <BiArrowBack className='me-2' /> Return to Cart</Link>
                    <Link to="/cart" className="button" >Continue to Shipping</Link>
                    <button className="button" type='submit'  >Place Order</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-5">
            <div className='border-bottom py-4'>
              {
                cartState && cartState?.map((item, index) => {
                  return (
                    <div key={index} className="d-flex gap-10 mb-2 align-items-center">
                      <div className='w-75 d-flex gap-10'>
                        <div className='w-25 position-relative'>
                          <span style={{ top: "-10px", right: "2px" }} className="badge bg-secondary text-white rounded-circle p-2 position-absolute">
                            {item?.quantity}
                          </span>
                          <img src={item?.productId?.images[0]?.url} width={100} height={100} alt="watch" />
                        </div>
                        <div>
                          <h5 className="total-price">{item?.productId?.title}</h5>
                          <p className='total-price'>{item?.color?.title}</p>
                        </div>
                      </div>
                      <div className='flex-grow-1'>
                        <h5 className='total'>$ {item?.price * item?.quantity}</h5>
                      </div>
                    </div>
                  )
                })
              }

            </div>
            <div className='border-bottom py-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='total'>Subtotal</p>
                <p className='total-price'>${totalAmount ? totalAmount : "0"}</p>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='mb-0 total'>Shipping</p>
                <p className='mb-0 total-price'>$5</p>
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
              <h4 className='total'>Total</h4>
              <h5 className='total-price'>${totalAmount ? totalAmount + 5 : "0"}</h5>
            </div>

          </div>
        </div>

      </Container>

    </>
  )
}

export default Checkout