import mongoose, { Schema } from 'mongoose';

export const MessageSchema = new Schema(
  {
    senderId: { type: Schema.ObjectId, required: true, ref: 'User' },
    receiverId: { type: Schema.ObjectId, required: true, ref: 'User' },
    message: { type: String, required: true },
    conversationId: { type: Schema.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
);

export const Message = mongoose.model('Message', MessageSchema);
