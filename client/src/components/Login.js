import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';
// import { NavLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Login = () => {

    const { setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        email: "",
        password: "",
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: e.target.value
            }
        })
    }


    const loginpdata = async (e) => {
        e.preventDefault();
        console.log(inpval);

        const { email, password } = inpval;



        if (email === "") {
            alert("email is required")
        } else if (!email.includes("@")) {
            alert("enter valid email")
        } else if (password === "") {
            alert("password is required")
        } else {

            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const data = await res.json();
            console.log(data);
            history.push("/Home")
           
            // if (res.status === 422 || !data) {
            //     console.log("error ");
            //     // alert("error");

            // } else {
            //     history.push("/Home")
            //     setUdata(data)
            //     console.log("data added");

            // }
        }

    }

    return (
        <div className="container mt-5">

            {/* <NavLink to="/Home">home</NavLink> */}
            <Card sx={{ maxWidth: 800 }}>
                <CardContent>
                    <form className="mt-4">
                        <h1 style={{ fontWeight: 400, border: 5 }}>Login</h1>
                        <div className="row">

                            <div className="mb-3 col-lg-6 col-md-6 col-12">
                                <label htmlFor="exampleInputEmail" className="form-label">email</label>
                                <input type="email" string={inpval.email} onChange={setdata} name="email" className="form-control" />
                            </div>
                            <div className="mb-3 col-lg-6 col-md-6 col-12">
                                <label htmlFor="exampleInputpassword" className="form-label">Password</label>
                                <input type="password" name="password" string={inpval.password} onChange={setdata} className="form-control" id="exampleInputPassword1" cols="30" rows="5" />
                            </div>
                            <button type="submit" onClick={loginpdata} className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
export default Login;

