import React, { useContext, useEffect, useState } from 'react'
import { useParams,useHistory } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

   const {updata, setUPdata} = useContext(updatedata)

    const history = useHistory("");

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
            console.log(e);
            console.log(e.target.value);
            const { name, value } = e.target;
            setINP((preval) => {
                return {
                    ...preval,
                    [name]: value
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


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`/indclient/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data[0])
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const { customer_name, email, mobile_number, country, state,city ,password} = inpval;
        console.log(inpval);

        const res2 = await fetch(`/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                customer_name, email, mobile_number,  country, state,city,password
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/Home")
            setUPdata(data2);
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
            {/* <NavLink to="/">home2</NavLink> */}
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputClientName" className="form-label">Customer Name</label>
                        <input type="text" value={inpval.customer_name} onChange={setdata} name="customer_name" className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEmail" className="htmlForm-label">Email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" className="form-control" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputMobile_Number" className="form-label">Mobile Number</label>
                        <input type="number" value={inpval.mobile_number} onChange={setdata} name="mobile_number" className="form-control"  />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputCountry" className="form-label">Country</label>
                        {/* <input type='text' name="country" value={inpval.country} onChange={setdata} className="form-control" id="" cols="30" rows="5"/> */}
                        <Dropdown options={country} onChange={setdatacountry} value={inpval.country} name="country" placeholder="Select an option" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputState" className="form-label">State</label>
                        {/* <input type='text' value={inpval.state} onChange={setdata} name="state" className="form-control"  /> */}
                        <Dropdown options={state} onChange={setdatastate} value={inpval.state} name="state" placeholder="Select an option" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputCity" className="form-label">City</label>
                        {/* <input  type='dropdown' value={inpval.city} onChange={setdata} name="city" className="form-control"  /> */}
                        <Dropdown options={city} onChange={setdatacity} value={inpval.city} name="city" placeholder="Select an option" />
                    </div>

                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type='password' name="password" value={inpval.password} onChange={setdata} className="form-control" id="" cols="30" rows="5"/>
                    </div>
                    <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;






