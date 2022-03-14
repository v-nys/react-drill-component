import Select from 'react-select';
import { Drill } from '../Components/Drill';
import { useEffect, useState } from 'react';
import GuitarChord from 'react-guitar-chords';

const possibleRootStrings = [2, 3, 4, 5, 6] as const;
const possibleTonics = ['A♭', 'A', 'A♯', 'B♭', 'B', 'C', 'C♯', 'D♭', 'D', 'D♯', 'E♭', 'E', 'F', 'F♯', 'G♭', 'G', 'G♯'] as const;
const possibleChordTypes = ["major", "minor", "dominant 7", "major 7", "minor 7"] as const;

type StringNumber = typeof possibleRootStrings[number];
type Note = typeof possibleTonics[number];
type ChordType = typeof possibleChordTypes[number];

interface RandomChordDrillInput {
  rootString: StringNumber,
  tonic: Note,
  chordType: ChordType
}

interface ChordDrillConfiguration {
  rootStrings: StringNumber[],
  tonics: Note[],
  chordTypes: ChordType[]
}

const chordConfigurations: RandomChordDrillInput[] = possibleRootStrings.flatMap(
  (rootString) => possibleTonics.flatMap(
    (tonic) => possibleChordTypes.map(
      (chordType) => {
        return { rootString, tonic, chordType }
      })));

function ChordDrillConfigurationForm(props: { config: ChordDrillConfiguration }) {
  const [rootStrings, setRootStrings] = useState([...possibleRootStrings]);
  const [tonics, setTonics] = useState([...possibleTonics]);
  const [chordTypes, setChordTypes] = useState([...possibleChordTypes]);
  useEffect(() => {
    props.config.rootStrings = rootStrings;
    props.config.tonics = tonics;
    props.config.chordTypes = chordTypes;
  });
  return (
    <>
      <Select
        value={rootStrings.map((n) => { return { value: n, label: n } })}
        options={possibleRootStrings.map((n) => { return { value: n, label: n } })}
        onChange={(multiValue) => setRootStrings(multiValue.map(({ value }) => value))}
        isMulti />
      <Select
        value={tonics.map((t) => { return { value: t, label: t } })}
        options={possibleTonics.map((t) => { return { value: t, label: t } })}
        onChange={(multiValue) => setTonics(multiValue.map(({ value }) => value))}
        isMulti />
      <Select
        value={chordTypes.map((ct) => { return { value: ct, label: ct } })}
        options={possibleChordTypes.map((ct) => { return { value: ct, label: ct } })}
        onChange={(multiValue) => setChordTypes(multiValue.map(({ value }) => value))}
        isMulti />
    </>
  )
}

function chordForm({ rootString, tonic, chordType }: RandomChordDrillInput) {
  switch (rootString) {
    case 6:
      switch (chordType) {
        case "major":
          return <GuitarChord frets={[1, 1, 2, 3, 3, 1]} />
          break;
      }
      break;
  }
  return <p>Test!</p>
}

function RandomChordDrillPage(props : any) {
    const config = {
      rootStrings: [...possibleRootStrings],
      tonics: [...possibleTonics],
      chordTypes: [...possibleChordTypes]
    } as ChordDrillConfiguration;
    function producer() {
      let question = chordConfigurations[Math.floor(Math.random() * chordConfigurations.length)];
      while (!(config.chordTypes.includes(question.chordType) && config.rootStrings.includes(question.rootString) && config.tonics.includes(question.tonic))) {
        question = chordConfigurations[Math.floor(Math.random() * chordConfigurations.length)];
      }
      return question;
    }
    return (
        <Drill
          configurationForm={<ChordDrillConfigurationForm config={config} />}
          questionProducer={producer}
          questionRenderer={(question) =>
            <ul>
              <li>root string: {question.rootString}</li>
              <li>tonica: {question.tonic}</li>
              <li>akkoordtype: {question.chordType}</li>
            </ul>}
          answerRenderer={chordForm}
          initialQuestionTime={5000}
          initialAnswerTime={5000}
          minSliderValue={1000}
          maxSliderValue={20000}
        />
    );
  }

export default RandomChordDrillPage;