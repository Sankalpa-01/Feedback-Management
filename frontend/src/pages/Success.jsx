const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-cyan-700 text-center">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">Thank you!</h1>
        <p className="text-gray-300 text-lg">
          Your feedback has been submitted successfully.
        </p>
        {/* <a
          href="/"
          className="mt-6 inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-6 py-2 rounded transition"
        >
          Back to Home
        </a> */}
      </div>
    </div>
  );
};

export default Success;
