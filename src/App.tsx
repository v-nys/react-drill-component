import './App.css';
import Select from 'react-select';
import { Drill } from './Drill';
import { useEffect, useState } from 'react';
const _ = require('lodash');

type StringNumber = 2 | 3 | 4 | 5 | 6;
type Note = 'A' | 'A♯' | 'A♭' | 'B';
type ChordType = 'major' | 'minor';

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

// TODO: kan ik union type omzetten naar lijst van mogelijke waarden?
const possibleRootStrings: StringNumber[] = _.range(5, 7);
const possibleTonics: Note[] = ['A', 'A♯', 'A♭'];
const possibleChordTypes: ChordType[] = ["major", "minor"];
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
    console.log("stellen opnieuw in...")
    props.config.rootStrings = rootStrings;
    props.config.tonics = tonics;
    props.config.chordTypes = chordTypes;
  });
  // TODO: moet state nog gebruiken en instellen, anders zal het niet werken...
  return (
    <>
      <Select
        value={rootStrings.map((n) => { return { value: n, label: n } })}
        options={possibleRootStrings.map((n) => { return { value: n, label: n } })}
        onChange={(multiValue) => setRootStrings(multiValue.map(({value}) => value))}
        isMulti />
      <Select
        value={tonics.map((t) => { return { value: t, label: t } })}
        options={possibleTonics.map((t) => { return { value: t, label: t } })}
        onChange={(multiValue) => setTonics(multiValue.map(({value}) => value))}
        isMulti />
      <Select
        value={chordTypes.map((ct) => { return { value: ct, label: ct } })}
        options={possibleChordTypes.map((ct) => { return { value: ct, label: ct } })}
        onChange={(multiValue) => setChordTypes(multiValue.map(({value}) => value))}
        isMulti />
    </>
  )
}

function App() {
  const config = {
    rootStrings: [...possibleRootStrings],
    tonics: [...possibleTonics],
    chordTypes: [...possibleChordTypes]
  } as ChordDrillConfiguration;
  function producer() {
    let question = chordConfigurations[Math.floor(Math.random() * chordConfigurations.length)];
    while (!(config.chordTypes.includes(question.chordType)) ||
      !(config.rootStrings.includes(question.rootString)) ||
      !(config.chordTypes.includes(question.chordType))) {
      question = chordConfigurations[Math.floor(Math.random() * chordConfigurations.length)];
    }
    return question;
  }
  return (
    <>
      <Drill
        configurationForm={<ChordDrillConfigurationForm config={config} />}
        questionProducer={producer}
        questionRenderer={(question) => <p>{JSON.stringify(question)}</p>}
        answerRenderer={(question) => <p>Test!</p>}
        initialQuestionTime={5000}
        initialAnswerTime={5000}
        minSliderValue={1000}
        maxSliderValue={20000}
      />
    </>
  );
}

export default App;