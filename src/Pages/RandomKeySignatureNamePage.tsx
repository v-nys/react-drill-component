import { MajorKey, MinorKey, minorKey, majorKey, majorTonicFromKeySignature } from "@tonaljs/key";
import { Note } from "@tonaljs/tonal";
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
    const pointOfReference = Note.simplify(key.type === "major" ? key.tonic : key.relativeMajor); // zou bij Ab mineur Cb majeur kunnen zijn
    let correspondingMajorKeyBullet;
    let whyThisRuleBullet;
    let countFifthsUpToKeyNameAndCountBullet;
    let countFourthsUpToKeyNameAndCountBullet;
    let countSameNumberOfFifthsUpFromFSharpBullet;
    let countSameNumberOfFourthsUpFromBFlatBullet;
    let itsCBullet;
    let fIsSpecialCaseBullet;
    if (key.type === "minor") {
        correspondingMajorKeyBullet = <li>Corresponderende major key is kleine terts hoger, dus (na vereenvoudiging schrijfwijze) {pointOfReference} majeur.</li>;
    }
    if (pointOfReference === "C") {
        itsCBullet = <li>C majeur, geen voortekening.</li>
        whyThisRuleBullet = <li>Dit moet je vanbuiten leren.</li>
    }
    else if (pointOfReference === "F") {
        fIsSpecialCaseBullet = <li>F is één mol, namelijk Bb.</li>
        whyThisRuleBullet = <li>Dit leer je best vanbuiten.</li>
    }
    else if (!pointOfReference.endsWith("b")) {
        whyThisRuleBullet = <li>Deze eindigt niet op een mol en is niet F.</li>
        let fifths: string[] = [];
        let currentNote = "C";
        while (Note.simplify(currentNote) !== pointOfReference && Note.enharmonic(Note.simplify(currentNote)) !== pointOfReference) {
            let nextNote = Note.transpose(currentNote, '5P');
            fifths.push(`${currentNote} -> ${nextNote}`);
            currentNote = nextNote;
        }
        countFifthsUpToKeyNameAndCountBullet = <li>Tel het aantal reine kwinten om vanaf C tot {pointOfReference} te raken. Zo veel kruisen heb je nodig. Deze kwinten zijn {fifths.join(", ")}, dus {fifths.length} kwinten in totaal.</li>
        // TODO: sequentie van dat aantal kwinten vanaf F# opbouwen
        countSameNumberOfFifthsUpFromFSharpBullet = <li>Tel dus {fifths.length} kruisen door te stijgen in kwinten vanaf F#.</li>
    }
    else {
        whyThisRuleBullet = <li>Deze eindigt op een mol.</li>
        let fourths: string[] = [];
        let currentNote = "C";
        while (Note.simplify(currentNote) !== pointOfReference && Note.enharmonic(Note.simplify(currentNote)) !== pointOfReference) {
            let nextNote = Note.transpose(currentNote, '4P');
            fourths.push(`${currentNote} -> ${nextNote}`);
            currentNote = nextNote;
        }
        countFourthsUpToKeyNameAndCountBullet = <li>Tel het aantal reine kwarten om vanaf C tot {pointOfReference} te raken. Zo veel mollen heb je nodig. Deze kwarten zijn {fourths.join(", ")}, dus {fourths.length} kwarten in totaal.</li>
        // TODO: sequentie van dat aantal kwarten vanaf Bb opbouwen
        countSameNumberOfFourthsUpFromBFlatBullet = <li>Tel dus {fourths.length} mollen door te stijgen in kwarten vanaf Bb.</li>
    }
    return <>
        <p>{key.keySignature}</p>
        <ul>
            {correspondingMajorKeyBullet}
            {itsCBullet}
            {fIsSpecialCaseBullet}
            {whyThisRuleBullet}
            {countFifthsUpToKeyNameAndCountBullet}
            {countFourthsUpToKeyNameAndCountBullet}
            {countSameNumberOfFifthsUpFromFSharpBullet}
            {countSameNumberOfFourthsUpFromBFlatBullet}
        </ul>
    </>
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