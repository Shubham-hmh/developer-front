import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';


const loginSchema = yup.object({
  email: yup.string().email("Email Should be Valid").required("Email Address is Required"),
  password: yup.string().required("password is Required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (authState?.user?.token != null) {
      navigate("/")
    }
  }, [authState])


  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />


      <Container className="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="email"
                  name="email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                  placeholder="Email"
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>

                <CustomInput
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  placeholder="Password"
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>

                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>
                  <div className="d-flex mt-3 justify-content-center align-items-center gap-15">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup" id='signup'>
                      Sign Up
                    </Link>
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

export default Login