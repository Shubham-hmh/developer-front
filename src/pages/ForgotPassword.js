import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordToken } from '../features/user/userSlice';


const emailSchema = yup.object({
  email: yup.string().email("Email Should be Valid").required("Email Address is Required"),
});
const ForgotPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
    onSubmit: values => {
      dispatch(forgotPasswordToken(values));


    },
  });
  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className='text-center mb-3'>Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                <CustomInput type="email" name="email" onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} value={formik.values.email}  placeholder='Email' />
                <div className="error text-center">
                  {formik.touched.email && formik.errors.email}
                </div>

                <div>
                  <div className="d-flex mt-3 justify-content-center align-items-center flex-column gap-15">
                    <button className="button border-0" type="submit">Submit</button>
                    <Link to="/login">Cancel</Link>

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

export default ForgotPassword