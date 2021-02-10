import React, {useContext,useState} from 'react'
import {MyContext} from '../contexts/MyContext'

function Register(){
    const {toggleNav,registerUser} = useContext(MyContext);
    const initialState = {
        userInfo:{
            first_name:'',
            last_name:'',
            email:'',
            password:'',
        },
        errorMsg:'',
        successMsg:'',
    }
    const [state,setState] = useState(initialState);

    // On Submit the Registration Form
    const submitForm = async (event) => {
        event.preventDefault();
        const data = await registerUser(state.userInfo);
        if(data.success){
            setState({
                ...initialState,
                successMsg:data.message,
            });
        }
        else{
            setState({
                ...state,
                successMsg:'',
                errorMsg:data.message
            });
        }
    }

    // On change the Input Value (name, email, password)
    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        });
    }
    
    // Show Message on Success or Error
    let successMsg = '';
    let errorMsg = '';
    if(state.errorMsg){
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
    }
    if(state.successMsg){
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }

    return(
        <div className="_loginRegister">
            <h1>Sign Up</h1>
            <form onSubmit={submitForm} noValidate>
                <div className="form-control">
                    <label>First Name</label>
                    <input name="first_name" required type="text" value={state.userInfo.first_name} onChange={onChangeValue} placeholder="Enter your first name"/>
                </div>
                <div className="form-control">
                    <label>last Name</label>
                    <input name="last_name" required type="text" value={state.userInfo.last_name} onChange={onChangeValue} placeholder="Enter your last name"/>
                </div>
                <div className="form-control">
                    <label>Email</label>
                    <input name="email" required type="email" value={state.userInfo.email} onChange={onChangeValue} placeholder="Enter your email"/>
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input name="password" required type="password" value={state.userInfo.password} onChange={onChangeValue} placeholder="Enter your password"/>
                </div>
                {errorMsg}
                {successMsg}
                <div className="form-control">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <div className="_navBtn">
                <button  onClick={toggleNav}>Login</button>
            </div>
        </div>
    );
}

export default Register