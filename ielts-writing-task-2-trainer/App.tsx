
import React, { useState, useEffect, useCallback } from 'react';
import { IELTS_TOPICS } from './constants';
import { IeltsTopic } from './types';
import TopicDetails from './components/TopicDetails';
import WritingArea from './components/WritingArea';

const App: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState<IeltsTopic | null>(null);
  const [usedTopicIds, setUsedTopicIds] = useState<Set<number>>(new Set());

  const selectRandomTopic = useCallback(() => {
    let availableTopics = IELTS_TOPICS.filter(topic => !usedTopicIds.has(topic.ID));

    if (availableTopics.length === 0) {
      // All topics have been used, reset the set
      setUsedTopicIds(new Set());
      availableTopics = IELTS_TOPICS;
    }

    const randomIndex = Math.floor(Math.random() * availableTopics.length);
    const newTopic = availableTopics[randomIndex];
    
    setCurrentTopic(newTopic);
    setUsedTopicIds(prevIds => new Set(prevIds).add(newTopic.ID));
  }, [usedTopicIds]);

  useEffect(() => {
    selectRandomTopic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentTopic) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        Loading topic...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <header className="bg-slate-800/50 backdrop-blur-sm p-4 border-b border-slate-700 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-sky-400">
          IELTS Writing Task 2 Trainer
        </h1>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 max-w-screen-2xl mx-auto">
        <div className="lg:h-[calc(100vh-100px)] lg:overflow-y-auto pr-2">
           <TopicDetails topic={currentTopic} />
        </div>
        <div className="lg:h-[calc(100vh-100px)] lg:overflow-y-auto pl-2">
           <WritingArea onNextTopic={selectRandomTopic} topicTitle={currentTopic.Topic} />
        </div>
      </main>
    </div>
  );
};

export default App;
