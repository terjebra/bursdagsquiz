import { useQuery } from "@tanstack/react-query";
import type { AdminDoor } from "../types";
import { useAccessToken } from "./useAccessToken";

const apiUrl = import.meta.env.VITE_API_URL;

export const useGetAdminDoor = (calendarName: string, doorName: string) => {
	const accessToken = useAccessToken();
	const query = useQuery({
		queryKey: [calendarName, doorName, "admin-door"],
		queryFn: async () => {
			if (!accessToken) {
				throw new Error("Access token is not available");
			}
			const response = await fetch(
				`${apiUrl}/admin/calendars/${calendarName}/doors/${doorName}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				},
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data: AdminDoor = await response.json();
			return data;
		},
		enabled: !!accessToken,
	});
	return query;
};
