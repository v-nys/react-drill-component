import { ReactElement, useEffect, useRef, useState } from "react"

export interface DrillProps<DrillInput> {
    data: DrillInput[],
    questionRenderer: (input: DrillInput) => ReactElement,
    answerRenderer: (input: DrillInput) => ReactElement,
    initialQuestionTime: number,
    initialAnswerTime: number
}

export function Drill<DrillInput>(props: DrillProps<DrillInput>) {
    const [questionTime, setQuestionTime] = useState(props.initialQuestionTime);
    const [answerTime, setAnswerTime] = useState(props.initialAnswerTime);
    const [showingQuestion, setShowingQuestion] = useState(true);
    const [questionData, setQuestionData] = useState(props.data[Math.floor(Math.random() * DataTransfer.length)]);

    const timer = useRef(setTimeout(() => {
    }, questionTime));
    useEffect(
        () => {
            if (showingQuestion) {
                clearTimeout(timer.current);
                timer.current = setTimeout(() => setShowingQuestion(false), questionTime);
            }
        },
        [questionTime]
    );
    useEffect(
        () => {
            if (!showingQuestion) {
                clearTimeout(timer.current);
                timer.current = setTimeout(() => {
                    setQuestionData(props.data[Math.floor(Math.random() * DataTransfer.length)]);
                    setShowingQuestion(true);
                }, answerTime);
            }
        },
        [answerTime]
    );
    useEffect(
        () => {
            if (showingQuestion) {
                timer.current = setTimeout(() => setShowingQuestion(false), questionTime);
            }
            else {
                timer.current = setTimeout(() => {
                    setQuestionData(props.data[Math.floor(Math.random() * DataTransfer.length)]);
                    setShowingQuestion(true);
                }, answerTime);
            }
        },
        [showingQuestion]);
    return (<>
        <label>Denktijd:
            <input
            type="range"
            min={1000}
            value={questionTime}
            max={20000}
            onChange={(event) => setQuestionTime(parseInt(event.target.value))} /></label>
        <label>Tijd om antwoord te tonen:
            <input
            type="range"
            min={1000}
            value={answerTime}
            max={20000}
            onChange={(event) => setAnswerTime(parseInt(event.target.value))} /></label>
        <p>{ showingQuestion ? JSON.stringify(questionData) : "hier het antwoord"}</p>
        <button>Pauzeren</button>
        <button>Doorgaan naar de volgende vraag (wanneer gepauzeerd)</button>
    </>);
}