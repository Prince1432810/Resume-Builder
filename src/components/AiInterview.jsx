const AiInterview = () => {
    return (
        <div className="flex flex-col lg:flex-row w-full lg:h-auto bg-white border border-gray-200 rounded-md">
            <div className="sm:lg:w-[30%] lg:h-auto">
                <img
                    className="h-full w-full mr-5 object-cover rounded-md"
                    src="https://www.ttnews.com/sites/default/files/2023-09/iTECH-Dysart-1200.jpg"
                    alt=""
                />
            </div>
            <div className="flex flex-col w-full lg:w-[70%] mb-15 p-4">
                <strong className="text-2xl mb-2">AI Mock Interview</strong>
                <p className="text-gray-500 text-sm mb-2">
                    Assess your skills, communication, and confidence in
                    real-time. Receive instant, actionable feedback to identify
                    strengths and weaknesses, refine your performance, and
                    continuously improve your interview readiness for career
                    success.
                </p>
                <button className="bg-[#3985b6] p-2  rounded-md text-white w-fit pl-10 pr-10 text-sm font-semibold active:bg-[#4898ce]">
                    Start Mock Interview
                </button>
            </div>
        </div>
    );
};

export default AiInterview;
