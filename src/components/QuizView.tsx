import { useState, useRef, useEffect } from "react";

export const QuizView = () => {
	const answer = "syv år"; // Example answer
	const [inputs, setInputs] = useState(Array(answer.length).fill(""));
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const [showBalloons, setShowBalloons] = useState(false);

	const handleChange = (index: number, value: string) => {
		const newInputs = [...inputs];
		newInputs[index] = value.toUpperCase();
		setInputs(newInputs);

		if (value) {
			let nextIndex = index + 1;
			while (nextIndex < answer.length && answer[nextIndex] === " ") {
				nextIndex++;
			}
			if (nextIndex < answer.length) {
				inputRefs.current[nextIndex]?.focus();
			}
		}
	};

	const handleKeyDown = (
		index: number,
		event: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (event.key === "Backspace" && !inputs[index]) {
			let prevIndex = index - 1;
			while (prevIndex >= 0 && answer[prevIndex] === " ") {
				prevIndex--;
			}
			if (prevIndex >= 0) {
				inputRefs.current[prevIndex]?.focus();
				const newInputs = [...inputs];
				newInputs[prevIndex] = "";
				setInputs(newInputs);
				setShowBalloons(false); // Remove animation
			}
		}
	};

	useEffect(() => {
		const normalizedAnswer = answer.replace(/\s+/g, "").toUpperCase();
		const normalizedInput = inputs.join("").replace(/\s+/g, "").toUpperCase();
		if (normalizedInput === normalizedAnswer) {
			setShowBalloons(true);
		}
	}, [inputs]);

	useEffect(() => {
		let firstIndex = 0;
		while (firstIndex < answer.length && answer[firstIndex] === " ") {
			firstIndex++;
		}
		if (firstIndex < answer.length) {
			inputRefs.current[firstIndex]?.focus();
		}
	}, []);

	return (
		<div className="flex justify-center items-center h-screen relative ">
			{showBalloons && (
				<div className="absolute inset-0 flex justify-center items-center bg-transparent bg-opacity-90">
					<div className="animate-bounce text-9xl text-yellow-500">🏆</div>
				</div>
			)}
			<div className="grid grid-cols-7 gap-4">
				{answer.split("").map((char, index) =>
					char === " " ? (
						<div key={index} className="w-12 h-12" />
					) : (
						<div key={index} className="flex flex-col items-center gap-2">
							<input
								ref={(el) => (inputRefs.current[index] = el)}
								type="text"
								maxLength={1}
								value={inputs[index]}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className="w-12 h-12 text-center border-b-2 border-gray-300 focus:outline-none bg-transparent text-3xl"
							/>
						</div>
					),
				)}
			</div>
		</div>
	);
};
