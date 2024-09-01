import mongoose, { Schema } from 'mongoose';

export const ConversationSchema = new Schema(
  {
    participants: [{ type: Schema.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.ObjectId, ref: 'Message', default: [] }],
  },
  {
    timestamps: true,
  },
);

export const Conversation = mongoose.model('Conversation', ConversationSchema);
