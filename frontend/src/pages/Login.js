import React, { useContext, useState } from 'react';
import loginIcons from '../signin.gif';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Context from '../context';
import SummaryApi from '../common';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(SummaryApi.signIn.url, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/');
        fetchUserDetails();
        fetchUserAddToCart();
      } else if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Failed to fetch data from the server.');
    }
  };

  return (
    <section id='login'>
      <div className='mx-auto container p-1'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icons' />
          </div>
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email : </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Ingrese email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>
            <div>
              <label>Contraseña : </label>
              <div className='bg-slate-100 p-2  flex'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Ingrese contraseña'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                  <span>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                Olvidó la contraseña ?
              </Link>
            </div>
            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Iniciar</button>
          </form>
          <p className='my-5'>No tienes una cuenta ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Registrate</Link></p>
        </div>
      </div>
    </section>
  );
}

export default Login;
