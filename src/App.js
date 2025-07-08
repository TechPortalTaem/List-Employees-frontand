import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

import "./App.css";
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import AddEmployee from "./component/employee/AddEmployee";
import EmployeeView from "./component/employee/EmployeeView";
import EmployeePofile from "./component/employee/EmployeePofile";
import EditEmployees from "./component/employee/EditEmployees";
import RootLayout from "./component/layout/RootLayout";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<RootLayout />}>
				<Route path="view-employees" element={<EmployeeView />} />
				<Route path="add-employees" element={<AddEmployee />} />
				<Route path="edit-employee/:id" element={<EditEmployees />} />
				<Route path="employee-profile/:id" element={<EmployeePofile />} />
			</Route>
		)
	);

	return (
		<main className="container mt-5">
			<RouterProvider router={router} />
		</main>
	);
}

export default App;