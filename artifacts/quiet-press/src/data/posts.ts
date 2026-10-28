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
  content?: ContentBlock[];
  markdown?: string;
  status: PostStatus;
  author: string;
  readTime: number;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
};

const p = (...parts: InlinePart[]): ContentBlock => ({ type: 'paragraph', parts });
const heading = (value: string): ContentBlock => ({ type: 'heading', value });

export const posts = [

    {
    slug: 'technical-writers-builders',
    title: 'To Write with or without AI? It Depends',
    dek: 'It’s a real 2026 questions, especially for someone who usually writes for a living.',
    status: 'published',
    author: 'Jay',
    readTime: 7,
    tags: ['Docs', 'APIs'],
    publishedAt: '2026-10-21',
    updatedAt: '2026-10-21',
    markdown: `

Lately, I have been thinking about writing with and without AI. It’s a real 2026 question, especially for someone who usually writes for a living. When should I use an LLM to generate text, and when should I write something the old-fashioned way? If I use an LLM, will I gain a new perspective or will I lose a perspective? Would I have learned more had I wrote it myself? There are no easy answers.
When I think about writing, I remember a few things from my school days that I still carry with me. One is that writing is a process. You draft, and then you revise and revise again. Another is that you outline before you write. Anyone remember those old five-paragraph essays? But here’s the thing: Even the best laid plans don’t go according to plan. Or, rather, sometimes the best laid plans don’t go to plan, and it actually works out better that way.
Many times I will start with an outline of an article or essay only to learn something along the way that takes me in another direction. That is because writing is as much about getting words on the page as it is about thinking. By writing, you have the opportunity to think through an idea as you place the words on the page. And that idea is a real living thing that evolves over the time you work with it. However, some of that is lost when you enter a prompt. 
Sure, you can continue chatting with the LLM and refine your approach after you see what the model generates. But, because you are not the one doing most of the work “generating” the text, something might be lost. Well, what is lost is the journey, and the chat just brings you to the destination. That being said, not every writing process needs to be a journey, and chat is good at creating some text.
Technical Documentation
Chat excels at creating the first draft of highly structured and concrete ideas. Software documentation is an excellent example of that. Software code is concrete. Software works through defined pre-determined paths.  Developers code the features defined by product managers. Predictable, no, and that is where writers come in with the second and third draft. But the first pass created by chat is a good starting point.
Here, chat saves time by developing documentation that is 80 or 90 percent there. It’s a meaningful start based on the predictable inputs of specs that product or engineering outlined and other source material available at the time of writing. But, of course, the work doesn’t stop there. And that’s the key point to remember, the draft here is just the beginning, even if the beginning brings you closer to the finish line.
Technical writers have the in-depth product knowledge combined with the human brain. We know how software should work and how people will use software based on our human ways of experiencing the UI or developer tools. So, when the chat creates the first drafts, we are key to testing out the documentation. We not only determine if the steps follow the actual software behavior, but we also determine if the software is actually behaving as expected. If any bugs need to be fixed, we report them to the product manager or developer.
Beyond first drafts, what are some use cases where technical writers can work with LLMs – and excel?
__Definitions__
One area where chat excels is definitions. Sometimes I will have a bullet point list of definitions to include in technical documentation. These definitions are well-established industry terms that are specific and don’t change that much over time. In this case, prompting chat to create a one-sentence definition for each bullet point is a major time saver and these definitions usually don’t need to be reworked.
Ideas
Another area where chat excels is creating topics to write about. When I was building my rowing app, I prompted something to the effect of “If you were to create documentation for my app, what articles would you write?” I had already created an article or two about how to import data but I needed to think of more articles that would answer user questions when I was building out the knowledge center. The LLMs recommendations were spot-on, and I had AI write the first drafts of many of the articles.
__Abstract__
But, for ideas that are more abstract, where there are nuances around every corner, where the meaning of every word and every concept is crucially important, that is where the old process of outlining, drafting, revising, revising, and revising is more crucial than ever. Unlike predetermined software flows with define outcomes, here is where the writer might have thought about an idea one way at first only to come to a different conclusion by the end of their journey. 
Now, I fully realize that chat is far more than prompting. There are ways that you can provide so much more context than a prompt ever can. You can create skills.md files, and you can upload examples and documents for additional context. And this works really well for those defined concrete software flows where more information without more human judgement in the drafting process is important.
The questions to ask when deciding between using AI to create a first draft could include: is the idea you are writing about abstract or concrete? And then the next question could be: do I need lots of human judgement in the writing process or will I save time but not lose meaning or important details if I use chat? And the answer might not be the same for similar occasions. Maybe that judgement is hard to make.
We’re all humans, after all.



    `
  },
  

  {
    slug: 'technical-writers-builders',
    title: 'Why Technical Writers Should Be Builders',
    dek: 'Many of the skills that technical writers use to build documentation directly translate to software development.',
    status: 'published',
    author: 'Jay',
    readTime: 7,
    tags: ['Docs', 'APIs'],
    publishedAt: '2026-09-15',
    updatedAt: '2026-09-15',
    markdown: `I remember watching a video back in high school of Kurt Vonnegut explaining the craft of writing. He equated it to the role of an architect building a house. Technical writers, or documentarians as some of us call ourselves, are natural architects. We plan and structure documents. We decide what information the end user (or a developer) needs to know –
and in the order that makes the most sense. Some information might live best in bullet point lists or tables. Other information might live best in paragraphs. Some information, if contained in a screenshot, might not need a written description at all. But before we even begin building our documentation, others have often built the software. Product decided which features to build and in which order. Developers decided how those features would get built and with which technologies.

But for the past few years, and especially now, technical writers who do not have coding experience, or anyone who is not a software developer really, can build their own software with just a prompt. But many of the skills that technical writers use to build documentation directly translate to software development. Which is exactly what I think more technical writers should do. Don’t get me wrong. I don’t expect to build the next Facebook or Google. Whatever software I build will break long before I even get to 10,000 users. I don’t see Artificial Intelligence (AI) as replacing the people that decide *how* to build software. We need software developers and architects for that. But it does a pretty good job at creating the Minimum Viable Product (MVP) or the prototype version. And it has just enough know-how to take any idea and bring it to life –
even if your home page will show a 404 error if your app goes viral.

So, a few reasons why technical writers should be builders:

*	Technical writers have a product mindset, which translates to software development. Many technical writers are, or have been, on product teams. It is, or was, a common home for documentation. Immersed in these teams, many technical writers have a product mindset. We focus on solving real customer problems and think about things like user adoption. Our focus on building documentation is what does a customer need from our company’s software and how will they use it. (Or how they will misuse it!) This skill directly translates to building software – deciding what product managers sometimes do: What does my customer need out of my software, and which features should I build for them?
*	Technical writers know how to organize information and how people want to access it, which is key for data-driven apps. We already decide what steps and procedures customers need to understand reports and dashboards. We are well-adept to translate this skill into which data points they need to review on reports and dashboards and how they should be organized to provide the best user experience. When I built a rowing analytics app, for example, I decided which data points to include on which page. 
*	Software development provides the ability to grow your technical writing chops. Some technical writers have experience in a particular area: For example, someone like me might typically write product announcements or knowledge base pages. But that person might like to grow their developer documentation portfolio. A perfect way to do that is to build your own app and then write your own developer documentation. One advantage to this approach is that an MVP is less complex that a finished commercial software product, so it is naturally easier to wrap your head around the documentation and start with a less complex product. Technical writers can take it one step further by deciding which software to use for documentation and which Content Management System (CMS) displays it.
*	Lastly, software development can be fun and enjoyable – like a hobby. Creating your own software might serve a personal need. For example, I searched around for a directory that would tell me which hotels have rowing machines in their fitness centers. The complicated thing is manufacturers typically list that information, but these listings typically only include hotels that have that brand of equipment. I created a website that would be brand agnostic and list all rowing machines, regardless of manufacturer. And it would be something that I could use when planning my next trip.

Getting started is never easier than before but keeping on going better does get costly. So, if you do decide to start developing your software with Large Language Models (LLMs), choose your model carefully. (Do you really need the latest and greatest model?) Some platforms like Replit have started offering free prompts (up to a certain degree, I think), which avoids spending a few dollars on a prompt that takes a couple of minutes of compute. 

And, I would also recommend planning out your prompts, with the LLM help. Ask an LLM how it would build and structure an app before you start building. Consider which features you would like in your MVP, and which features might be able to wait until a later build. That avoids having to redo or restructure your software when you do end up building, which means you end up prompting less and spending less on tokens.

Have you built software using LLMs? Why do you think that technical writers are well-suited to build software with LLMs? What challenges do technical writers have when building with LLMs? What models have you used to build? How have you saved on compute costs? Let me know in the comments or reach out to me at \`jay@technicalwriting.io\`.`,

  },
  

  {
    slug: 'built-api-to-document',
    title: 'I Built An API to Document One',
    dek: 'I taught myself how to document an API by creating my own as a side project with an agent from Replit.',
    status: 'published',
    author: 'Jay',
    readTime: 7,
    tags: ['Docs', 'APIs'],
    publishedAt: '2026-09-04',
    updatedAt: '2026-09-04',
    markdown: `

    API Documentation. As I look for my next role in technical writing, I read job posting after job posting looking for someone to create developer-facing documentation. Most of my experience in technical writing, up until now, has had a focus of client-facing documentation. Help center articles. Product announcement emails. I crafted sentence after sentence to make complex software easy to use for non-technical (or at least non-developer) audiences. Always from the user interface, never from the API. I recently decided to change that, as I had built some side projects, and I could (or at least Replit could) create APIs out of them.

  ## Keys and Endpoints

    Enter Job Finder. As part of my own job search, I built an aggregation tool to scan company websites for open technical writing, instructional design, developer relations, and adjacent roles. To build the API, I just prompted Replit's AI agent to create one, and then I simply deployed the app again. Easy. Now for the documentation part. I wasn't sure of the best way to document an API, so I asked Replit to create an outline for the documentation but not to fill out the details. I ended up with the following sections:
    
    * Base URL
    * Authentication
    * Quick Start
    * Endpoints
    * Errors
    * Rate Limits
    * Data Freshness
    * Contact
    
    To authenticate with the app, a user would request an API key from me, but, in reality, the API was really meant for my documentation purposes, so I created a key for myself. The user (or I) would authenticate this way:

    \` X-API-Key: YOUR_API_KEY \`

    The API would have a few endpoints, with the goal of pulling job listings from the app. It would also retrieve some statistics like the number of jobs aggregated and from which platform they are sourced. I also added an endpoint for the number of jobs available in each location, which, of course, isn't always 100 percent clear. I documented only GET requests because my goal was to keep the project simple. I only really wanted the API to retrieve data. Any changes I would need to make, like add new target companies, I would likely do through the agent itself.

 
      
  ## Testing The API

  To test the API, I signed up for Postman. The sign-up process was incredibly simple, and I was up and running in no time. (Side note: When I think of Postman, I think of that old song from the 60's.) It was kind of a thrill to do my first API calls and have the API return data like a job posting from Hacker News. I am so used to the end user experience: You just click a button or a link, and data displays in rows and tables. Having the data returned to me in code was something else:

  \`\`\`json

  {
      "jobs": [
          {
              "id": 236,
              "title": "Technical content developer",
              "company": "Klara Systems",
              "platform": "hackernews",
              "location": "Remote",
              "isRemote": true,
              "salaryRaw": null,
              "url": "https://news.ycombinator.com/item?id=49161851",
              "postedAt": "2026-08-03T21:43:16.000Z",
              "scrapedAt": "2026-08-19T20:04:53.339Z",
              "searchTerm": "technical content developer"
          }
       ],
      "total": 1,
      "page": 1,
      "pageSize": 1
  }

  \`\`\`

  To test the less-than-ideal use cases, I made my own mistakes. After all, not everything goes according to plan, and someone newer to APIs like me is prone to make mistakes every now and then. For instance, I tried pulling some information using an endpoint that didn't exist and received:

  \`\`\` 
  {
      "error": {
          "code": "NOT_FOUND",
          "message": "The requested public API endpoint does not exist."
      }
  }
  \`\`\`




  And, of course, I tried submitting a GET request without providing my key and the result was as expected:

  \`\`\` 
  {
      "error": {
          "code": "UNAUTHORIZED",
          "message": "A valid API key is required."
       }
  }
  \`\`\`
  
  ## Lessons

  All in all, I think my first experience with documenting APIs was a success. If I had to take lessons away from it, they would include the following:

  - I would recommend that anyone who wants to gain technical skills beyond what they learned in previous roles is to simply build something for yourself. (This is also advice I have heard echoed through Write the Docs meetups). And then document what you built. It's always more fun to document something in which you have an interest, and documenting a job search API was a perfect fit for someone looking for a job.
  * I would also recommend that you let your AI agent guide you but not do the work for you. Have the AI agent outline the docs but not write them outright. As it is fully capable of writing the dos for me, I instructed it specifically not to do so. This approach provides much-needed structure, while it still allows you to do the work.

  Now that I have shared my experience, I would love to have your feedback. How have you learned how to document APIs? Have you created an app with an API to learn how to create developer documentation? If you are already an API expert, how have you learned something new for technical writing? Are you learning by doing like me, or do you prefer to dive in the docs, a book, or a tutorial? Reach out to me at \`jay@technicalwriting.io\`.`,
  },

];

export function getPost(slug?: string) {
  return posts.find((post) => post.slug === slug);
}
