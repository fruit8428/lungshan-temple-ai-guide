/**
 * @fileoverview Express Backend AI Router delegating to the unified Semantic Engine
 */
import { evaluateTourRequest } from "../src/core/semanticEngine.js";
import { getDynamicFaqs, addPendingQuestion } from "./pendingStore.js";

export async function handleTourRequest({ action, query, lang = "zh-TW" }) {
  return evaluateTourRequest({
    action,
    query,
    lang,
    dynamicFaqs: getDynamicFaqs(),
    onFlagPending: item => addPendingQuestion(item)
  });
}
