import { useMutation } from "@tanstack/react-query";
import type { SubmitAnswer } from "../types";
import { useAccessToken } from "./useAccessToken";

const apiUrl = import.meta.env.VITE_API_URL;

export const useSubmitAnswer = (calendarName: string, doorName: string) => {
	const accessToken = useAccessToken();
	const mutation = useMutation({
		mutationFn: async (answer: SubmitAnswer) => {
			const response = await fetch(
				`${apiUrl}/calendars/${calendarName}/doors/${doorName}/answer`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(answer),
				},
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
		},
	});
	return mutation;
};
