
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineCloudUpload } from "react-icons/ai";

const AddEmployee = () => {
	let navigate = useNavigate();
	const [employee, setEmployee] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
		phoneNumber: "",
	});
	const [photoFile, setPhotoFile] = useState(null);
	const [photoLabel, setPhotoLabel] = useState("File not selected");

	const {
		firstName,
		lastName,
		email,
		department,
		phoneNumber,	
	} = employee;

	const handleInputChange = (e) => {
		setEmployee({
			...employee,
			[e.target.name]: e.target.value,
		});
	};

	const handlePhotoChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPhotoFile(file);
			setPhotoLabel(file.name);
		} else {
			setPhotoLabel("File not selected");
		}
	};
      console.log("BASE_URL:", process.env.REACT_APP_API_BASE_URL);
   
	const saveEmployee = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		Object.entries(employee).forEach(([key, value]) =>
			formData.append(key, value)
		);
		if (photoFile) {
			formData.append("photo", photoFile);
		}
         
		await axios.post(`${process.env.REACT_APP_API_BASE_URL}/employees`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		navigate("/view-employees");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5">Add Employee</h2>
			<form onSubmit={saveEmployee}>
				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="firstName">
						First Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="firstName"
						id="firstName"
						required
						value={firstName}
						onChange={handleInputChange}
					/>
				</div>

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="lastName">
						Last Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="lastName"
						id="lastName"
						required
						value={lastName}
						onChange={handleInputChange}
					/>
				</div>

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="email">
						Your Email
					</label>
					<input
						className="form-control col-sm-6"
						type="email"
						name="email"
						id="email"
						required
						value={email}
						onChange={handleInputChange}
					/>
				</div>

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="department">
						Department
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="department"
						id="department"
						required
						value={department}
						onChange={handleInputChange}
					/>
				</div>

				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="phoneNumber">
						Phone Number
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="phoneNumber"
						id="phoneNumber"
						required
						value={phoneNumber}
						onChange={handleInputChange}
					/>
				</div>
				<div className="mb-5">
					<input
						type="file"
						id="photo"
						accept="image/*"
						onChange={handlePhotoChange}
						style={{ display: "none" }}
					/>
					<label
						htmlFor="photo"
						className="btn btn-outline-secondary d-flex align-items-center justify-content-between gap-3 w-100"
						style={{ cursor: "pointer" }}
					>
						<span className="d-flex align-items-center gap-2">
							<AiOutlineCloudUpload size={20} />
							Upload Photo
						</span>
						<span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
							{photoLabel}
						</span>
					</label>
				</div>

				<div className="row mb-5">
					<div className="col-sm-2">
						<button
							type="submit"
							className="btn btn-outline-success btn-lg"
						>
							Save
						</button>
					</div>

					<div className="col-sm-2">
						<Link
							to={"/view-employees"}
							className="btn btn-outline-secondary btn-lg"
						>                 
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddEmployee;
