import { useEffect, useState } from "react";
import NoticeArea from "./components/NoticeArea";
import "./App.css"
import "./css/toggle.css"
import Option from "./components/Option";



function App() {
  const [showResults, setShowResults] = useState(true)
  const [options, setOptions] = useState(["React", "Vue", "Svelte"])
  const [votes, setVotes] = useState([0, 0, 0])
  const [newOption, setNewOption] = useState("");
  const [notice, setNotice] = useState("");
  const [leader, setLeader] = useState("");


  function handleAddOption() {
    if (newOption.trim() === "") {
      setNotice("Please Enter Option Name");
      return;
    }
    setOptions(prevOptions => [...prevOptions, newOption.trim()]);
    setVotes(prevVotes => [...prevVotes, 0]);
    setNewOption("");
    setNotice("");
  }

  function getLeader() {
    const maxVotes = Math.max(...votes);
    votes.filter(v => v === maxVotes).length == 1 ?
      setLeader(`The Leader Is ${options[votes.indexOf(maxVotes)]}`) : setLeader("Its A Tie!")
  }

  useEffect(getLeader, [votes])

  return (
    <div className="app-container">
      <header>
        <h1>Mini Poll</h1>
      </header>
      <div className="app-content">
        <div className="available-filter">
          <div className="filter-controls">
            <div className="toggle-container">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={showResults}
                  onChange={() => setShowResults(!showResults)}
                />
                <span className="slider"></span>
              </label>
              <label>Show Results</label>
            </div>
            <button onClick={() => setVotes(prevVotes => prevVotes.map(() => 0))}>
              Reset Votes
            </button>
          </div>
        </div>
        <div>
          {showResults && options.length>0 && <NoticeArea message={leader} />}
        </div>
        {options.length > 0 ? <div className="options-container">
          {options.map((option, index) => {
            return (
              <Option
                key={index}
                index={index}
                option={option}
                showResults={showResults}
                vote={votes[index]}
                setVotes={setVotes} />
            )
          }) }
        </div> : <NoticeArea message="No Options"/>

        }

        <div className="add-option-container">
          <input
            type="text"
            value={newOption}
            placeholder="Option Name"
            onChange={(e) => setNewOption(e.target.value)} />
          <button onClick={handleAddOption}>+ ADD OPTION</button>
          {notice && <NoticeArea message={notice} />}
        </div>
      </div>
    </div>
  )
}

export default App;
