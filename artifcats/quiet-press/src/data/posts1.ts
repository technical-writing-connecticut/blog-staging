export type InlinePart =
  | { type: 'text'; value: string }
  | { type: 'em'; value: string }
  | { type: 'strong'; value: string }
  | { type: 'code'; value: string };

export type ContentBlock =
  | { type: 'paragraph'; parts: InlinePart[] }
  | { type: 'heading'; value: string }
  | { type: 'quote'; value: string; cite?: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; language: string; filename?: string; value: string };

export type PostStatus = 'published' | 'draft';

export type Post = {
  slug: string;
  title: string;
  dek: string;
  content: ContentBlock[];
  status: PostStatus;
  author: string;
  readTime: number;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
};

const p = (...parts: InlinePart[]): ContentBlock => ({ type: 'paragraph', parts });
const heading = (value: string): ContentBlock => ({ type: 'heading', value });

export const posts: Post[] = [
  {
    slug: 'attention-is-a-place',
    title: 'Attention is a place',
    dek: 'A small argument for making the work easier to return to.',
    status: 'published',
    author: 'Mara Ellison',
    readTime: 7,
    tags: ['Work', 'Rituals'],
    publishedAt: '2024-06-12',
    updatedAt: '2024-06-12',
    content: [
      p({ type: 'text', value: 'The best workspaces I have known were not impressive. They were easy to find your way around. A lamp, a clear patch of table, the same notebook opened to the next page. Nothing asked to be admired before the work began.' }),
      p({ type: 'text', value: 'We tend to speak about attention as if it were an amount we carry around: more on a good day, less on a bad one. I have found it more useful to think of attention as a place. Places have entrances. They have weather. They can be made welcoming.' }),
      heading('The entrance'),
      p({ type: 'text', value: 'A place for attention begins with a visible next step. Not a goal, exactly — goals are too far away to be hospitable — but the first physical gesture. Put the document on the desk. Write the question at the top of the page. Open the file you promised yourself you would open.' }),
      p({ type: 'text', value: 'When the next step is hidden inside a cloud of intentions, beginning feels like a character test. When it is visible, beginning is just a matter of arrival.' }),
      { type: 'quote', value: 'The room does not need to be beautiful. It needs to make the next kind thing obvious.', cite: 'A note from the margin' },
      heading('The weather'),
      p({ type: 'text', value: 'Attention has weather because we are not machines. Some days are bright and quick; some arrive already overcast. A humane system does not require the same output in every climate. It changes the size of the work without changing its dignity.' }),
      p({ type: 'text', value: 'On a difficult afternoon, I use a twenty-minute version of the practice: one question, one source, one paragraph. It is small enough to start and real enough to leave a mark. Often, that mark is where tomorrow begins.' }),
      { type: 'code', language: 'ts', filename: 'twenty-minute-practice.ts', value: `type SmallPractice = {
  question: string;
  source: string;
  paragraph: string;
};

export function beginSmall(question: string): SmallPractice {
  return {
    question,
    source: 'one useful source',
    paragraph: 'one honest paragraph',
  };
}` },
      heading('The return'),
      p({ type: 'text', value: 'The measure of a good practice is not how much it extracts. It is how gently it lets you come back. Leave a sentence unfinished. Name the open thread. Put the materials where your future self can see that there is still a way in.' }),
      p({ type: 'text', value: 'Attention is not a resource to defend from the world. It is a room we can keep arranging — one deliberate object at a time.' }),
    ],
  },
  {
    slug: 'tiny-systems-for-the-long-middle',
    title: 'Tiny systems for the long middle',
    dek: 'What to do when the exciting beginning is over and the finish line is still a rumor.',
    status: 'published',
    author: 'Mara Ellison',
    readTime: 9,
    tags: ['Work', 'Making'],
    publishedAt: '2024-05-28',
    updatedAt: '2024-06-02',
    content: [
      p({ type: 'text', value: 'Most projects do not fail at the beginning. The beginning has its own electricity. They fail somewhere in the long middle, where progress becomes less visible and the original promise has stopped doing the motivating.' }),
      p({ type: 'text', value: 'I like small systems here. Not productivity systems, exactly. More like handrails: modest rules that reduce the number of decisions required to keep going.' }),
      heading('A system should be smaller than your ambition'),
      p({ type: 'text', value: 'The system is not the project. This distinction matters. If the ritual needs its own dashboard, it has quietly become a second project with a very convincing excuse.' }),
      p({ type: 'text', value: 'For a writing project, my smallest useful loop looks like this: make one visible change, leave one note about what comes next, close the file. In code, the same idea might be a tiny function that makes the next state explicit:' }),
      { type: 'code', language: 'ts', filename: 'next-step.ts', value: `type Session = {\\n  changed: boolean;\\n  next: string;\\n};\\n\\nexport function closeSession(next: string): Session {\\n  return { changed: true, next: next.trim() };\\n}` },
      p({ type: 'text', value: 'It is not clever. That is part of its job. The function gives tomorrow a handle instead of giving today another opportunity to optimize.' }),
      heading('Keep a little evidence'),
      p({ type: 'text', value: 'The middle is easier to cross when you can see that you have crossed some of it. Keep evidence close to the work: a short changelog, a folder of discarded sketches, a list of questions that have become less fuzzy.' }),
      { type: 'list', items: ['Record decisions, not just deliverables.', 'Make unfinished work easy to recognize.', 'Review the trail once a week, without turning it into a performance review.'] },
      heading('Let the system end'),
      p({ type: 'text', value: 'A good handrail is temporary. When the work becomes fluent, remove the scaffolding. The aim is not to become the kind of person who maintains a system; it is to make the thing you care about a little easier to continue.' }),
    ],
  },
  {
    slug: 'the-useful-edge-of-uncertainty',
    title: 'The useful edge of uncertainty',
    dek: 'A practical note on leaving a little room for the answer to change.',
    status: 'published',
    author: 'Mara Ellison',
    readTime: 6,
    tags: ['Thinking', 'Notes'],
    publishedAt: '2024-05-09',
    updatedAt: '2024-05-09',
    content: [
      p({ type: 'text', value: 'Certainty is comfortable, but it is a poor place to notice anything new. The most interesting part of a problem is often the slim border where what we know stops being sufficient.' }),
      p({ type: 'text', value: 'This is not an argument for indecision. A decision can be firm while the explanation around it remains provisional. The trick is to mark the difference.' }),
      heading('Name the shape of the unknown'),
      p({ type: 'text', value: '“I do not know” is honest but broad. “I do not know whether the constraint is technical or social” is more useful. Specific uncertainty creates a next question; vague uncertainty becomes atmosphere.' }),
      { type: 'quote', value: 'Questions are not a tax on progress. They are how progress keeps its bearings.', cite: 'Field note, Tuesday morning' },
      heading('Leave a door, not a hole'),
      p({ type: 'text', value: 'When I write a plan, I now add one sentence called “what could change this.” It keeps the plan from pretending to be a prophecy. It also tells collaborators where to bring new information.' }),
      p({ type: 'text', value: 'The result is a document that can move. It has a spine, but it is not brittle.' }),
    ],
  },
  {
    slug: 'a-note-on-finished-work',
    title: 'A note on finished work',
    dek: 'The quiet relief of putting a boundary around something you made.',
    status: 'published',
    author: 'Mara Ellison',
    readTime: 5,
    tags: ['Making', 'Notes'],
    publishedAt: '2024-04-21',
    updatedAt: '2024-04-21',
    content: [
      p({ type: 'text', value: 'Finished is a practical word. It does not mean perfect, definitive, or beyond improvement. It means the work has crossed the line you drew for it and can now be met by someone other than you.' }),
      p({ type: 'text', value: 'Without that line, making can become an endless, private weather system. Everything remains almost ready. Every decision can be reopened. The work never gets the chance to have a life outside its maker.' }),
      heading('A boundary is part of the craft'),
      p({ type: 'text', value: 'Before I begin, I try to write down what “done for now” will look like. Three pages. A clear example. A version that a thoughtful stranger can use. The boundary is not a compromise with quality; it is what gives quality somewhere to land.' }),
      p({ type: 'text', value: 'Then I stop. I send the thing. I make tea. The small ceremony matters because it teaches the nervous system that completion is safe.' }),
    ],
  },
];

export function getPost(slug?: string) {
  return posts.find((post) => post.slug === slug);
}
