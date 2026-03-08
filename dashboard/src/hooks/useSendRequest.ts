import axios from "axios";
import { useState } from "react";

export default function useSendRequest() {
	const [status, setStatus] = useState<number | null>(null);
	const [response, setResponse] = useState<any>(null);
	const [responseSize, setResponseSize] = useState<number | null>(null);
	const [responseTimeMS, setResponseTimeMS] = useState<number | null>(null);

	async function sendRequest(
		endpoint: string,
		requestType: string,
		bodyContent: any,
		queryParams: any,
		headers: any
	) {
		const start = performance.now();
		try {
			const res = await axios.request({
				url: endpoint,
				method: requestType,
				data: bodyContent,
				params: queryParams,
				headers: headers
			});

			const end = performance.now();
			const duration = end - start; // Calculate duration in milliseconds

			const status = res.status;
			const response = res.request.response;

			setStatus(status);
			setResponse(response);
			setResponseTimeMS(+duration.toFixed(2));

			const responseSize =
				res.headers["content-length"] ?? JSON.stringify(res.data).length;

			setResponseSize(Number(responseSize) / 1000);
		} catch (error) {
			const end = performance.now();
			const duration = end - start;
			setResponseTimeMS(+duration.toFixed(2));
			setResponse((error as Error).message);
			setStatus((error as any).response?.status);
		}
	}

	return { sendRequest, status, response, responseSize, responseTimeMS };
}
