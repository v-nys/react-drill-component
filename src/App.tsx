import './App.css';
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

// TODO: kan ik union type omzetten naar lijst van mogelijke waarden?
const rootStrings: StringNumber[] = _.range(5, 6);
const tonics: Note[] = ['A', 'A♯', 'A♭'];
const chordTypes: ChordType[] = ["major", "minor"];
const chordConfigurations: RandomChordDrillInput[] = rootStrings.flatMap(
  (rootString) => tonics.flatMap(
    (tonic) => chordTypes.map(
      (chordType) => {
        return { rootString, tonic, chordType }
      })));

function App() {
  return (
    <>
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