import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { Formik, Field } from 'formik';
import './Visitor.css'
const validationSchema = Yup.object().shape({
    visitorID: Yup.string().required('visitorID is required'),
    firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(' first name requied'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(' last name required'),
    nic: Yup.string()
    .required("nic required")
    .length(10)
    .matches(/^\d{9}[vVxX]$/, 'Invalid NIC format'),
    vehicleType:Yup.string()
    .required("Vehicle type is required "),
    licenceNo: Yup.string()
    .required("licenceNo is required "),
        checkIn:Yup.string()
        .required("checkIn detail is required "),
        checkout: Yup.string()
        .required("checkout detail is required "),
        description: Yup.string()
        .required("description detail is required "),
});
const Visitor = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        visitorID: '',
        lastName: '',
        firstName: '',
        nic: '',
        description: '',
        vehicleType: '',
        licenceNo: '',
        checkIn: '',
        checkout: '',


    });
    const [errors, setErrors] = useState([]);
const [visitor,setvisitor]=useState([])
    const handleClose = () => {
        setShow(false)
        setErrors({});
    };
    const handleShow = () => setShow(true);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log(formData)


            const response = await axios.post('http://localhost:5000/api/v2/create', formData);
            if (response.data.success) {
                console.log('Data saved successfully.');
                toast.success(response.data  , {autoClose:3000})
                handleClose();
                setFormData("")
                getallvisitor()
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors = {};
                error.inner.forEach((validationError) => {
                    newErrors[validationError.path] = validationError.message;
                    console.log(error)
                });
                setErrors(newErrors);
                console.log(newErrors)
            } else {
                console.error('Error saving data:', error);
                // Handle other errors (e.g., server error) if necessary.
            }
        }
    };

const getallvisitor=async()=>{
try {
    const response = await axios.get('http://localhost:5000/api/v1/allvisitor');
    if(!response){
        console.log("nodata")
    }else{
        setvisitor(response.data.visitor)
        console.log(response.data.visitor)

    }
} catch (error) {
    console.log(error)
}
}


useEffect(()=>{
    getallvisitor();
},[])
    return (
        <div>
            <div className="container">
                <div className="content-area">
                    <h2 className="table-title">Visitor Detail</h2> {/* Updated table title */}
                    <div className="table-header">


                        <Button variant="primary" onClick={handleShow}>
                            Add New Visitor Detail
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>create new Visitor</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form  onSubmit={handleSubmit} >
                                    <Form.Group className="mb-3" controlId="visitorID">
                                        {/* <Form.Label>Email address</Form.Label> */}
                                        <Form.Control
                                            type="text"
                                            placeholder="visitorID"
                                            autoFocus
                                            className='mb-2'
                                            name='visitorID'
                                            value={formData.visitorID}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.visitorID}

                                        />
                                        <Form.Control.Feedback type="invalid">{errors.visitorID}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="lastName">
                                        <Form.Control
                                            type="text"
                                            placeholder="LastName"
                                            autoFocus
                                            className='mb-2'
                                            name='lastName'
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.lastName}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="firstName">
                                        <Form.Control
                                            type="text"
                                            placeholder="firstName"
                                            autoFocus
                                            className='mb-2'
                                            name='firstName'
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.firstName}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="nic">
                                        <Form.Control
                                            type="text"
                                            placeholder="nic"
                                            autoFocus
                                            className='mb-2'
                                            name='nic'
                                            value={formData.nic}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.nic}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.nic}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="vehicleType">
                                        <Form.Control
                                            type="text"
                                            placeholder="vehicle Type"
                                            autoFocus
                                            className='mb-2'
                                            name='vehicleType'
                                            value={formData.vehicleType}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.vehicleType}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.vehicleType}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="licenceNo">
                                        <Form.Control
                                            type="text"
                                            placeholder="licenceNo"
                                            autoFocus
                                            className='mb-2'
                                            name='licenceNo'
                                            value={formData.licenceNo}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.licenceNo}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.licenceNo}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="checkIn">
                                        <Form.Control
                                            type="text"
                                            placeholder="checkIn"
                                            autoFocus
                                            className='mb-2'
                                            name='checkIn'
                                            value={formData.checkIn}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.checkIn}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.checkIn}</Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="checkout">
                                        <Form.Control
                                            type="text"
                                            placeholder="checkout"
                                            autoFocus
                                            className='mb-2'
                                            name='checkout'
                                            value={formData.checkout}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.checkout}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.checkout}</Form.Control.Feedback>

                                    </Form.Group>


                                    <Form.Group
                                        className="mb-3"
                                        controlId="description"
                                    >
                                        <Form.Label>description</Form.Label>
                                        <Form.Control as="textarea" rows={3}

                                            name='description'
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            isInvalid={!!errors.description} />
                                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>

                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleSubmit} type='submit'  >
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <div className="search-bar">
                            <input type="text" placeholder="Search..." />
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                            <th></th>
                                <th>visitorID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>NIC</th>
                                <th>description</th>
                                <th>Vehicle Type</th>
                                <th>licenceNo</th>
                                <th>Check in</th>
                                <th>Check out</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table rows with time schedule data */}
{
    visitor.map((item, index) => (
          <tr key={index}>
          <td>{index+1}</td>
            <td>{item.visitorID}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.nic}</td>
            <td>{item.description}</td>
            <td>{item.vehicleType}</td>
            <td>{item.licenceNo}</td>
            <td>{item.checkIn}</td>
            <td>{item.checkout}</td>
           
          </tr>
        ))
}
                            {/* Add more table rows as needed */}
                        </tbody>
                    </table>

                    {/* <div id="addDetailForm" className="add-Detail-form">
          <h2>Add New student Detail</h2>
          <form>
            <label htmlFor="SID">SID:</label>
            <input type="text" id="no" name="no" required />
            <br />
            <label htmlFor="First Name">First Name:</label>
            <input type="text" id="no" name="no" required />
            <br />
            <label htmlFor="Last Name">Last Name:</label>
            <input type="text" id="no" name="no" required />
            <br />
            <label htmlFor="NIC">NIC:</label>
            <input type="text" id="number" name="number" required />
            <br />
            <label htmlFor="Vehicle Type">Vehicle Type:</label>
            <input type="text" id="Vehicle Type" name="Vehicle Type" required />
            <br />
            <label htmlFor="LP No">LP No:</label>
            <input type="text" id="LP No" name="LP No" required />
            <br />
            <label htmlFor="Check in">Check in:</label>
            <input type="text" id="Check in" name="Check in" required />
            <br />
            <label htmlFor="Check out">Check out:</label>
            <input type="text" id="Check out" name="Check out" required />
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={hideAddDetailForm}>Cancel</button>
          </form>
        </div> */}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Visitor
