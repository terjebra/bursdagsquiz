import { useMutation } from "@tanstack/react-query";
import type { UpdateDoor } from "../types";
import { useAccessToken } from "./useAccessToken";

const apiUrl = import.meta.env.VITE_API_URL;

export const useUpdateDoor = (calendarName: string, doorName: string) => {
	const accessToken = useAccessToken();
	const mutation = useMutation({
		mutationFn: async (door: UpdateDoor) => {
			if (!accessToken) {
				throw new Error("Access token is not available");
			}
			const response = await fetch(
				`${apiUrl}/admin/calendars/${calendarName}/doors/${doorName}`,
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
