import { ReactElement, useEffect, useRef, useState } from "react"

export interface DrillProps<DrillInput> {
    questionProducer: () => DrillInput,
    questionRenderer: (input: DrillInput) => ReactElement,
    answerRenderer: (input: DrillInput) => ReactElement,
    initialQuestionTime: number,
    initialAnswerTime: number,
    minSliderValue: number,
    maxSliderValue: number
}

export function Drill<DrillInput>(props: DrillProps<DrillInput>) {
    const questionProducer = props.questionProducer;
    const [questionTime, setQuestionTime] = useState(props.initialQuestionTime);
    const [answerTime, setAnswerTime] = useState(props.initialAnswerTime);
    const [showingQuestion, setShowingQuestion] = useState(true);
    const [questionData, setQuestionData] = useState(questionProducer());
    const timer = useRef(setTimeout(() => {
    }, questionTime));
    useEffect(
        () => {
            if (showingQuestion) {
                clearTimeout(timer.current);
                timer.current = setTimeout(() => setShowingQuestion(false), questionTime);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [questionTime]
    );
    useEffect(
        () => {
            if (!showingQuestion) {
                clearTimeout(timer.current);
                timer.current = setTimeout(() => {
                    setQuestionData(questionProducer());
                    setShowingQuestion(true);
                }, answerTime);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [answerTime]
    );
    useEffect(
        () => {
            if (showingQuestion) {
                timer.current = setTimeout(() => setShowingQuestion(false), questionTime);
            }
            else {
                timer.current = setTimeout(() => {
                    setQuestionData(questionProducer());
                    setShowingQuestion(true);
                }, answerTime);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [showingQuestion]);
    return (<>
        <label>Denktijd:
            <input
            type="range"
            min={props.minSliderValue}
            value={questionTime}
            max={props.maxSliderValue}
            onChange={(event) => setQuestionTime(parseInt(event.target.value))} /></label>
        <label>Tijd om antwoord te tonen:
            <input
            type="range"
            min={props.minSliderValue}
            value={answerTime}
            max={props.maxSliderValue}
            onChange={(event) => setAnswerTime(parseInt(event.target.value))} /></label>
        { showingQuestion ? props.questionRenderer(questionData) : props.answerRenderer(questionData)}
    </>);
}