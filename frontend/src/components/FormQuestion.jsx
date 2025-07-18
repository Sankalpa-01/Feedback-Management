const FormQuestion = ({ question, index, answer, setAnswer }) => {
  const handleChange = (e) => {
    const updated = [...answer];
    updated[index] = e.target.value;
    setAnswer(updated);
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-2">
        {index + 1}. {question.questionText}
      </label>

      {question.questionType === "text" ? (
        <input
          type="text"
          value={answer[index] || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Your answer"
        />
      ) : (
        <div className="flex flex-col gap-2">
          {question.options.map((opt, i) => (
            <label key={i} className="flex items-center gap-2">
              <input
                type="radio"
                name={`question-${index}`}
                value={opt}
                checked={answer[index] === opt}
                onChange={handleChange}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormQuestion;
