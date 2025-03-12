import { useQuery } from "@tanstack/react-query";
import type { Leaderboard } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

export const useGetLeaderboard = (calendarName: string) => {
	const query = useQuery({
		queryKey: ["leaderboard", calendarName],
		queryFn: async () => {
			const response = await fetch(
				`${apiUrl}/calendars/${calendarName}/leaderboard`,
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data: Leaderboard = await response.json();
			return data;
		},
	});
	return query;
};
