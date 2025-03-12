
export type Team = {
	id: string;
	name: string;
	answer: SubmitAnswer;
}

export type SubmitAnswer = {
	answer: string;
};

export type ScoreAnswer = {
	score: number;
	answerId: string;
};

export type Leaderboard = {
	entries: ReadonlyArray<LeaderboardEntry>;
};

export type LeaderboardEntry = {
	numberOfAnswers: number;
	totalScore: number;
	user: User;
};
