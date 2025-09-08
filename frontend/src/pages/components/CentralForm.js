
import React from "react";
import '../PredictionPage.css'

const CentralForm = ({ hours, setHours, onNext }) => (
	<div className="prediction-container bg-white rounded-[30px] shadow-2xl p-[40px]">
		<h1 className="text-[22px] font-bold mb-4 text-blue-800">
			Productivity Quiz
		</h1>
		<p className="mb-6 text-gray-700 text-[16px]">
			How many hours did you sleep?
		</p>
		<input
			type="number"
			placeholder="Enter hours..."
			value={hours}
			onChange={(e) => setHours(e.target.value)}
			className="w-full p-[14px] rounded-[12px] text-gray-800 mb-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
		/>
		<button
			onClick={onNext}
			className="w-full bg-blue-600 text-white font-semibold py-[12px] rounded-[12px] hover:bg-blue-700 shadow-md"
		>
			Next
		</button>
	</div>
);

export default CentralForm;