"use client";

import ChatBubble from "./ChatBubble";
import { ConversationTranscript } from "../app/dashboard/services/dashboardService";
import { useConversationTranscript } from "../hooks/useDashboard";

export default function ConversationSection() {
  const { conversations } = useConversationTranscript();

  return (
    <div className="w-full bg-white border border-[#E6E1DA] rounded-xl p-4 md:p-6 overflow-hidden">
      <h2 className="text-lg md:text-xl font-bold text-[#1F2937] mb-4">
        Conversation Transcript
      </h2>

      <div className="space-y-3">
        {conversations.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No conversation found
          </p>
        ) : (
          conversations.map((conversation: ConversationTranscript) => (
            <ChatBubble
              key={conversation.id}
              sender={conversation.speaker}
              message={conversation.message}
            />
          ))
        )}
      </div>
    </div>
  );
}