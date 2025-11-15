import React from 'react';
import { Question, QuestionOption } from '../types';

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: string | null;
  onSelectOption: (option: QuestionOption) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
}) => {
  const getButtonClass = (option: QuestionOption) => {
    if (!selectedOption) {
      return "bg-white hover:bg-sky-100 text-sky-800";
    }

    const isSelected = selectedOption === option.text;

    if (isSelected) {
      return option.isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white";
    }
    
    return "bg-gray-300 text-gray-600 cursor-not-allowed";
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-2xl transform transition-all duration-500">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500">
          Câu {questionNumber} / {totalQuestions}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-2">
          {question.text.split('____')[0]}
          <span className="inline-block bg-slate-200 rounded-md px-4 py-1 mx-2 text-slate-200">
            blank
          </span>
          {question.text.split('____')[1]}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectOption(option)}
            disabled={!!selectedOption}
            className={`w-full p-4 rounded-lg text-left text-lg font-semibold transition-colors duration-300 shadow-sm ${getButtonClass(option)}`}
            aria-label={`Option ${String.fromCharCode(65 + index)}: ${option.text}`}
          >
            <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;