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

// TODO: kan ik unie omzetten naar lijst?
const rootStrings: StringNumber[] = _.range(5, 6);
const tonics : Note[] = ['A', 'A♯', 'A♭'];
const chordTypes : ChordType[] = ["major", "minor"];
const chordConfigurations : RandomChordDrillInput[] = rootStrings.flatMap(
  (rootString) => tonics.flatMap(
    (tonic) => chordTypes.map(
      (chordType) => {
        return { rootString, tonic, chordType } })));

function App() {
  return (
    <>
      <Drill
        data={chordConfigurations}
        questionRenderer={(question) => <></>}
        answerRenderer={(question) => <></>}
        initialQuestionTime={5000}
        initialAnswerTime={5000} />
    </>
  );
}

export default App;