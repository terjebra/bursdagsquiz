import { useMutation } from "@tanstack/react-query";
import type { AddDoor } from "../types";
import { useAccessToken } from "./useAccessToken";

const apiUrl = import.meta.env.VITE_API_URL;

export const useAddDoor = (calendarName: string) => {
	const accessToken = useAccessToken();
	const mutation = useMutation({
		mutationFn: async (door: AddDoor) => {
			const response = await fetch(
				`${apiUrl}/admin/calendars/${calendarName}/doors/`,
				{
					method: "POST",
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
