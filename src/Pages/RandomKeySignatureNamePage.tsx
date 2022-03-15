import { MajorKey, MinorKey, minorKey, majorKey, majorTonicFromKeySignature } from "@tonaljs/key";
import { Drill } from "../Components/Drill";

function questionGenerator() {
    const usingSharps = Math.random() >= 0.5;
    const keyFactory = Math.random() >= 0.5 ? minorKey : majorKey;
    if (usingSharps) {
        const numberOfSharps = Math.floor(Math.random() * 7);
        const keySignature = "#".repeat(numberOfSharps);
        let tonic = majorTonicFromKeySignature(keySignature);
        if (!tonic) {
            tonic = "C";
        }
        return keyFactory(tonic);
    }
    else {
        const numberOfFlats = Math.floor(Math.random() * 6) + 1;
        const keySignature = "b".repeat(numberOfFlats);
        return keyFactory(majorTonicFromKeySignature(keySignature) as string);
    }
}

function questionRenderer(key: MajorKey | MinorKey) {
    return <p>{key.tonic} {key.type}</p>
}

function answerRenderer(key: MajorKey | MinorKey) {
    return <p>{key.keySignature}</p>
}

function RandomKeySignatureNamePage() {
    return (
        <Drill
            questionProducer={questionGenerator}
            questionRenderer={questionRenderer}
            answerRenderer={answerRenderer}
            initialQuestionTime={5000}
            initialAnswerTime={5000}
            minSliderValue={1000}
            maxSliderValue={20000} />
    )
}


export default RandomKeySignatureNamePage;