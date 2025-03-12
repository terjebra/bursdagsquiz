import { useQuery } from "@tanstack/react-query";
import type { Door } from "../types";
import { useAccessToken } from "./useAccessToken";

const apiUrl = import.meta.env.VITE_API_URL;

export const useGetDoor = (calendarName: string, doorName: string) => {
	const accessToken = useAccessToken();
	const query = useQuery({
		queryKey: [calendarName, doorName, accessToken],
		queryFn: async () => {
			const headers: HeadersInit = {};
			if (accessToken) {
				headers.Authorization = `Bearer ${accessToken}`;
			}

			const response = await fetch(
				`${apiUrl}/calendars/${calendarName}/doors/${doorName}`,
				{
					method: "GET",
					headers,
				},
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data: Door = await response.json();
			return data;
		},
		enabled: accessToken !== undefined, // Ensure the query runs even if accessToken is null
	});
	return query;
};
