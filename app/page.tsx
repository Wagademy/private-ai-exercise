'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

enum PrivacyLevel {
  NO_PRIVACY = 'no-privacy',
  ONLINE_PRIVACY = 'online-privacy',
  LOCAL_PRIVACY = 'local-privacy'
}

const apiEndpoints: Record<PrivacyLevel, string> = {
  [PrivacyLevel.NO_PRIVACY]: '/api/openai/chat',
  [PrivacyLevel.ONLINE_PRIVACY]: '/api/private/chat',
  [PrivacyLevel.LOCAL_PRIVACY]: '/api/local/chat'
};

const privacyAvatars: Record<PrivacyLevel, string> = {
  [PrivacyLevel.NO_PRIVACY]: '🌐',
  [PrivacyLevel.ONLINE_PRIVACY]: '🔒',
  [PrivacyLevel.LOCAL_PRIVACY]: '💻'
};

export default function Chat() {
  const [privacyLevel, setPrivacyLevel] = useState<PrivacyLevel>(PrivacyLevel.NO_PRIVACY);
  
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: apiEndpoints[privacyLevel],
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Privacy Level
        </label>
        <div className="flex flex-col space-y-2">
          <input
            type="range"
            min="0"
            max="2"
            value={Object.values(PrivacyLevel).indexOf(privacyLevel)}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setPrivacyLevel(Object.values(PrivacyLevel)[value]);
            }}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            {Object.values(PrivacyLevel).map((level) => (
              <div key={level} className="flex items-center space-x-1">
                <span className="text-xl">{privacyAvatars[level]}</span>
                <span>{level === 'no-privacy' ? 'No Privacy' : 
                       level === 'online-privacy' ? 'Online Privacy' : 
                       'Local Privacy'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}