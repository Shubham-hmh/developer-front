import React from 'react';
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {registerUser} from '../features/user/userSlice';

const signUpSchema = yup.object({
    firstname: yup.string().required("First Name is Required"),
    lastname: yup.string().required("Last Name is Required"),
    email: yup.string().email("Email Should be Valid").required("Email Address is Required "),
    mobile: yup.string().required("Mobile No. is Required"),
    password: yup.string().required("password is Required"),
});

const Signup = () => {
    const dispatch =useDispatch();
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            mobile: "",
            password: "",
        },
        validationSchema: signUpSchema,
        onSubmit: values => {
            dispatch(registerUser(values));
        },
    });


    return (
        <>
            <Meta title={"Sign Up"} />
            <BreadCrumb title="Sign Up" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Sign Up</h3>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <CustomInput type="name" name="firstname" value={formik.values.firstname} onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur("firstname")} placeholder='First Name' />
                                <div className="error">
                                    {formik.touched.firstname && formik.errors.firstname}
                                </div>
                                <CustomInput type="name" name="lastname" value={formik.values.lastname} onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")} placeholder='Last Name' />
                                <div className="error">
                                    {formik.touched.lastname && formik.errors.lastname}
                                </div>
                                <CustomInput type="email" name="email" value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} placeholder='Email' />
                                <div className="error">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <CustomInput type="tel" name="mobile" value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")} placeholder='Mobile Number' />
                                <div className="error">
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>
                                <CustomInput type="password" name='password' value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")} placeholder='Password' />
                                <div className="error">
                                    {formik.touched.password && formik.errors.password}
                                </div>
                                <div>
                                    <div className="d-flex mt-3 justify-content-center align-items-center gap-15">
                                        <button className="button border-0">Sign Up</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Signup