import { Step } from "./types";

export const STEPS_INFO = {
  [Step.IDENTIFY]: {
    title: "Step 1: Unpack the Metaphor",
    description: "Identify the Tenor (Concept) and the Vehicle (Image).",
  },
  [Step.CHARACTERISTICS]: {
    title: "Step 2: Analyze Literal Characteristics",
    description: "Brainstorm the key functions and qualities of the Vehicle.",
  },
  [Step.MAPPING]: {
    title: "Step 3: Map to the Tenor",
    description: "Translate how those characteristics apply to the Concept.",
  },
  [Step.CHALLENGE]: {
    title: "Step 4: Challenge the Metaphor",
    description: "Find where the comparison breaks down, is misleading, or biased.",
  },
  [Step.ALTERNATIVES]: {
    title: "Step 5: Generate Alternatives",
    description: "Create new metaphors that might be more accurate or helpful.",
  },
  [Step.SUMMARY]: {
    title: "Analysis Summary",
    description: "Review your full critical breakdown of the metaphor.",
  },
};

export const EXAMPLE_DATA = {
  originalSentence: "A university degree is a passport to a better job.",
  tenor: "A University Degree",
  vehicle: "A Passport",
  characteristics: [
    { id: 'c1', literal: "It grants you permission to enter a country.", mapped: "It allows entry to the job market / specific career field." },
    { id: 'c2', literal: "It is issued by a governing authority (government).", mapped: "Issued by the university / accreditation body." },
    { id: 'c3', literal: "Without it, you can't legally cross certain borders.", mapped: "Job application requirements often say 'degree required'." },
    { id: 'c4', literal: "It doesn't guarantee a good experience in the new country.", mapped: "A degree gets you in the door but doesn't guarantee success or happiness." },
  ],
  challenges: [
    "Does a passport require four years of demonstrated skill and effort to acquire? (No, you just apply. This ignores the work involved in a degree).",
    "Is a passport tailored to specific destinations? (No, but degrees are highly specialized).",
    "Can you have a fantastic journey without a passport? (Yes, just as you can have a great career without a degree via entrepreneurship/trades).",
    "A passport is just a document. Is a degree the only thing you take away? (No, you also get skills, networks, and growth)."
  ],
  alternatives: [
    "A university degree is a TOOLKIT. (Emphasizes acquired skills)",
    "A university degree is a KEY. (Emphasizes opening specific doors)",
    "A university degree is STRENGTH TRAINING for your mind. (Emphasizes the process of development)"
  ]
};