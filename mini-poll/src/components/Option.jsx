import "../css/option.css";
export default function Option(props) {
    return (
        <div className="option-card">
            <h2 className="option-name">{props.option}</h2>
            {props.showResults &&  <h2 className="vote-result">Result: {props.vote}</h2>}
            <button className="vote-button" onClick={() => {
                props.setVotes(prevVotes => prevVotes.map((vote, index) => {
                    return index === props.index ? vote + 1 : vote
                }))
            }}>+</button>
        </div>)
}