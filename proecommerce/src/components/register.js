import React, { useState} from 'react'
import './register.css'
import { useMutation } from 'react-query';
import {useNavigate} from "react-router-dom";

const Register = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [userExists, setUserExists] = useState(false);
    const navigate = useNavigate();

    const mutation = useMutation(newUserInfo => {
        return fetch("http://10.28.60.33:9091/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserInfo),
        }).then(response => response.json());
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        else if (name === 'username') setUsername(value);
        else if (name === 'password') setPassword(value);
        else if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); // Kullanıcının seçtiği dosyayı state'e kaydedin
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userInfoToSave = { email, username, password, confirmPassword };

        if (!validateForm(userInfoToSave)) {
            alert('Please make sure all fields are filled out correctly and passwords match.');
            return;
        }

        // Base64'e dönüştürme
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
            mutation.mutate(
                { email, username, password, image: reader.result }, // Base64 formatındaki resmi ekleyin
                {
                    onSuccess: (data) => {
                        if (data) {
                            console.log('User registered:', data);
                            setUserExists(false);
                            navigate('/HomePage');
                        } else {
                            setUserExists(true);
                        }
                    },
                    onError: (error) => {
                        console.error('Error:', error);
                        setUserExists(true);
                    },
                }
            );
        };
    };

    function validateForm({ username, email, password, confirmPassword }) {
        return (
            password === confirmPassword &&
            password.length > 0 &&
            username.length > 0 &&
            email.length > 0 &&
            confirmPassword.length > 0
        );
    }

  return (

    <div className='body'>
        <div className='register-form'>
            <h1>Create new account</h1>
            <div>
                <p>Email</p>
                <input 
                    type='email' 
                    placeholder='Email' 
                    name='email' 
                    value={email} 
                    onChange={handleChange}
                />
            </div>
            <div>
                <p>Username</p>
                <input 
                    type='text' 
                    placeholder='Username' 
                    name='username' 
                    value={username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <p>Password</p>
                <input 
                    type='password' 
                    placeholder='Password' 
                    name='password' 
                    value={password}
                    onChange={handleChange}
                />   
            </div>
            <div>
                <p>Confirm Password</p>
                <input 
                    type='password' 
                    placeholder='Confirm Password' 
                    name='confirmPassword' 
                    value={confirmPassword}
                    onChange={handleChange}
                />   
            </div>
            <div>
                <p>Add Picture</p>
                <input 
                    type="file" 
                    onChange={handleFileChange} /> 
                </div>
            <div>
                <button onClick={handleSubmit} type="submit">Create your account</button>
                {userExists && <div className="error-message">Already have, Try Again</div>}
            </div>
        </div>
    </div>
  )
}
export default Register
