import { FaChevronDown } from "react-icons/fa";
import "../css/index.css";
import { useState } from "react";

export default function App() {
	const BASE_ENDPOINT_URL = "https://cis-advisor-backend.vercel.app/";
	const [endpointURL, setEndpointURL] = useState("");
	const [requestType, setRequestType] = useState("GET");
	const [requests] = useState(["GET", "POST", "PUT", "DELETE", "PATCH"]);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<div className="w-full min-h-screen p-4 bg-gray-50 flex justify-center items-start">
			<div className="w-full max-w-4xl mt-20 flex items-center border border-blue-700 rounded-md">
				<div
					className="border-r border-blue-700 font-semibold text-sky-700 flex items-center justify-center px-4 py-2 cursor-pointer relative"
					onClick={() => setDropdownOpen(!dropdownOpen)}
				>
					{requestType}
					<FaChevronDown className="ml-2" />
					{dropdownOpen && (
						<ul className="absolute top-full left-0 mt-1 bg-white border border-blue-700 rounded-md shadow-md w-28 z-10">
							{requests.map((request, index) => (
								<li
									key={index}
									className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
									onClick={() => {
										setRequestType(request);
										setDropdownOpen(false);
									}}
								>
									{request}
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="flex flex-1 items-center px-4 py-2 gap-2">
					<p className="text-blue-800">{BASE_ENDPOINT_URL}</p>
					<input
						type="text"
						placeholder="api/endpoint-here"
						className="flex-1 outline-none text-blue-700 border-b border-gray-300 focus:border-blue-500 transition"
						value={endpointURL}
						onChange={e => setEndpointURL(e.target.value)}
					/>
				</div>
				<button className="bg-blue-500 rounded-md hover:cursor-pointer text-white px-6 py-2 hover:bg-blue-600 transition">
					Send
				</button>
			</div>
		</div>
	);
}
