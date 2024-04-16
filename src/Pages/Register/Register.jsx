import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import auth from '../../firebase/firebase.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {

    const [success, setRegisterSuccess] = useState('');
    const [registerError, setRegisterError] = useState('')
    const [showPassword, setShowPassword] = useState(false);


    const handleRegister = (e) => {
        e.preventDefault();
        // console.log('form submiting');
        const name = e.target.name.value
        const email = e.target.email.value;
        const password = e.target.password.value
        const accepted = e.target.terms.checked
        console.log(name, email, password, accepted);

        setRegisterSuccess('')
        setRegisterError('')

        if(/[A-Z]/.test(email)){
            setRegisterError('Your Email is upperCase please should have lowercase character')
            return;
        }else if(password.length < 6){
            setRegisterError('Password should be at least 6 characters or longer !!')
            return;
        }else if (!/[A-Z]/.test(password)){
            setRegisterError('Your password should have at least one uppercase characters.')
            return;
        }else if(!accepted){
            setRegisterError('please accepted terms and conditions')
            return;
        }

        


        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user
            console.log(user);
            setRegisterSuccess('Successfully Registered')


            updateProfile(user, {
                displayName: name,
                photoURL: 'https://example.com/jane-q-user/profile.jpg'
            })
            .then(() => {
                console.log('profile Updated');
            })
            .catch((error) => console.log(error))



            sendEmailVerification(user)
            .then(() => {
                alert('Email verification sent')
            })


        })
        .catch(error => {
            const userError = error.message
            console.log(userError);
            setRegisterError(userError)
        })
    }

    return (
        <div>
            <div className='container max-auto px-4 mt-10'>
            <div className='mx-auto md:w-2/4 border-2 border-red-600'>
            <h3 className='font-bold text-3xl my-3 text-center'>Please Register Here</h3>
            <form onSubmit={handleRegister} className='flex flex-col justify-center items-center gap-5 md:w-full p-8'>
                <input className='w-full p-3' type="text" name="name" id="name" placeholder='Your Name' required/>
                <input className='w-full p-3' type="email" name="email" id="email" placeholder='Email Here' required/>

                <div className='relative w-full'>
                <input className='w-full p-3' type={showPassword ? 'text' : 'password'} name="password" id="pass" placeholder='password' required/>
                <span onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-3 text-2xl'>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
                <div className='w-full flex gap-2'>
                <input type="checkbox" name="terms" id="check" className='w-4' />
                <label htmlFor="terms">Accept our terms and conditions</label>
                </div>
                <input className='w-full px-3 py-3 bg-red-500 cursor-pointer' type="submit" value="REGISTER HERE" />

                {
                registerError &&
                 <p className='text-base text-red-700 font-medium'>{registerError}</p> 
                
            }
            {
                success && <p className='text-green-500 text-base font-medium'>{success}</p>
            }

            </form>

            <div className="text-center mb-3">
            <p className='text-blue-400 font-medium'>Already have an account <Link to='/login' className="underline">please login</Link></p>
            </div>

            </div>
            </div>
        </div>
    );
};

export default Register;