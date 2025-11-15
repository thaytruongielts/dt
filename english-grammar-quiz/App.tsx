import React, { useState, useCallback, useMemo } from 'react';
import { questions } from './data/questions';
import { QuizState, UserAnswer, QuestionOption } from './types';
import QuizCard from './components/QuizCard';
import ResultsScreen from './components/ResultsScreen';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.NotStarted);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(UserAnswer | null)[]>(
    Array(questions.length).fill(null)
  );

  const score = useMemo(() => {
    return userAnswers.filter(answer => answer?.isCorrect).length;
  }, [userAnswers]);

  const handleStartQuiz = useCallback(() => {
    setQuizState(QuizState.InProgress);
  }, []);

  const handleSelectOption = useCallback((option: QuestionOption) => {
    const isCorrect = option.isCorrect;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex].id,
      selectedOption: option.text,
      isCorrect,
    };
    setUserAnswers(newAnswers);
  }, [currentQuestionIndex, userAnswers]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizState(QuizState.Completed);
    }
  }, [currentQuestionIndex]);

  const handleRestart = useCallback(() => {
    setQuizState(QuizState.NotStarted);
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(null));
  }, []);

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];
  const selectedOptionForCurrent = userAnswers[currentQuestionIndex]?.selectedOption ?? null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-sky-700">
          Luyện tập Ngữ pháp Tiếng Anh
        </h1>
        <p className="text-slate-600 mt-2 text-lg">Đại từ và Tính từ sở hữu</p>
      </header>
      
      <main className="w-full flex-grow flex items-center justify-center">
        {quizState === QuizState.NotStarted && (
          <div className="text-center">
            <p className="text-xl text-slate-700 mb-8">Sẵn sàng để kiểm tra kiến thức của bạn?</p>
            <button
              onClick={handleStartQuiz}
              className="px-10 py-4 bg-sky-600 text-white font-bold text-xl rounded-full shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
            >
              Bắt đầu
            </button>
          </div>
        )}

        {quizState === QuizState.InProgress && (
          <div className="w-full max-w-3xl flex flex-col items-center">
            <div className="w-full mb-4">
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-sky-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}>
                </div>
              </div>
            </div>
            <QuizCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              selectedOption={selectedOptionForCurrent}
              onSelectOption={handleSelectOption}
            />
            {selectedOptionForCurrent && (
              <div className="mt-6 text-center w-full">
                <div className="h-10 mb-2 flex items-center justify-center">
                  <p className={`text-2xl font-bold ${userAnswers[currentQuestionIndex]?.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {userAnswers[currentQuestionIndex]?.isCorrect ? 'Chính xác!' : 'Không chính xác!'}
                  </p>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
                </button>
              </div>
            )}
          </div>
        )}
        
        {quizState === QuizState.Completed && (
          <ResultsScreen 
            score={score}
            totalQuestions={questions.length}
            onRestart={handleRestart}
            questions={questions}
            userAnswers={userAnswers}
          />
        )}
      </main>
    </div>
  );
};

export default App;