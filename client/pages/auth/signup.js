import 'bootstrap/dist/css/bootstrap.css'
import {useState} from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';
export default()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const {errors, doRequest} = useRequest({
        url: "/api/users/signup",
        body: {
            email,
            password
        },
        method: "post", 
        onSuccess: ()=>{
            setPassword('');
            setEmail('');
            Router.push('/');
        }
    });


    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(email, password);
        await doRequest();
        
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <h1>SignUp</h1>
                <div className="form-group">
                    <label>Email adress</label>
                    <input className="form-control" value={email} onChange={handleEmail}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={handlePassword}/>
                </div>

                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
            {errors}
        </>
    )
}