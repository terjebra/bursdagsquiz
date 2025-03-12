import { useQuery } from "@tanstack/react-query";
import type { DoorAnswer } from "../types";
import { useAccessToken } from "./useAccessToken";

const apiUrl = import.meta.env.VITE_API_URL;

export const useGetDoorAnswers = (calendarName: string, doorName: string) => {
	const accessToken = useAccessToken();
	const query = useQuery({
		queryKey: [calendarName, doorName, "answers"],
		queryFn: async () => {
			if (!accessToken) {
				throw new Error("Access token is not available");
			}
			const response = await fetch(
				`${apiUrl}/admin/calendars/${calendarName}/doors/${doorName}/answers`,
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
			const data: ReadonlyArray<DoorAnswer> = await response.json();
			return data;
		},
		enabled: !!accessToken,
	});
	return query;
};
