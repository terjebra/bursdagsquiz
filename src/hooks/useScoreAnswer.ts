import { useMutation } from "@tanstack/react-query";
import type { ScoreAnswer } from "../types";
import { useAccessToken } from "./useAccessToken";

const apiUrl = import.meta.env.VITE_API_URL;

export const useScoreAnswer = (calendarName: string, doorName: string) => {
	const accessToken = useAccessToken();
	const mutation = useMutation({
		mutationFn: async (score: ScoreAnswer) => {
			const response = await fetch(
				`${apiUrl}/admin/calendars/${calendarName}/doors/${doorName}/answers/${score.answerId}/score`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(score),
				},
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
		},
	});
	return mutation;
};
