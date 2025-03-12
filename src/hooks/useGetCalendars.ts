import { useQuery } from "@tanstack/react-query";
import type { CalendarListItem } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

export const useGetCalendars = () => {
	const query = useQuery({
		queryKey: ["calendars"],
		queryFn: async () => {
			const response = await fetch(`${apiUrl}/calendars`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data: Array<CalendarListItem> = await response.json();
			return data;
		},
	});
	return query;
};
