import  { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ss } from "../../assets/images";
 
const EmployeePofile = () => {
	const { id } = useParams();

	const [employee, setEmployee] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
		phoneNumber: "",
	});

		const [showCallModal, setShowCallModal] = useState(false);
		const [showMessageModal, setShowMessageModal] = useState(false);
		const [message, setMessage] = useState("");

	useEffect(() => { loadEmployee(); }, []);

	const loadEmployee = async () => {
		const result = await axios.get(
			`${process.env.REACT_APP_API_BASE_URL}/employees/employee/${id}`
		);
		setEmployee(result.data);
	};

		const handleSendMessage = () => {
		alert(`Message sent: "${message}"`);
		setShowMessageModal(false);
		setMessage("");
	};

	return (
		<section
			className="shadow"
			style={{ backgroundColor: "whitesmoke" }}>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-3">
						<div className="card mb-4">
							<div className="card-body text-center">
 
								<img
									src={`${process.env.REACT_APP_API_BASE_URL}/employees/employee/${id}/photo`}
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150, height: 150, objectFit: "cover" }}
									onError={(e) => {
										e.target.onerror = null;  
										e.target.src = ss;
									}}
								/>

								<h5 className="my-3">
									{`${employee.firstName} ${employee.lastName}`}
								</h5>
								<div className="d-flex justify-content-center mb-2">
									<button
										type="button"
										className="btn btn-outline-primary"
										 onClick={() => setShowCallModal(true)}>
										Call
									</button>
									<button
										type="button"
										className="btn btn-outline-warning ms-1"
										onClick={() => setShowMessageModal(true)}>
										Message
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />
								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											First Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employee.firstName}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Last Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employee.lastName}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Email
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employee.email}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Department
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employee.department}
										</p>
									</div>
								</div>
								<hr />
									 <div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											PhoneNumber
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employee.phoneNumber}
										</p>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
							
				{showCallModal && (
					<div className="modal show d-block" tabIndex="-1">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Calling {employee.firstName}...</h5>
									<button type="button" className="btn-close" onClick={() => setShowCallModal(false)}></button>
								</div>
								<div className="modal-body">
									<p>Call on the phone: {employee.phoneNumber}</p>
								</div>
								<div className="modal-footer">
									<button className="btn btn-danger" onClick={() => setShowCallModal(false)}>Cancel</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{showMessageModal && (
					<div className="modal show d-block" tabIndex="-1">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Send message</h5>
									<button type="button" className="btn-close" onClick={() => setShowMessageModal(false)}></button>
								</div>
								<div className="modal-body">
									<textarea
										className="form-control"
										rows="4"
										placeholder="Enter your message..."
										value={message}
										onChange={(e) => setMessage(e.target.value)}
									/>
								</div>
								<div className="modal-footer">
									<button className="btn btn-secondary" onClick={() => setShowMessageModal(false)}>Close</button>
									<button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
								</div>
							</div>
						</div>
					</div >
				)}
			</div>  

<div
  className="d-flex justify-content-center mb-4"
  style={{ marginTop: "-30px" }}  
>
  <button
    className="btn btn-outline-secondary btn-lg mb-4"
    onClick={() => window.history.back()}
  >
    Cancel
  </button>
</div>
		</section>
	);
};

export default EmployeePofile;
 