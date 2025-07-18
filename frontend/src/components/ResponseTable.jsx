const ResponseTable = ({ form, responses }) => {
  if (!responses?.length) return <p>No responses yet.</p>;

  const questionHeaders = form.questions.map((q) => q.questionText);

  return (
    <div className="overflow-x-auto mt-4 border rounded">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            {questionHeaders.map((q, i) => (
              <th key={i} className="p-2 border">
                {q}
              </th>
            ))}
            <th className="p-2 border">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((res, idx) => (
            <tr key={res._id} className="border-t">
              <td className="p-2 border">{idx + 1}</td>
              {res.answers.map((ans, i) => (
                <td key={i} className="p-2 border">
                  {ans.answer}
                </td>
              ))}
              <td className="p-2 border">
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
