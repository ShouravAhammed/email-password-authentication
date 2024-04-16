import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
    
    const [errorLogin, setErrorLogin] = useState('');
    const [userLogin, setUserLogin] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);

    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);

        setErrorLogin('')
        setUserLogin('')

        if(/[A-Z]/.test(email)){
            setErrorLogin('Please lowerCasYour Email is upperCase please should have lowercase character')
            return;
        }else if(!/[A-Z]/.test(password)){
            setErrorLogin('Your password should have at least one uppercase characters.')
            return;
        }else if(password.length < 6){
            setErrorLogin('Password should be at least 6 characters or longer !!')
            return;
        }

        

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const userResult = result.user
            console.log(userResult);
            
            if(userResult.emailVerified){
                setUserLogin('Successfully Logged In')
                return;
            }else{
                alert('Please check your email and verify your account')
            }
        })
        .catch(error => {
            const errorMessage = error.message
            console.log(errorMessage);
            setErrorLogin(errorMessage);
        })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value
       if(!email){
        console.log('Please Provide an Email', email);
        return;
       }else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        console.log('please write a valid email');
        return;
       }
       sendPasswordResetEmail(auth, email)
       .then( () => {
        alert('please check your email')
       })
       .catch(error => {
        console.log(error.message);
       })
    }

    return (
        <div>
            <div className='container max-auto px-4 mt-10'>
            <div className='mx-auto md:w-2/4 border-2 border-red-600'>
            <h3 className='font-bold text-3xl my-3 text-center'>Please Login Here</h3>
            <form onSubmit={handleLogIn} className='flex flex-col justify-center items-center gap-5 md:w-full p-8'>
                <input ref={emailRef} className='w-full p-3' type="email" name="email" id="email" placeholder='Email Here' required/>

                <div className='relative w-full'>
                <input className='w-full p-3' type={showPassword ? 'text' : 'password'} name="password" id="pass" placeholder='password' required/>
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3 text-2xl">{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                    <button onClick={handleForgetPassword} className="text-base text-blue-400 font-medium mt-2">Forget Password?</button>
                </div>
                <input className='w-full px-3 py-3 bg-red-500 cursor-pointer' type="submit" value="Log In" />
                {
                    errorLogin && <p className="text-base text-red-600 font-medium">{errorLogin}</p>
                }
                {
                    userLogin && <p className="text-base text-green-600 font-medium">{userLogin}</p>
                }
            </form>
            <div className="text-center mb-3">
            <p className='text-blue-400 font-medium'>New to this website? <Link to='/register' className="underline">please register</Link></p>
            </div>
            
            </div>
            </div>
        </div>
    );
};

export default Login;