import { useMutation } from "@tanstack/react-query";
import type { UpdateCalendar } from "../types";
import { useAccessToken } from "./useAccessToken";

const apiUrl = import.meta.env.VITE_API_URL;

export const useUpdateCalendar = (calendarName: string) => {
	const accessToken = useAccessToken();
	const mutation = useMutation({
		mutationFn: async (door: UpdateCalendar) => {
			const response = await fetch(
				`${apiUrl}/admin/calendars/${calendarName}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(door),
				},
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
		},
	});
	return mutation;
};
