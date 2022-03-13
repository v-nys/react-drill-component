import './App.css';
import Select from 'react-select';
import { Drill } from './Drill';
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
  chordTypes: []
}

// hoe configuratie mogelijk maken?
// maak er ook component voor, bv. ChordDrillConfigurationForm
// de state hiervan moet uiteindelijk toegankelijk zijn voor de questionProducer functie...
// kan gewoon volledige state ervan in app zetten en dan naar beneden passeren?
// nadeel: drill zal rerenderen zodra iets wijzigt
// dus beter ref?

// TODO: kan ik union type omzetten naar lijst van mogelijke waarden?
const rootStrings: StringNumber[] = _.range(5, 7);
const tonics: Note[] = ['A', 'A♯', 'A♭'];
const chordTypes: ChordType[] = ["major", "minor"];
const chordConfigurations: RandomChordDrillInput[] = rootStrings.flatMap(
  (rootString) => tonics.flatMap(
    (tonic) => chordTypes.map(
      (chordType) => {
        return { rootString, tonic, chordType }
      })));

function ChordDrillConfigurationForm() {
  return (
    <>
      <Select options={rootStrings.map((n) => { return {value: n, label: n} })} isMulti></Select>
      <Select options={tonics.map((t) => { return {value: t, label: t} })} isMulti></Select>
      <Select options={chordTypes.map((ct) => { return {value: ct, label: ct} })} isMulti></Select>
    </>
  )
}

function App() {
  /* wat kan ik hier doen?
   * ik wil dat de questionProducer de ingestelde values van ChordDrillConfigurationForm gebruikt
   * optie om de state in App te zetten en te laten wijzigen in ChordDrillConfigurationForm?
   * maar dat zorgt dan voor een rerender van het geheel
   * en de drill switcht meteen
   */
  
  return (
    <>
      <ChordDrillConfigurationForm />
      <Drill
        questionProducer={() => chordConfigurations[Math.floor(Math.random() * chordConfigurations.length)]}
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