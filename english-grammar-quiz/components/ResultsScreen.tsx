import React, { useState } from 'react';
import { Question, UserAnswer } from '../types';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  questions: Question[];
  userAnswers: (UserAnswer | null)[];
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  onRestart,
  questions,
  userAnswers,
}) => {
  const [showReview, setShowReview] = useState(false);
  const finalScore = ((10 * score) / totalQuestions).toFixed(1);

  const getResultColor = () => {
    if (parseFloat(finalScore) >= 8) return 'text-green-500';
    if (parseFloat(finalScore) >= 5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getOptionClass = (question: Question, optionText: string, userAnswer: UserAnswer | null) => {
    const correctOption = question.options.find(o => o.isCorrect)?.text;
    if (optionText === correctOption) {
      return 'bg-green-100 border-green-400 text-green-800';
    }
    if (userAnswer && userAnswer.selectedOption === optionText && !userAnswer.isCorrect) {
      return 'bg-red-100 border-red-400 text-red-800';
    }
    return 'bg-slate-100 border-slate-300';
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
        <h2 className="text-4xl font-bold text-slate-800">Hoàn thành!</h2>
        <p className="text-slate-600 mt-2 text-lg">Bạn đã hoàn thành bài kiểm tra.</p>
        <div className="my-8">
          <p className="text-xl text-slate-700">Điểm của bạn:</p>
          <p className={`text-7xl font-bold my-2 ${getResultColor()}`}>{finalScore.replace('.', ',')}</p>
          <p className="text-slate-500 text-lg">(Thang điểm 10)</p>
          <p className="text-lg text-slate-600 mt-4">
            Bạn đã trả lời đúng {score} / {totalQuestions} câu.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            Làm lại
          </button>
          <button
            onClick={() => setShowReview(!showReview)}
            className="px-8 py-3 bg-slate-200 text-slate-800 font-semibold rounded-lg shadow-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            {showReview ? 'Ẩn đáp án' : 'Xem lại đáp án'}
          </button>
        </div>
      </div>

      {showReview && (
        <div className="mt-8 w-full bg-white p-8 rounded-2xl shadow-lg text-left">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Chi tiết câu trả lời</h3>
          <div className="space-y-6">
            {questions.map((q, index) => (
              <div key={q.id} className="border-b border-slate-200 pb-6">
                <p className="font-semibold text-lg text-slate-700">
                  Câu {index + 1}: {q.text}
                </p>
                <div className="mt-3 space-y-2">
                  {q.options.map(opt => (
                    <div key={opt.text} className={`p-3 border-2 rounded-lg ${getOptionClass(q, opt.text, userAnswers[index])}`}>
                      {opt.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsScreen;