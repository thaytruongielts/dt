
import React, { useState, useCallback } from 'react';
import { WritingStage } from '../types';
import Timer from './Timer';
import { DownloadIcon, RefreshCwIcon } from './Icons';

interface WritingAreaProps {
  onNextTopic: () => void;
  topicTitle: string;
}

const STAGE_CONFIG = {
  [WritingStage.Outline]: { duration: 5 * 60, title: 'Outline Planning' },
  [WritingStage.Introduction]: { duration: 5 * 60, title: 'Introduction' },
  [WritingStage.Body1]: { duration: 10 * 60, title: 'Body Paragraph 1' },
  [WritingStage.Body2]: { duration: 10 * 60, title: 'Body Paragraph 2' },
  [WritingStage.Conclusion]: { duration: 5 * 60, title: 'Conclusion' },
  [WritingStage.Review]: { duration: 5 * 60, title: 'Review & Edit' },
  [WritingStage.Finished]: { duration: 0, title: 'Finished!' },
};

interface TextAreaProps {
    title: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isReadOnly: boolean;
    rows: number;
}

const TimedTextArea: React.FC<TextAreaProps> = ({ title, value, onChange, isReadOnly, rows }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">{title}</label>
            <textarea
                value={value}
                onChange={onChange}
                readOnly={isReadOnly}
                rows={rows}
                className={`w-full p-2.5 bg-slate-800 border rounded-md shadow-sm transition-all
                    ${isReadOnly 
                        ? 'border-slate-700 text-slate-400 cursor-not-allowed bg-slate-800/50' 
                        : 'border-slate-600 text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500'}`}
            />
        </div>
    );
}

const WritingArea: React.FC<WritingAreaProps> = ({ onNextTopic, topicTitle }) => {
  const [stage, setStage] = useState<WritingStage>(WritingStage.Outline);
  const [timerKey, setTimerKey] = useState(Date.now());

  const [outline, setOutline] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [body1, setBody1] = useState('');
  const [body2, setBody2] = useState('');
  const [conclusion, setConclusion] = useState('');
  
  const handleTimeUp = useCallback(() => {
    setStage(prevStage => {
        const nextStage = prevStage + 1;
        if (nextStage < WritingStage.Finished) {
            setTimerKey(Date.now()); // Reset timer for the next stage
            return nextStage;
        }
        return WritingStage.Finished;
    });
  }, []);

  const handleNext = () => {
    setOutline('');
    setIntroduction('');
    setBody1('');
    setBody2('');
    setConclusion('');
    setStage(WritingStage.Outline);
    setTimerKey(Date.now());
    onNextTopic();
  };

  const handleDownload = () => {
    const fullText = `Topic: ${topicTitle}\n\n--- OUTLINE ---\n${outline}\n\n--- INTRODUCTION ---\n${introduction}\n\n--- BODY 1 ---\n${body1}\n\n--- BODY 2 ---\n${body2}\n\n--- CONCLUSION ---\n${conclusion}`;
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ielts-essay-${topicTitle.toLowerCase().replace(/\s/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentConfig = STAGE_CONFIG[stage];
  
  return (
    <div className="p-4 bg-slate-800 rounded-xl shadow-lg space-y-4">
      <div className="text-center p-4 bg-slate-900/50 rounded-lg border border-slate-700">
        <h2 className="text-xl font-bold text-sky-400 mb-3">{currentConfig.title}</h2>
        {stage !== WritingStage.Finished ? (
            <Timer key={timerKey} initialSeconds={currentConfig.duration} onTimeUp={handleTimeUp} />
        ) : (
            <div className="text-center p-6">
                <p className="text-2xl font-bold text-green-400 mb-4">Practice Session Complete!</p>
                <div className="flex justify-center gap-4">
                    <button onClick={handleDownload} className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        <DownloadIcon className="w-5 h-5"/> Download Essay
                    </button>
                    <button onClick={handleNext} className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        <RefreshCwIcon className="w-5 h-5"/> Next Topic
                    </button>
                </div>
            </div>
        )}
      </div>

      <div className="space-y-3">
        <TimedTextArea title="Outline" value={outline} onChange={(e) => setOutline(e.target.value)} isReadOnly={stage !== WritingStage.Outline && stage !== WritingStage.Review && stage !== WritingStage.Finished} rows={4} />
        <TimedTextArea title="Introduction" value={introduction} onChange={(e) => setIntroduction(e.target.value)} isReadOnly={stage !== WritingStage.Introduction && stage !== WritingStage.Review && stage !== WritingStage.Finished} rows={4} />
        <TimedTextArea title="Body Paragraph 1" value={body1} onChange={(e) => setBody1(e.target.value)} isReadOnly={stage !== WritingStage.Body1 && stage !== WritingStage.Review && stage !== WritingStage.Finished} rows={6} />
        <TimedTextArea title="Body Paragraph 2" value={body2} onChange={(e) => setBody2(e.target.value)} isReadOnly={stage !== WritingStage.Body2 && stage !== WritingStage.Review && stage !== WritingStage.Finished} rows={6} />
        <TimedTextArea title="Conclusion" value={conclusion} onChange={(e) => setConclusion(e.target.value)} isReadOnly={stage !== WritingStage.Conclusion && stage !== WritingStage.Review && stage !== WritingStage.Finished} rows={4} />
      </div>
    </div>
  );
};

export default WritingArea;
