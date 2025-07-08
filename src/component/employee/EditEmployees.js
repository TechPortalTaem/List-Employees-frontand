
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";

const EditEmployees = () => {
	let navigate = useNavigate();
	const { id } = useParams();

	const [employee, setEmployee] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
		phoneNumber: "",
	});
	const [photoFile, setPhotoFile] = useState(null);
	const [photoLabel, setPhotoLabel] = useState("File not selected");
	const [existingPhotoUrl, setExistingPhotoUrl] = useState(null);

	const {
		firstName,
		lastName,
		email,
		department,
		phoneNumber,
	} = employee;

	useEffect(() => {
		loadEmployee();
	}, []);

	const loadEmployee = async () => {
		const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/employees/employee/${id}`);
		setEmployee(result.data);
		setPhotoLabel("File not selected");
		setExistingPhotoUrl(`${process.env.REACT_APP_API_BASE_URL}/employees/employee/${id}/photo`);
	};

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

			const previewUrl = URL.createObjectURL(file);
			setExistingPhotoUrl(previewUrl);
		} else {
			setPhotoLabel("File not selected");
		}
	};

	const updateEmployee = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		Object.entries(employee).forEach(([key, value]) => {
			formData.append(key, value);
		});
		if (photoFile) {
			formData.append("photo", photoFile);
		}

		await axios.put(`${process.env.REACT_APP_API_BASE_URL}/employees/update/${id}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		navigate("/view-employees");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5">Edit Employee</h2>
			<form onSubmit={updateEmployee}>
				<div className="input-group mb-5">
					<label className="input-group-text" htmlFor="firstName">First Name</label>
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
					<label className="input-group-text" htmlFor="lastName">Last Name</label>
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
					<label className="input-group-text" htmlFor="email">Your Email</label>
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
					<label className="input-group-text" htmlFor="department">Department</label>
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
					<label className="input-group-text" htmlFor="phoneNumber">Phone Number</label>
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
				{existingPhotoUrl && (
					<div className="text-center mb-3">
						<img
							src={existingPhotoUrl}
							alt="Employee"
							style={{ width: 150, height: 150, objectFit: "cover", borderRadius: "50%" }}
						/>
					</div>
				)}

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
						<button type="submit" className="btn btn-outline-success btn-lg">
							Save
						</button>
					</div>

					<div className="col-sm-2">
						<Link to="/view-employees" className="btn btn-outline-secondary btn-lg">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditEmployees;