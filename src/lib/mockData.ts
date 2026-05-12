export const userProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@careerpilot.ai",
  title: "Full Stack Developer",
  avatar: "AM",
  resumeScore: 87,
  verifiedSkills: 8,
  testPerformance: 92,
  recommendedJobs: 24,
};

export const extractedResume = {
  name: "Alex Morgan",
  email: "alex.morgan@careerpilot.ai",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  education: [
    { degree: "M.S. Computer Science", school: "Stanford University", year: "2022" },
    { degree: "B.S. Software Engineering", school: "UC Berkeley", year: "2020" },
  ],
  experience: [
    { role: "Senior Frontend Engineer", company: "Lumen Labs", period: "2023 — Present" },
    { role: "Full Stack Developer", company: "Nimbus AI", period: "2021 — 2023" },
  ],
  certifications: ["AWS Solutions Architect", "Google Cloud Professional", "MongoDB Developer"],
};

export type Skill = {
  name: string;
  category: "Technical" | "Soft" | "Cloud" | "Data";
  confidence: number;
  verified: boolean;
};

export const extractedSkills: Skill[] = [
  { name: "Python", category: "Technical", confidence: 94, verified: true },
  { name: "React", category: "Technical", confidence: 96, verified: true },
  { name: "TypeScript", category: "Technical", confidence: 91, verified: true },
  { name: "Node.js", category: "Technical", confidence: 88, verified: true },
  { name: "AWS", category: "Cloud", confidence: 76, verified: false },
  { name: "Docker", category: "Cloud", confidence: 82, verified: true },
  { name: "Machine Learning", category: "Data", confidence: 71, verified: false },
  { name: "SQL", category: "Data", confidence: 89, verified: true },
  { name: "GraphQL", category: "Technical", confidence: 78, verified: true },
  { name: "Leadership", category: "Soft", confidence: 85, verified: true },
];

export const skillsAnalytics = [
  { name: "Frontend", score: 94 },
  { name: "Backend", score: 86 },
  { name: "Cloud", score: 72 },
  { name: "Data", score: 80 },
  { name: "DevOps", score: 78 },
  { name: "Soft Skills", score: 88 },
];

export const testScoreTrend = [
  { month: "Jan", score: 62 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 74 },
  { month: "Apr", score: 79 },
  { month: "May", score: 85 },
  { month: "Jun", score: 92 },
];

export const careerProgress = [
  { stage: "Resume", value: 100 },
  { stage: "Skills", value: 90 },
  { stage: "Verified", value: 78 },
  { stage: "Tests", value: 92 },
  { stage: "Interviews", value: 65 },
  { stage: "Offers", value: 40 },
];

export const notifications = [
  { title: "New job match: Senior React Engineer", time: "2m ago", type: "job" },
  { title: "Your AWS skill test is ready", time: "1h ago", type: "test" },
  { title: "Resume score increased by 5 points", time: "3h ago", type: "score" },
  { title: "Interview scheduled with Lumen Labs", time: "1d ago", type: "interview" },
];

export const aiSuggestions = [
  "Take the AWS verification test to unlock 12 more jobs",
  "Add a portfolio link to boost your resume score",
  "Practice system design — 4 target roles require it",
];

export const mockQuestions = [
  {
    skill: "React",
    question: "Which hook is used to perform side effects in functional components?",
    options: ["useState", "useEffect", "useMemo", "useReducer"],
    answer: 1,
  },
  {
    skill: "React",
    question: "What does the key prop help React do when rendering lists?",
    options: ["Style elements", "Identify items for efficient updates", "Sort items", "Cache items"],
    answer: 1,
  },
  {
    skill: "Python",
    question: "Which data structure is immutable in Python?",
    options: ["list", "dict", "tuple", "set"],
    answer: 2,
  },
  {
    skill: "Python",
    question: "What is the output of len({1,2,2,3})?",
    options: ["2", "3", "4", "Error"],
    answer: 1,
  },
  {
    skill: "AWS",
    question: "Which AWS service is used for serverless functions?",
    options: ["EC2", "Lambda", "RDS", "Route53"],
    answer: 1,
  },
  {
    skill: "AWS",
    question: "Which storage service is best for static website hosting?",
    options: ["EBS", "EFS", "S3", "Glacier"],
    answer: 2,
  },
  {
    skill: "SQL",
    question: "Which clause filters grouped records?",
    options: ["WHERE", "HAVING", "FILTER", "GROUP"],
    answer: 1,
  },
  {
    skill: "TypeScript",
    question: "What keyword creates a type alias in TypeScript?",
    options: ["interface", "type", "alias", "declare"],
    answer: 1,
  },
];

export const jobs = [
  {
    title: "Senior React Engineer",
    company: "Lumen Labs",
    logo: "L",
    location: "Remote · USA",
    salary: "$160k – $190k",
    match: 96,
    tags: ["React", "TypeScript", "GraphQL"],
    trending: true,
  },
  {
    title: "Full Stack Engineer",
    company: "Nimbus AI",
    logo: "N",
    location: "San Francisco, CA",
    salary: "$150k – $180k",
    match: 92,
    tags: ["Node.js", "React", "AWS"],
  },
  {
    title: "Frontend Architect",
    company: "Vertex Studio",
    logo: "V",
    location: "Remote · EU",
    salary: "$140k – $170k",
    match: 89,
    tags: ["React", "TypeScript", "Design Systems"],
    trending: true,
  },
  {
    title: "Platform Engineer",
    company: "Orbit Cloud",
    logo: "O",
    location: "New York, NY",
    salary: "$155k – $185k",
    match: 84,
    tags: ["Docker", "Node.js", "SQL"],
  },
  {
    title: "ML Engineer (Junior)",
    company: "Synapse Health",
    logo: "S",
    location: "Boston, MA",
    salary: "$130k – $160k",
    match: 76,
    tags: ["Python", "ML", "SQL"],
  },
  {
    title: "DevOps Engineer",
    company: "Quanta Systems",
    logo: "Q",
    location: "Remote · Global",
    salary: "$140k – $175k",
    match: 81,
    tags: ["AWS", "Docker", "CI/CD"],
  },
];
