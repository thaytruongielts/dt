
import React from 'react';
import { IeltsTopic } from '../types';
import { BookOpenIcon, ClipboardListIcon, CodeIcon } from './Icons';

interface TopicDetailsProps {
  topic: IeltsTopic;
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => (
  <div className="bg-slate-800/50 rounded-lg p-4 mb-4 border border-slate-700">
    <h3 className="text-lg font-semibold text-sky-400 flex items-center mb-2">
      {icon}
      <span className="ml-2">{title}</span>
    </h3>
    <div className="text-slate-300 space-y-2">{children}</div>
  </div>
);

const TopicDetails: React.FC<TopicDetailsProps> = ({ topic }) => {
  return (
    <div className="p-4 bg-slate-800 rounded-xl shadow-lg">
      <div className="mb-4">
        <span className="inline-block bg-sky-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-2">
          {topic.Topic}
        </span>
        <h2 className="text-xl font-bold text-slate-100">{topic.Prompt}</h2>
        <p className="text-sm text-slate-400 mt-1">{topic.Vietnamese_Translation}</p>
        <p className="text-xs text-slate-500 mt-2">Type: {topic.Type}</p>
      </div>

      <Section title="Key Vocabulary" icon={<BookOpenIcon className="w-5 h-5" />}>
        <ul className="list-disc list-inside grid grid-cols-2 gap-x-4 gap-y-1">
          {topic.Vocabulary.map((word, index) => (
            <li key={index} className="text-sm">{word}</li>
          ))}
        </ul>
      </Section>
      
      <Section title="Grammar Structures" icon={<CodeIcon className="w-5 h-5" />}>
        <ul className="list-disc list-inside space-y-1">
          {topic.Grammar_Structures.map((structure, index) => (
            <li key={index} className="text-sm">{structure}</li>
          ))}
        </ul>
      </Section>

      <Section title="Sample Answer" icon={<ClipboardListIcon className="w-5 h-5" />}>
        <div className="space-y-3 text-sm">
            <p><strong className="text-sky-400">Introduction:</strong> <span dangerouslySetInnerHTML={{ __html: topic.Sample_Intro }} /></p>
            <p><strong className="text-sky-400">Body 1:</strong> <span dangerouslySetInnerHTML={{ __html: topic.Sample_Body1 }} /></p>
            <p><strong className="text-sky-400">Body 2:</strong> <span dangerouslySetInnerHTML={{ __html: topic.Sample_Body2 }} /></p>
            <p><strong className="text-sky-400">Conclusion:</strong> <span dangerouslySetInnerHTML={{ __html: topic.Sample_Conclusion }} /></p>
        </div>
      </Section>

    </div>
  );
};

export default TopicDetails;
