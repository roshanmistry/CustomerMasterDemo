import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Register = () => {

    const { setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        customer_name: "",
        email: "",
        mobile_number: "",
        country: "",
        state: "",
        city: "",
        password:""
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
    const setdatacity = (e) => {
        console.log(e);
        const { value } = e;
        setINP((preval) => {
            return {
                ...preval,
                ["city"]: value
            }
        })
    }
    const setdatastate = (e) => {
        console.log(e);
        const { value } = e;
        setINP((preval) => {
            return {
                ...preval,
                ["state"]: value
            }
        })
    }
    const setdatacountry = (e) => {
        console.log(e);
        const { value } = e;
        setINP((preval) => {
            return {
                ...preval,
                ["country"]: value
            }
        })
    }


    const addinpdata = async (e) => {
        e.preventDefault();
        console.log(inpval);

        const { customer_name, email, mobile_number,  country, state,city, password} = inpval;


        if (customer_name === "") {
            alert("customer_name is required")
        } else if (email === "") {
            alert("email is required")
        } else if (!email.includes("@")) {
            alert("enter valid email")
        } else if (mobile_number === "") {
            alert("mobile_number is required")
        } else if (country === "") {
            alert("country is required")
        } else if (state === "") {
            alert("state is required")
        } else if (city === "") {
            alert("city is required")
        } else if (password === "") {
            alert("password is required")
        } else {
      
            const res = await fetch("/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customer_name, email, mobile_number,  country, state,city,password
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error ");
                alert("error");

            } else {
                history.push("/Home")
                setUdata(data)
                console.log("data added");

            }
        }

    }
    
    const city = [
        "Vadodara", "Ahemdabad", "Rajkot"
      ];
      const state = [
        "Gujarat", "Rajasthan", "Maharastr"
      ];
      const country = [
        "India", "US", "UK"
      ];

    return (
        <div className="container">
            {/* <NavLink to="/">home</NavLink> */}
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputname" className="form-label">Customer Name</label>
                        <input type="text" string={inpval.customer_name} onChange={setdata} name="customer_name" className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEmail" className="form-label">email</label>
                        <input type="email" string={inpval.email} onChange={setdata} name="email" className="form-control"  />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputMobile_number" className="form-label">Mobile Number</label>
                        <input type="number" string={inpval.mobile_number} onChange={setdata} name="mobile_number" className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputcountry" className="form-label">Country</label>
                        {/* <input type="text" string={inpval.country} onChange={setdata} name="country" className="form-control" /> */}
                        <Dropdown options={country} onChange={setdatacountry} value={inpval.country} name="country" placeholder="Select an option" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputState" className="form-label">State</label>
                        {/* <input type="text" name="state" string={inpval.state} onChange={setdata} className="form-control" id="" cols="30" rows="5" /> */}
                        <Dropdown options={state} onChange={setdatastate} value={inpval.state} name="state" placeholder="Select an option" />
                    </div>

                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputCity" className="form-label">City</label>
                        {/* <input type="text" name="city" string={inpval.city} onChange={setdata} className="form-control" id="" cols="30" rows="5" /> */}
                        <Dropdown options={city} onChange={setdatacity} value={inpval.city} name="city" placeholder="Select an option" />
                    </div>

                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="examplePassword" className="form-label">Password</label>
                        <input type="password" name="password" string={inpval.password} onChange={setdata} className="form-control" id="" cols="30" rows="5" />
                    </div>

                    
                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Register;

