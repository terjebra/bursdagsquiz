import { useQuery } from "@tanstack/react-query";
import type { AdminCalendar } from "../types";
import { useAccessToken } from "./useAccessToken";

const apiUrl = import.meta.env.VITE_API_URL;

export const useGetAdminCalendar = (calendarName: string) => {
	const accessToken = useAccessToken();

	const query = useQuery({
		queryKey: ["admin-calendar", calendarName],
		queryFn: async () => {
			if (!accessToken) {
				throw new Error("No access token available");
			}
			const response = await fetch(
				`${apiUrl}/admin/calendars/${calendarName}`,
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
			const data: AdminCalendar = await response.json();
			return data;
		},
	});
	return query;
};
