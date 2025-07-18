const ResponseTable = ({ form, responses }) => {
  if (!responses?.length) {
    return (
      <p className="text-gray-400 mt-4">
        No responses submitted for this form yet.
      </p>
    );
  }

  const questionHeaders = form.questions.map((q) => q.questionText);

  return (
    <div className="overflow-x-auto mt-4 rounded-lg shadow border border-cyan-700">
      <table className="min-w-full text-sm text-left bg-gray-800 text-white">
        <thead className="bg-cyan-700 text-white">
          <tr>
            <th className="px-4 py-3 border border-cyan-600">#</th>
            {questionHeaders.map((q, i) => (
              <th
                key={i}
                className="px-4 py-3 border border-cyan-600 whitespace-nowrap"
              >
                {q}
              </th>
            ))}
            <th className="px-4 py-3 border border-cyan-600">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((res, idx) => (
            <tr
              key={res._id}
              className={`${
                idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
              } border-b border-gray-700`}
            >
              <td className="px-4 py-3 border border-gray-700">{idx + 1}</td>
              {res.answers.map((ans, i) => (
                <td key={i} className="px-4 py-3 border border-gray-700">
                  {ans.answer}
                </td>
              ))}
              <td className="px-4 py-3 border border-gray-700 text-gray-400">
                {new Date(res.submittedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponseTable;
