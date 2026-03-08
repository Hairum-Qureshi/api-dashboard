import { FaChevronDown } from "react-icons/fa";
import "../css/index.css";
import { useState } from "react";
import JSONContent from "./JSONContent";
import BodyContent from "./BodyContent";
import useSendRequest from "../hooks/useSendRequest";

export default function App() {
	// const BASE_ENDPOINT_URL = "https://cis-advisor-backend.vercel.app/";
	const BASE_ENDPOINT_URL = "https://jsonplaceholder.typicode.com/";
	const [endpointURL, setEndpointURL] = useState("");
	const [requestType, setRequestType] = useState("GET");
	const [requests] = useState(["GET", "POST", "PUT", "DELETE", "PATCH"]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedTab, setSelectedTab] = useState("JSON");
	const [selectedResponseTab, setSelectedResponseTab] = useState("JSON");
	const { sendRequest, status, response, responseSize, responseTimeMS } =
		useSendRequest();

	// TODO - have text wrap in JSONContent and BodyContent

	return (
		<div className="w-full min-h-screen p-4 bg-gray-50 flex flex-col justify-start items-center">
			<div className="w-full max-w-4xl mt-10 flex items-center border border-blue-700 rounded-md">
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
						className="-ml-2 outline-none w-full text-blue-700 underline-none border-gray-300 focus:border-blue-500 transition"
						value={endpointURL}
						onChange={e => setEndpointURL(e.target.value)}
					/>
				</div>
				<button
					className="bg-blue-500 rounded-md hover:cursor-pointer text-white px-6 py-2 hover:bg-blue-600 transition"
					onClick={() =>
						sendRequest(
							`${BASE_ENDPOINT_URL}${endpointURL}`,
							requestType,
							{},
							{},
							{}
						)
					}
				>
					Send
				</button>
			</div>
			<div className="w-full max-w-4xl mt-5">
				<div className="text-sm font-medium text-center text-gray-700 border-b border-blue-600">
					<ul className="flex flex-wrap">
						{["JSON", "Body"].map(tab => (
							<li key={tab} className="-mb-px">
								<button
									className={`inline-block p-4 border-b-2 ${
										selectedTab === tab
											? "border-blue-600 text-blue-800"
											: "border-transparent text-blue-400 hover:text-blue-800 hover:cursor-pointer"
									}`}
									onClick={() => tab && setSelectedTab(tab)}
								>
									{tab}
								</button>
							</li>
						))}
					</ul>
				</div>
				<div className="p-3 border border-t-0 border-blue-600 rounded-b-lg">
					{selectedTab === "JSON" && (
						<div id="json" className="h-96 overflow-auto">
							<JSONContent />
						</div>
					)}
					{selectedTab === "Body" && (
						<div id="body">
							<BodyContent />
						</div>
					)}
				</div>
			</div>
			{response && (
				<div className="w-full max-w-4xl mt-7">
					<h1 className="text-2xl">Response</h1>
					<div className="flex space-x-3 mt-2">
						<p>
							Status: <strong>{status}</strong>
						</p>
						<p>
							Time: <strong>{responseTimeMS}ms</strong>
						</p>
						<p>
							Size: <strong>{responseSize}kb</strong>
						</p>
					</div>
					<div className="w-full max-w-4xl">
						<div className="text-sm font-medium text-center text-gray-700 border-b border-blue-600">
							<ul className="flex flex-wrap">
								{["JSON", "Body"].map(responseTab => (
									<li key={responseTab} className="-mb-px">
										<button
											className={`inline-block p-4 border-b-2 ${
												selectedResponseTab === responseTab
													? "border-blue-600 text-blue-800"
													: "border-transparent text-blue-400 hover:text-blue-800 hover:cursor-pointer"
											}`}
											onClick={() =>
												responseTab && setSelectedResponseTab(responseTab)
											}
										>
											{responseTab}
										</button>
									</li>
								))}
							</ul>
						</div>
						<div className="p-3 border border-t-0 border-blue-600 rounded-b-lg">
							{selectedResponseTab === "JSON" && (
								<div id="response-json" className="h-96 overflow-auto">
									<JSONContent json={response} />
								</div>
							)}
							{selectedResponseTab === "Body" && (
								<div id="response-body">
									<BodyContent />
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
