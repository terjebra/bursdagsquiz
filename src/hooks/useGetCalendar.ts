import { useQuery } from "@tanstack/react-query";
import type { Calendar } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

export const useGetCalendar = (calendarName: string) => {
	const query = useQuery({
		queryKey: ["calendar", calendarName],
		queryFn: async () => {
			const response = await fetch(`${apiUrl}/calendars/${calendarName}`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data: Calendar = await response.json();
			return data;
		},
	});
	return query;
};
