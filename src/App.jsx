import { useState } from 'react'

function App() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [poll, setPoll] = useState(null); //store submitted poll
  const [votes, setVotes] = useState([]); //Votes for each option

  const handleChange = (e) => {
    setQuestion(e.target.value)
  }

  const handleOptionChange = (index, value) => {
    const updateOptions = [...options];
    updateOptions[index] = value;
    setOptions(updateOptions);
  }

  const removeOption = (index) => {
    const updateOptions = options.filter((prev, i) => i != index);
    setOptions(updateOptions);
  }

  const addOption = () => {
    setOptions([...options, ""]);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!question.trim() || options.some((opt) => !opt.trim())) {
      alert("Question and all options must be filled!");
      return;
    }
    setPoll({ question, options });
    setVotes(new Array(options.length).fill(0)); // Initialize votes
    setQuestion(""); // Reset question
    setOptions(["", ""]); // Reset options
  };

  const handleVote = (index) => {
    const updateVotes = [...votes];
    updateVotes[index]++;
    setVotes(updateVotes);
  }

  return (
    <>
      <div>
        <h2 className='fixed top-0 left-0 w-full bg-blue-800 text-white text-center p-2 font-semibold text-lg'>Polling App</h2>
        <div className="flex flex-col justify-start px-3 items-start mt-16">
          <h2 className='text-xl mb-3'>Ask a Question...!</h2>

          {/* input a question*/}
          <form onSubmit={handleSubmit} className='ml-3'>
            <label className='' htmlFor="textInput" style={{ marginRight: "10px" }}>
              Enter Question:
            </label>
            <input
              type="text"
              id="textInput"
              value={question}
              onChange={handleChange}
              placeholder="Type something..."
              className="p-2 text-sm mr-2.5 w-64 border rounded"
            />

            {/* Dynamic options */}
            <div>
              <label className="block mb-2">Options:</label>
              {
                options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="p-2 border rounded w-full mr-2"
                    />

                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))
              }

              <button
                type="button"
                onClick={addOption}
                className="mt-2 text-blue-500 pb-3"
              >
                + Add Option
              </button>

            </div>

            <button type="submit" className="p-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Poll
            </button>
          </form>

          {/* Display poll */}
          {
            poll && (
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">{poll.question}</h2>
                <ul className="space-y-2">
                  {poll.options.map((option, index) => (
                    <li key={index} className="flex items-center">
                      <button
                        onClick={() => handleVote(index)}
                        className="text-gray-800 p-2 px-4 bg-gray-200 rounded hover:bg-gray-300 mr-2"
                      >
                        {option}
                      </button>
                      <span className="text-gray-400">{votes[index]} votes</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) 
          }
        </div>
      </div>
    </>
  )
}

export default App
