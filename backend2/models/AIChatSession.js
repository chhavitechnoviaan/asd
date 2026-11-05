const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sessionId: { type: String, required: true },
    title: { type: String, default: "" },
  },
  { timestamps: true },
);
schema.index({ owner: 1, sessionId: 1 }, { unique: true });
schema.index({ sessionId: 1 }, { unique: true });
module.exports =
  mongoose.models.AIChatSession || mongoose.model("AIChatSession", schema);
