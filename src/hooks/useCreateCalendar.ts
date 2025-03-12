import { useMutation } from "@tanstack/react-query";
import type { CreateCalendar } from "../types";
import { useAccessToken } from "./useAccessToken";

const apiUrl = import.meta.env.VITE_API_URL;

export const useCreateCalendar = () => {
	const accessToken = useAccessToken();
	const mutation = useMutation({
		mutationFn: async (calendar: CreateCalendar) => {
			const response = await fetch(`${apiUrl}/admin/calendars/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(calendar),
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
		},
	});
	return mutation;
};
