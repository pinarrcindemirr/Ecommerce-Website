import React, {useState } from 'react'
import './login.css'
import {Link,useNavigate} from "react-router-dom";
import { useMutation } from 'react-query';

const Login = () => {

    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const loginMutation = useMutation(loginInfo => {
        return fetch("http://10.28.60.28:9091/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo),
        }).then(response => response.json());
    }, {
        // Başarılı giriş durumu
        onSuccess: (data) => {
            // Burada API'nin döndürdüğü veriye göre başarılı giriş işlemini kontrol etmelisiniz.
            // Örneğin, token varsa veya API belirli bir durum kodu gönderiyorsa
            if (data) { // API'nin başarılı giriş durumunu kontrol etmek için "success" özelliğini kontrol edin
                console.log('User logged in:', data);
                navigate('/HomePage');
            } else {
                setLoginError("Username or password is incorrect.");
            }
        },
        // Hata durumu
        onError: (error) => {
            console.error("Error:", error);
            setLoginError('An error occurred while trying to log in.');
        }
    });
    
    const check = (event) => {
            event.preventDefault();
        
            if (!validateForm({ username, password })) {
                alert('Please make sure all fields are filled out correctly.');
                return;
            }
            loginMutation.mutate({username,password})
    };
    
    function validateForm({ username, password }) {
        return password.length > 0 || username.length > 0;
    }
    
    return (
        
        <div className='body'>
          <div className='login-form'>
                <h1>LOGIN</h1>
                <div>
                    <p>Username</p>
                    <input 
                        type='text' 
                        placeholder='Username' 
                        id='username' 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div>
                    <p>Password</p>
                    <input 
                        type='password' 
                        placeholder='Password' 
                        id='password' 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>   
                </div>
                <div>
                    <input type="checkbox" id="rememberMe"/>
                    <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div>
                     <button type='submit' onClick={check}>LOGIN</button>
                     {loginError && <div className="error-message">{loginError}</div>}
                </div>  
                <div>
                    <Link to='/Register'>
                        Need an account?
                    </Link>
                </div>
           </div>

        </div>
      
    )
  
}
export default Login
