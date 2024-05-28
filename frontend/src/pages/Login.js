
import React, { useContext,useState } from 'react'
import loginIcons from '../signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link,  useNavigate  } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';





const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)


  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      console.log('URL:', SummaryApi.signIn.url);
      console.log('Request Method:', SummaryApi.signIn.method);
      console.log('Request Headers:', {
        "content-type": "application/json"
      });
      console.log('Request Body:', JSON.stringify(data));

      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });


      console.log('Response Status:', dataResponse.status);

      if (!dataResponse.ok) {

        throw new Error(`HTTP error! status: ${dataResponse.status}`);
      }

      const dataApi = await dataResponse.json();


      console.log('Response Data:', dataApi);

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate('/');
       fetchUserDetails();
       fetchUserAddToCart();
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {

      console.error('Fetch error:', error);
      toast.error('Failed to fetch data from the server.');
    }
  };

 
  console.log("data login", data);

    return (
      <section id='login' >
        <div className='mx-auto container p-1' >
          <div className='bg-white p-5 w-full max-w-sm mx-auto '>
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
                  <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                    <span>
                      {
                        showPassword ? (
                          <FaEyeSlash />
                        )
                          :
                          (
                            <FaEye />
                          )
                      }
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
    )
  }

  export default Login;
