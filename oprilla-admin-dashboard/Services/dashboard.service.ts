export interface ChatMessage {
sender: string;
message: string;
}

export const getConversationTranscript = (): ChatMessage[] => {
return [
{
sender: "AI Assistant",
message:
"Good afternoon. Thank you for calling Maitre D' Pro Bistro. How may I assist you with your reservation today?",
},
{
sender: "Customer",
message:
"Hi, I'd like to reserve a table for four people this evening.",
},
{
sender: "AI Assistant",
message:
"Certainly. We have availability tonight. What time would you prefer?",
},
{
sender: "Customer",
message:
"Around 8:00 PM would be perfect.",
},
{
sender: "AI Assistant",
message:
"Wonderful. I can reserve a table for four at 8:00 PM. Would you prefer indoor seating or a booth?",
},
{
sender: "Customer",
message:
"A booth would be great if one is available.",
},
{
sender: "AI Assistant",
message:
"Absolutely. I've reserved a booth table for four guests at 8:00 PM this evening.",
},
{
sender: "Customer",
message:
"Perfect, thank you very much.",
},
{
sender: "AI Assistant",
message:
"You're welcome. Your reservation has been confirmed. We look forward to serving you tonight. Have a wonderful day!",
},
];
};
