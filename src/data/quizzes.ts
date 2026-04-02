export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  tech?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timePerQuestion: number;
  questions: Question[];
}

// export interface Quiz {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
//   category: string;
//   tech: string; // ✅ ADD THIS LINE
//   difficulty: "Easy" | "Medium" | "Hard";
//   timePerQuestion: number;
//   questions: Question[];
// }

export interface QuizResult {
  quizId: string;
  quizTitle: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  date: string;
  answers: { questionId: string; selectedIndex: number; correct: boolean }[];
}

export const quizzes: Quiz[] = [
  {
    id: "javascript",
    title: "JavaScript Mastery",
    description: "Closures, prototypes, async/await, and modern ES6+ features.",
    icon: "⚡",
    category: "Frontend",
    difficulty: "Medium",
    timePerQuestion: 30,
    questions: [
      { id: "js1", question: "What is the output of: typeof null?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], correctIndex: 2, explanation: "typeof null returns 'object' — a well-known JavaScript bug since the language's creation." },
      { id: "js2", question: "Which method creates a new array with results of calling a function on every element?", options: ["forEach()", "map()", "filter()", "reduce()"], correctIndex: 1, explanation: "map() creates a new array by applying a function to each element." },
      { id: "js3", question: "What does '===' check?", options: ["Value only", "Type only", "Value and type", "Reference only"], correctIndex: 2, explanation: "Strict equality (===) checks both value AND type without coercion." },
      { id: "js4", question: "What is a closure?", options: ["A way to close a browser window", "A function with access to its outer scope", "A method to end a loop", "A type of error handling"], correctIndex: 1, explanation: "A closure retains access to its lexical scope even when executed outside of it." },
      { id: "js5", question: "What does Promise.all() do?", options: ["Resolves when any promise resolves", "Resolves when all promises resolve", "Rejects all promises", "Creates a new promise"], correctIndex: 1, explanation: "Promise.all() resolves when ALL promises resolve, or rejects if ANY one rejects." },
      { id: "js6", question: "What is event delegation?", options: ["Assigning events to child elements", "Removing event listeners", "Attaching a single handler to a parent element", "Preventing event propagation"], correctIndex: 2, explanation: "Event delegation uses event bubbling to handle events on a parent element." },
      { id: "js7", question: "What is the output of: console.log(0.1 + 0.2 === 0.3)?", options: ["true", "false", "undefined", "NaN"], correctIndex: 1, explanation: "Due to floating-point precision, 0.1 + 0.2 = 0.30000000000000004." },
      { id: "js8", question: "Which ES6 feature allows destructuring?", options: ["let/const", "Arrow functions", "Pattern matching syntax", "Template literals"], correctIndex: 2, explanation: "Destructuring uses pattern matching to extract values from arrays/objects." },
      { id: "js9", question: "What does the spread operator (...) do?", options: ["Compresses arrays", "Expands an iterable into individual elements", "Deletes properties", "Creates generators"], correctIndex: 1, explanation: "The spread operator expands arrays/objects into individual elements, useful for copying and merging." },
      { id: "js10", question: "What is the temporal dead zone (TDZ)?", options: ["A memory leak area", "Period between entering scope and variable declaration for let/const", "A deprecated feature", "A garbage collection phase"], correctIndex: 1, explanation: "TDZ is the period where let/const variables exist in scope but can't be accessed before their declaration." }
    ]
  },
  {
    id: "react",
    title: "React Deep Dive",
    description: "Hooks, component lifecycle, state management, and performance optimization.",
    icon: "⚛️",
    category: "Frontend",
    difficulty: "Hard",
    timePerQuestion: 35,
    questions: [
      { id: "r1", question: "What hook replaces componentDidMount in functional components?", options: ["useState", "useEffect", "useRef", "useMemo"], correctIndex: 1, explanation: "useEffect with an empty dependency array [] runs once after mount." },
      { id: "r2", question: "What is the purpose of React.memo()?", options: ["Memoize calculations", "Skip re-rendering if props haven't changed", "Store component state", "Create memoized callbacks"], correctIndex: 1, explanation: "React.memo() prevents re-renders if props haven't changed (shallow comparison)." },
      { id: "r3", question: "Which hook should you use for expensive calculations?", options: ["useEffect", "useCallback", "useMemo", "useReducer"], correctIndex: 2, explanation: "useMemo memoizes computed values and only recalculates when dependencies change." },
      { id: "r4", question: "What is the Virtual DOM?", options: ["A copy of the browser DOM", "A lightweight JS representation of the real DOM", "A server-side rendering technique", "A CSS optimization"], correctIndex: 1, explanation: "The Virtual DOM is a lightweight JS object tree React uses to diff and batch real DOM updates." },
      { id: "r5", question: "What does useCallback() return?", options: ["A memoized value", "A memoized callback function", "A state variable", "A ref object"], correctIndex: 1, explanation: "useCallback returns a memoized callback that only changes when dependencies change." },
      { id: "r6", question: "How do you share state between deeply nested components?", options: ["Props drilling", "Context API", "Local storage", "CSS variables"], correctIndex: 1, explanation: "Context API passes data through the component tree without manually passing props." },
      { id: "r7", question: "What is a key prop used for in lists?", options: ["Styling list items", "Helping React identify which items changed", "Sorting the list", "Adding event handlers"], correctIndex: 1, explanation: "Keys help React identify which items have changed for efficient reconciliation." },
      { id: "r8", question: "What is Suspense used for?", options: ["Error handling", "Showing fallback while loading", "State management", "Routing"], correctIndex: 1, explanation: "Suspense shows a fallback UI while waiting for async operations like lazy-loaded components." },
      { id: "r9", question: "What is the purpose of useReducer?", options: ["Reduce array size", "Manage complex state with actions/dispatch", "Optimize renders", "Handle side effects"], correctIndex: 1, explanation: "useReducer is an alternative to useState for complex state logic with action-based updates." },
      { id: "r10", question: "What is React's reconciliation algorithm?", options: ["A sorting algorithm", "The process of diffing Virtual DOM trees to update real DOM", "A state management pattern", "A routing strategy"], correctIndex: 1, explanation: "Reconciliation is React's algorithm for comparing Virtual DOM trees and efficiently updating the real DOM." }
    ]
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Arrays, trees, graphs, sorting, and algorithmic complexity.",
    icon: "🧮",
    category: "CS Fundamentals",
    difficulty: "Hard",
    timePerQuestion: 40,
    questions: [
      { id: "dsa1", question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correctIndex: 1, explanation: "Binary search halves the search space each step, giving O(log n)." },
      { id: "dsa2", question: "Which data structure uses LIFO ordering?", options: ["Queue", "Stack", "Linked List", "Heap"], correctIndex: 1, explanation: "A Stack uses Last-In-First-Out (LIFO)." },
      { id: "dsa3", question: "What is the worst-case time complexity of quicksort?", options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], correctIndex: 1, explanation: "Quicksort's worst case is O(n²) with poor pivot selection." },
      { id: "dsa4", question: "Which traversal visits the root node first?", options: ["Inorder", "Preorder", "Postorder", "Level order"], correctIndex: 1, explanation: "Preorder: Root → Left → Right." },
      { id: "dsa5", question: "What is a hash collision?", options: ["When a hash function fails", "When two keys map to the same index", "When the hash table is full", "When a key is not found"], correctIndex: 1, explanation: "A hash collision occurs when two different keys produce the same hash value." },
      { id: "dsa6", question: "What data structure is best for BFS?", options: ["Stack", "Queue", "Heap", "Array"], correctIndex: 1, explanation: "BFS uses a Queue (FIFO) to process nodes level by level." },
      { id: "dsa7", question: "What is the space complexity of merge sort?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correctIndex: 2, explanation: "Merge sort requires O(n) additional space for temporary arrays." },
      { id: "dsa8", question: "Which data structure implements a priority queue?", options: ["Array", "Linked List", "Heap", "Stack"], correctIndex: 2, explanation: "A Heap efficiently supports priority queue operations with O(log n) insert and extract." },
      { id: "dsa9", question: "What is dynamic programming?", options: ["Writing code dynamically", "Solving problems by breaking into overlapping subproblems", "Runtime code generation", "A testing strategy"], correctIndex: 1, explanation: "DP solves complex problems by breaking them into overlapping subproblems and caching results (memoization/tabulation)." },
      { id: "dsa10", question: "What is the time complexity of inserting into a balanced BST?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correctIndex: 1, explanation: "A balanced BST maintains O(log n) height, so insertion takes O(log n) time." }
    ]
  },
  {
    id: "system-design",
    title: "System Design Basics",
    description: "Scalability, databases, caching, load balancing and distributed systems.",
    icon: "🏗️",
    category: "Backend",
    difficulty: "Medium",
    timePerQuestion: 35,
    questions: [
      { id: "sd1", question: "What is horizontal scaling?", options: ["Adding more power to existing machines", "Adding more machines to handle load", "Reducing database size", "Optimizing code"], correctIndex: 1, explanation: "Horizontal scaling adds more machines to distribute the load." },
      { id: "sd2", question: "What does a CDN do?", options: ["Stores user sessions", "Distributes content to edge servers closer to users", "Encrypts data", "Manages databases"], correctIndex: 1, explanation: "A CDN caches content on servers geographically closer to users." },
      { id: "sd3", question: "What is database sharding?", options: ["Backing up databases", "Splitting data across multiple databases", "Encrypting records", "Indexing tables"], correctIndex: 1, explanation: "Sharding partitions data across multiple database instances." },
      { id: "sd4", question: "What does CAP theorem state?", options: ["Choose any 3 properties", "You can only guarantee 2 of 3: Consistency, Availability, Partition tolerance", "All systems are consistent", "Availability is always guaranteed"], correctIndex: 1, explanation: "CAP: a distributed system can only provide 2 of 3: Consistency, Availability, Partition tolerance." },
      { id: "sd5", question: "What is the purpose of a load balancer?", options: ["Store static files", "Distribute traffic across multiple servers", "Compress data", "Monitor health only"], correctIndex: 1, explanation: "A load balancer distributes incoming requests across multiple servers." },
      { id: "sd6", question: "What caching strategy updates cache on every write?", options: ["Cache-aside", "Write-through", "Write-back", "Read-through"], correctIndex: 1, explanation: "Write-through updates the cache synchronously with every database write." },
      { id: "sd7", question: "What is an API rate limiter?", options: ["Speeds up APIs", "Limits requests a client can make", "Caches responses", "Encrypts traffic"], correctIndex: 1, explanation: "Rate limiting controls how many requests a client can make in a time window." },
      { id: "sd8", question: "What is eventual consistency?", options: ["Data is always immediately consistent", "Data will become consistent over time", "Data is never consistent", "Consistency via locks"], correctIndex: 1, explanation: "Given enough time without new updates, all replicas converge to the same value." },
      { id: "sd9", question: "What is a message queue used for?", options: ["Sending emails", "Decoupling services for async communication", "Storing user data", "Routing HTTP requests"], correctIndex: 1, explanation: "Message queues (RabbitMQ, Kafka) decouple producers from consumers, enabling async processing." },
      { id: "sd10", question: "What is database replication?", options: ["Deleting duplicate data", "Copying data to multiple servers for redundancy", "Compressing data", "Encrypting backups"], correctIndex: 1, explanation: "Replication copies data to multiple servers for fault tolerance, read scaling, and disaster recovery." }
    ]
  },
  {
    id: "python",
    title: "Python Essentials",
    description: "Core Python, decorators, generators, OOP, and Pythonic patterns.",
    icon: "🐍",
    category: "Backend",
    difficulty: "Easy",
    timePerQuestion: 25,
    questions: [
      { id: "py1", question: "What is a list comprehension?", options: ["A way to sort lists", "A concise way to create lists from iterables", "A method to delete list items", "A type of loop"], correctIndex: 1, explanation: "List comprehensions: [expression for item in iterable if condition]." },
      { id: "py2", question: "What does 'self' refer to?", options: ["The class itself", "The current instance of the class", "The parent class", "A global variable"], correctIndex: 1, explanation: "'self' refers to the current instance, allowing access to its attributes and methods." },
      { id: "py3", question: "What is a decorator?", options: ["A UI pattern", "A function that modifies another function's behavior", "A type of variable", "A class attribute"], correctIndex: 1, explanation: "Decorators wrap functions to extend behavior using @decorator syntax." },
      { id: "py4", question: "What is the difference between list and tuple?", options: ["No difference", "Lists are mutable, tuples are immutable", "Tuples are faster for appending", "Lists can only hold strings"], correctIndex: 1, explanation: "Lists are mutable; tuples are immutable (cannot be changed after creation)." },
      { id: "py5", question: "What does *args do?", options: ["Defines keyword arguments", "Accepts variable number of positional arguments", "Creates a generator", "Imports a module"], correctIndex: 1, explanation: "*args accepts any number of positional arguments, collected into a tuple." },
      { id: "py6", question: "What is a generator?", options: ["A function that returns a list", "A function that yields values lazily", "A class constructor", "A module importer"], correctIndex: 1, explanation: "Generators use 'yield' to produce values one at a time for memory-efficient iteration." },
      { id: "py7", question: "What is the GIL?", options: ["A graphics library", "Global Interpreter Lock preventing true multi-threading", "A garbage collector", "A type checker"], correctIndex: 1, explanation: "The GIL prevents multiple threads from executing Python bytecode simultaneously in CPython." },
      { id: "py8", question: "How do you handle exceptions?", options: ["if/else blocks", "try/except blocks", "switch/case", "while loops"], correctIndex: 1, explanation: "Python uses try/except blocks with optional else and finally clauses." },
      { id: "py9", question: "What is the difference between '==' and 'is'?", options: ["Same thing", "'==' checks value equality, 'is' checks identity", "'is' is faster", "'==' checks identity"], correctIndex: 1, explanation: "'==' compares values; 'is' checks if two variables point to the same object in memory." },
      { id: "py10", question: "What is a virtual environment?", options: ["A VM", "An isolated Python environment for project dependencies", "A cloud service", "A testing sandbox"], correctIndex: 1, explanation: "Virtual environments isolate project dependencies, preventing conflicts between projects." }
    ]
  },
  {
    id: "sql",
    title: "SQL & Databases",
    description: "Queries, joins, indexing, normalization, and database optimization.",
    icon: "🗄️",
    category: "Backend",
    difficulty: "Medium",
    timePerQuestion: 30,
    questions: [
      { id: "sql1", question: "What is the difference between INNER JOIN and LEFT JOIN?", options: ["No difference", "INNER returns matching rows; LEFT returns all left table rows", "LEFT is faster", "INNER returns more rows"], correctIndex: 1, explanation: "INNER JOIN returns only matching rows. LEFT JOIN returns all left table rows plus matches from right." },
      { id: "sql2", question: "What does HAVING clause do?", options: ["Filters rows before grouping", "Filters groups after GROUP BY", "Orders results", "Limits rows"], correctIndex: 1, explanation: "HAVING filters groups after GROUP BY, while WHERE filters rows before grouping." },
      { id: "sql3", question: "What is normalization?", options: ["Making databases faster", "Organizing data to reduce redundancy", "Backing up data", "Encrypting data"], correctIndex: 1, explanation: "Normalization organizes tables to minimize redundancy and improve integrity." },
      { id: "sql4", question: "What is an index?", options: ["A primary key", "A data structure that speeds up queries", "A backup mechanism", "A type of join"], correctIndex: 1, explanation: "An index (usually B-tree) speeds up retrieval at the cost of storage and slower writes." },
      { id: "sql5", question: "What does ACID stand for?", options: ["Async, Concurrent, Isolated, Durable", "Atomicity, Consistency, Isolation, Durability", "Available, Consistent, Independent, Distributed", "Atomic, Cached, Indexed, Distributed"], correctIndex: 1, explanation: "ACID ensures reliable transactions: Atomicity, Consistency, Isolation, Durability." },
      { id: "sql6", question: "What is a foreign key?", options: ["A unique row identifier", "A field referencing a primary key in another table", "An encrypted column", "A computed column"], correctIndex: 1, explanation: "A foreign key links two tables by referencing the primary key of another table." },
      { id: "sql7", question: "What is the difference between DELETE and TRUNCATE?", options: ["No difference", "DELETE is row-by-row and logged; TRUNCATE removes all rows quickly", "TRUNCATE can use WHERE", "DELETE is faster"], correctIndex: 1, explanation: "DELETE removes rows one-by-one with logging. TRUNCATE removes all rows at once with minimal logging." },
      { id: "sql8", question: "What is a stored procedure?", options: ["A cached query", "A precompiled set of SQL statements", "A type of index", "A backup script"], correctIndex: 1, explanation: "A stored procedure is precompiled SQL stored in the database, executed as a single unit." },
      { id: "sql9", question: "What is a subquery?", options: ["A backup query", "A query nested inside another query", "A view", "A stored procedure"], correctIndex: 1, explanation: "A subquery is a SELECT inside another SQL statement, used for filtering or computing values." },
      { id: "sql10", question: "What is the difference between UNION and UNION ALL?", options: ["Same thing", "UNION removes duplicates; UNION ALL keeps all rows", "UNION ALL is slower", "UNION keeps duplicates"], correctIndex: 1, explanation: "UNION merges results and removes duplicates. UNION ALL keeps all rows including duplicates (faster)." }
    ]
  },
  {
    id: "typescript",
    title: "TypeScript Pro",
    description: "Generics, type guards, utility types, and advanced patterns.",
    icon: "🔷",
    category: "Frontend",
    difficulty: "Hard",
    timePerQuestion: 35,
    questions: [
      { id: "ts1", question: "What is the difference between 'interface' and 'type'?", options: ["No difference", "Interfaces can be extended, types use intersections", "Types are faster", "Interfaces are deprecated"], correctIndex: 1, explanation: "Interfaces support declaration merging and extends; types use intersections and can represent unions." },
      { id: "ts2", question: "What does 'keyof' do?", options: ["Creates a new key", "Returns union of property names", "Deletes a key", "Checks if key exists"], correctIndex: 1, explanation: "keyof T produces a union type of all property names of type T." },
      { id: "ts3", question: "What is a generic?", options: ["A default type", "A type parameter for reusable components", "A global variable", "An interface method"], correctIndex: 1, explanation: "Generics let you write reusable code that works with multiple types while maintaining type safety." },
      { id: "ts4", question: "What does Partial<T> do?", options: ["Makes all properties required", "Makes all properties optional", "Removes all properties", "Makes properties readonly"], correctIndex: 1, explanation: "Partial<T> constructs a type with all properties of T set to optional." },
      { id: "ts5", question: "What is a type guard?", options: ["A security feature", "A runtime check that narrows types", "A compile-time only check", "An error handler"], correctIndex: 1, explanation: "Type guards narrow types within conditional blocks (typeof, instanceof, custom predicates)." },
      { id: "ts6", question: "What does 'never' type represent?", options: ["null value", "Values that never occur", "Any value", "Undefined"], correctIndex: 1, explanation: "'never' represents values that never occur — used for exhaustive checks." },
      { id: "ts7", question: "What is a discriminated union?", options: ["A union with a common literal property", "A union of numbers", "A type alias", "An enum"], correctIndex: 0, explanation: "Discriminated unions use a common property with literal types for narrowing in switch/if." },
      { id: "ts8", question: "What does 'as const' do?", options: ["Casts to constant", "Makes values deeply readonly with literal types", "Creates a constant variable", "Freezes an object"], correctIndex: 1, explanation: "'as const' creates deeply readonly types with literal type inference." },
      { id: "ts9", question: "What is the 'infer' keyword used for?", options: ["Type inference in functions", "Extracting types within conditional types", "Declaring variables", "Creating enums"], correctIndex: 1, explanation: "'infer' is used in conditional types to extract and capture a type within a pattern." },
      { id: "ts10", question: "What does Record<K, V> do?", options: ["Records audio", "Creates an object type with keys K and values V", "A database record", "A log entry type"], correctIndex: 1, explanation: "Record<K, V> constructs an object type whose keys are K and values are V." }
    ]
  },
  {
    id: "nodejs",
    title: "Node.js Backend",
    description: "Event loop, streams, middleware, clustering, and server-side JavaScript.",
    icon: "🟢",
    category: "Backend",
    difficulty: "Medium",
    timePerQuestion: 30,
    questions: [
      { id: "nd1", question: "What is the Node.js event loop?", options: ["A UI rendering loop", "A mechanism for handling async operations", "A database pool", "A testing framework"], correctIndex: 1, explanation: "The event loop processes async callbacks, enabling non-blocking I/O despite being single-threaded." },
      { id: "nd2", question: "What is middleware in Express.js?", options: ["A database layer", "Functions that process requests before route handlers", "A template engine", "A caching mechanism"], correctIndex: 1, explanation: "Middleware has access to req, res, and next() — can modify requests or end responses." },
      { id: "nd3", question: "What is the purpose of package.json?", options: ["Store source code", "Define project metadata and dependencies", "Configure the OS", "Manage databases"], correctIndex: 1, explanation: "package.json defines project metadata, scripts, and dependencies." },
      { id: "nd4", question: "What are Node.js streams?", options: ["Database queries", "Objects for reading/writing data in chunks", "CSS animations", "API endpoints"], correctIndex: 1, explanation: "Streams handle data in chunks for efficient processing of large files." },
      { id: "nd5", question: "What does process.env contain?", options: ["Node version info", "Environment variables", "File system paths", "Network configuration"], correctIndex: 1, explanation: "process.env contains environment variables — API keys, database URLs, configuration." },
      { id: "nd6", question: "What is clustering in Node.js?", options: ["Database sharding", "Running multiple instances to use all CPU cores", "Grouping API routes", "Bundling modules"], correctIndex: 1, explanation: "The cluster module creates child processes sharing the same port for multi-core utilization." },
      { id: "nd7", question: "What is the difference between require() and import?", options: ["No difference", "require is CommonJS sync, import is ES modules async", "import is older", "require is faster"], correctIndex: 1, explanation: "require() is CommonJS (sync); import is ES modules (async, supports tree-shaking)." },
      { id: "nd8", question: "What does npm audit do?", options: ["Audits code quality", "Checks for security vulnerabilities in dependencies", "Tests performance", "Validates package.json"], correctIndex: 1, explanation: "npm audit scans dependencies for known security vulnerabilities." },
      { id: "nd9", question: "What is the buffer module used for?", options: ["Caching data", "Handling binary data directly", "String manipulation", "File compression"], correctIndex: 1, explanation: "Buffer handles raw binary data in Node.js, useful for file I/O and network protocols." },
      { id: "nd10", question: "What does the 'cluster' module's fork() do?", options: ["Creates a new branch", "Spawns a new worker process", "Splits an array", "Creates a new thread"], correctIndex: 1, explanation: "cluster.fork() creates a new worker process that shares the server port with the master." }
    ]
  },
  {
    id: "css",
    title: "CSS & Layout Mastery",
    description: "Flexbox, Grid, animations, specificity, responsive design.",
    icon: "🎨",
    category: "Frontend",
    difficulty: "Easy",
    timePerQuestion: 25,
    questions: [
      { id: "css1", question: "What is the difference between Flexbox and Grid?", options: ["No difference", "Flexbox is 1D, Grid is 2D", "Grid is older", "Flexbox is 2D"], correctIndex: 1, explanation: "Flexbox handles one dimension; Grid handles two dimensions simultaneously." },
      { id: "css2", question: "What does 'box-sizing: border-box' do?", options: ["Adds a border", "Includes padding and border in total width/height", "Removes margins", "Centers the box"], correctIndex: 1, explanation: "border-box makes width/height include padding and border." },
      { id: "css3", question: "What is CSS specificity?", options: ["How fast CSS loads", "Algorithm determining which styles apply when rules conflict", "CSS file size", "Number of stylesheets"], correctIndex: 1, explanation: "Specificity: inline > ID > class/attribute > element. Higher specificity wins." },
      { id: "css4", question: "What does 'position: sticky' do?", options: ["Makes element invisible", "Toggles between relative and fixed based on scroll", "Removes from flow", "Centers element"], correctIndex: 1, explanation: "Sticky switches from relative to fixed at a scroll threshold." },
      { id: "css5", question: "What is a CSS custom property?", options: ["A JS variable", "A reusable value defined with -- prefix", "A class name", "A media query"], correctIndex: 1, explanation: "CSS custom properties (--name: value) are accessed via var(--name)." },
      { id: "css6", question: "display:none vs visibility:hidden?", options: ["Same effect", "display:none removes from flow; visibility:hidden keeps space", "visibility is faster", "display:none is deprecated"], correctIndex: 1, explanation: "display:none removes from layout flow; visibility:hidden hides but preserves space." },
      { id: "css7", question: "What is a media query used for?", options: ["Querying databases", "Applying styles based on viewport conditions", "Loading images", "Connecting APIs"], correctIndex: 1, explanation: "Media queries apply CSS rules conditionally based on viewport, device type, etc." },
      { id: "css8", question: "What is z-index?", options: ["Font size", "Controls stacking order of positioned elements", "Element opacity", "Border width"], correctIndex: 1, explanation: "z-index controls which positioned elements appear on top when overlapping." },
      { id: "css9", question: "What does 'clamp()' function do?", options: ["Limits a value between a min and max", "Clamps an element to the viewport", "Rounds a number", "Clones a style"], correctIndex: 0, explanation: "clamp(min, preferred, max) sets a value that adapts between a minimum and maximum range." },
      { id: "css10", question: "What is the 'cascade' in CSS?", options: ["A waterfall effect", "The algorithm for resolving conflicting CSS rules", "A layout mode", "An animation type"], correctIndex: 1, explanation: "The cascade determines which styles apply based on origin, specificity, and order." }
    ]
  },
  {
    id: "git",
    title: "Git & Version Control",
    description: "Branching, merging, rebasing, conflicts, and workflows.",
    icon: "🔀",
    category: "CS Fundamentals",
    difficulty: "Easy",
    timePerQuestion: 25,
    questions: [
      { id: "git1", question: "git merge vs git rebase?", options: ["Same thing", "Merge creates a merge commit; rebase replays commits linearly", "Rebase is faster", "Merge deletes branches"], correctIndex: 1, explanation: "Merge preserves history with a merge commit; rebase rewrites history linearly." },
      { id: "git2", question: "What does 'git stash' do?", options: ["Deletes changes", "Temporarily saves uncommitted changes", "Creates a branch", "Pushes to remote"], correctIndex: 1, explanation: "git stash saves working directory changes to a stack." },
      { id: "git3", question: "What is a Git conflict?", options: ["A syntax error", "When two branches modify the same lines differently", "A merge failure", "A broken repository"], correctIndex: 1, explanation: "Conflicts occur when the same lines were changed differently in two branches." },
      { id: "git4", question: "What does 'git cherry-pick' do?", options: ["Selects random commits", "Applies a specific commit from another branch", "Deletes a commit", "Creates a tag"], correctIndex: 1, explanation: "cherry-pick applies changes from a specific commit onto the current branch." },
      { id: "git5", question: "git pull vs git fetch?", options: ["Same thing", "Fetch downloads changes; pull fetches AND merges", "Pull is offline", "Fetch pushes changes"], correctIndex: 1, explanation: "git fetch downloads remote changes without merging. git pull = fetch + merge." },
      { id: "git6", question: "What is a detached HEAD?", options: ["A broken repo", "When HEAD points to a commit instead of a branch", "When no branches exist", "A merge conflict"], correctIndex: 1, explanation: "Detached HEAD means you're on a specific commit rather than a branch tip." },
      { id: "git7", question: "What does '.gitignore' do?", options: ["Ignores Git commands", "Specifies files Git should not track", "Deletes files", "Hides branches"], correctIndex: 1, explanation: ".gitignore lists file patterns Git should exclude from version control." },
      { id: "git8", question: "What is a Git tag?", options: ["A branch name", "A named reference to a specific commit", "A commit message", "A remote URL"], correctIndex: 1, explanation: "Tags mark specific commits, typically for releases. Unlike branches, tags don't move." },
      { id: "git9", question: "What does 'git bisect' do?", options: ["Splits a branch", "Binary searches through commits to find a bug", "Merges two branches", "Deletes old commits"], correctIndex: 1, explanation: "git bisect uses binary search across commit history to efficiently find which commit introduced a bug." },
      { id: "git10", question: "What is a Git hook?", options: ["A branch alias", "Scripts that run automatically on Git events", "A remote URL", "A merge strategy"], correctIndex: 1, explanation: "Git hooks are scripts triggered by events like commit, push, or merge (pre-commit, post-push, etc.)." }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "Docker, CI/CD, Kubernetes, monitoring, and infrastructure as code.",
    icon: "☁️",
    category: "Backend",
    difficulty: "Hard",
    timePerQuestion: 35,
    questions: [
      { id: "do1", question: "What is Docker?", options: ["A programming language", "A platform for containerizing applications", "A database", "A cloud provider"], correctIndex: 1, explanation: "Docker packages applications and dependencies into lightweight containers." },
      { id: "do2", question: "What is CI/CD?", options: ["A testing framework", "Continuous Integration / Continuous Deployment pipeline", "A code editor", "A version control system"], correctIndex: 1, explanation: "CI/CD automates building, testing, and deploying code changes." },
      { id: "do3", question: "What is Kubernetes?", options: ["A CI/CD tool", "A container orchestration platform", "A monitoring tool", "A database"], correctIndex: 1, explanation: "Kubernetes automates deployment, scaling, and management of containerized applications." },
      { id: "do4", question: "What is Infrastructure as Code?", options: ["Writing code in containers", "Managing infrastructure through config files", "Coding on servers", "A database schema"], correctIndex: 1, explanation: "IaC manages infrastructure using code/config files (Terraform, CloudFormation)." },
      { id: "do5", question: "What is a reverse proxy?", options: ["A VPN", "A server that forwards requests to backend servers", "A firewall", "A load tester"], correctIndex: 1, explanation: "A reverse proxy (Nginx) handles SSL termination, load balancing, and caching." },
      { id: "do6", question: "Docker image vs container?", options: ["Same thing", "Image is a template; container is a running instance", "Container is bigger", "Image runs code"], correctIndex: 1, explanation: "An image is a read-only template; a container is a running instance of that image." },
      { id: "do7", question: "What is microservices architecture?", options: ["One large application", "Breaking an app into small, independent services", "A frontend framework", "A database design"], correctIndex: 1, explanation: "Microservices decompose apps into small, independently deployable services." },
      { id: "do8", question: "What does Prometheus do?", options: ["Writes code", "Collects metrics and alerts on system performance", "Deploys apps", "Manages databases"], correctIndex: 1, explanation: "Prometheus scrapes time-series metrics enabling dashboards and alerting." },
      { id: "do9", question: "What is a Dockerfile?", options: ["A log file", "A script defining how to build a Docker image", "A configuration database", "A test file"], correctIndex: 1, explanation: "A Dockerfile contains instructions (FROM, RUN, COPY, CMD) to build a Docker image layer by layer." },
      { id: "do10", question: "What is Helm in Kubernetes?", options: ["A monitoring tool", "A package manager for Kubernetes", "A container runtime", "A CI/CD tool"], correctIndex: 1, explanation: "Helm is a package manager that simplifies deploying and managing Kubernetes applications using charts." }
    ]
  },
  {
    id: "networking",
    title: "Computer Networks",
    description: "HTTP, TCP/IP, DNS, REST APIs, WebSockets, and security.",
    icon: "🌐",
    category: "CS Fundamentals",
    difficulty: "Medium",
    timePerQuestion: 30,
    questions: [
      { id: "net1", question: "HTTP vs HTTPS?", options: ["Speed difference", "HTTPS encrypts data with TLS/SSL", "HTTP is newer", "No difference"], correctIndex: 1, explanation: "HTTPS adds TLS/SSL encryption on top of HTTP." },
      { id: "net2", question: "What does DNS do?", options: ["Encrypts data", "Translates domain names to IP addresses", "Routes packets", "Stores cookies"], correctIndex: 1, explanation: "DNS resolves domain names (google.com) to IP addresses." },
      { id: "net3", question: "What is a REST API?", options: ["A database", "An architectural style using HTTP methods for resources", "A frontend framework", "A caching system"], correctIndex: 1, explanation: "REST APIs use HTTP methods (GET, POST, PUT, DELETE) on resource URLs." },
      { id: "net4", question: "What is the TCP 3-way handshake?", options: ["A security protocol", "SYN → SYN-ACK → ACK to establish connection", "A routing algorithm", "A DNS lookup"], correctIndex: 1, explanation: "TCP: Client SYN → Server SYN-ACK → Client ACK, then data flows." },
      { id: "net5", question: "What is WebSocket?", options: ["A REST alternative", "A protocol for full-duplex persistent connections", "A database protocol", "An email protocol"], correctIndex: 1, explanation: "WebSocket provides persistent, bidirectional communication — ideal for real-time apps." },
      { id: "net6", question: "What is CORS?", options: ["A CSS feature", "Cross-Origin Resource Sharing — controls cross-domain requests", "A JS library", "A database protocol"], correctIndex: 1, explanation: "CORS controls which origins can access resources from a different domain." },
      { id: "net7", question: "TCP vs UDP?", options: ["Same protocol", "TCP is reliable with ordering; UDP is faster without guarantees", "UDP is more reliable", "TCP is connectionless"], correctIndex: 1, explanation: "TCP ensures reliable, ordered delivery. UDP is faster but unreliable — used for streaming." },
      { id: "net8", question: "What HTTP status code means 'Not Found'?", options: ["500", "403", "404", "301"], correctIndex: 2, explanation: "404 = Not Found. 500 = Server Error. 403 = Forbidden. 301 = Redirect." },
      { id: "net9", question: "What is the OSI model?", options: ["A programming paradigm", "A 7-layer framework for network communication", "A database model", "A security protocol"], correctIndex: 1, explanation: "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
      { id: "net10", question: "What is a firewall?", options: ["A physical barrier", "A system that monitors and filters network traffic", "A caching server", "A DNS resolver"], correctIndex: 1, explanation: "A firewall monitors and controls incoming/outgoing network traffic based on security rules." }
    ]
  },
  {
    id: "os",
    title: "Operating Systems",
    description: "Processes, threads, memory management, scheduling, and deadlocks.",
    icon: "🖥️",
    category: "CS Fundamentals",
    difficulty: "Hard",
    timePerQuestion: 35,
    questions: [
      { id: "os1", question: "Process vs Thread?", options: ["Same thing", "Process has own memory; threads share memory within a process", "Threads are slower", "Processes share memory"], correctIndex: 1, explanation: "Processes have isolated memory; threads within a process share memory." },
      { id: "os2", question: "What is a deadlock?", options: ["A crashed program", "When processes wait for each other's resources indefinitely", "A memory leak", "A race condition"], correctIndex: 1, explanation: "Deadlock: two or more processes each hold resources the others need, creating circular wait." },
      { id: "os3", question: "What is virtual memory?", options: ["Cloud storage", "Using disk space to extend physical RAM", "A type of cache", "A network protocol"], correctIndex: 1, explanation: "Virtual memory uses disk space as extended RAM via paging." },
      { id: "os4", question: "What is a context switch?", options: ["Changing languages", "Saving/restoring process state when switching processes", "Switching monitors", "Changing permissions"], correctIndex: 1, explanation: "A context switch saves current process state and loads another, enabling multitasking." },
      { id: "os5", question: "Which scheduling gives each process equal time?", options: ["FIFO", "Round Robin", "Priority Scheduling", "Shortest Job First"], correctIndex: 1, explanation: "Round Robin assigns equal time quantum in circular order." },
      { id: "os6", question: "What is a semaphore?", options: ["A virus", "A synchronization primitive controlling resource access", "A memory allocator", "A file system"], correctIndex: 1, explanation: "Semaphores use counters to control concurrent access to shared resources." },
      { id: "os7", question: "What is thrashing?", options: ["Fast processing", "Excessive paging causing severe performance degradation", "Memory optimization", "CPU overclocking"], correctIndex: 1, explanation: "Thrashing: the OS spends more time swapping pages than executing processes." },
      { id: "os8", question: "Paging vs segmentation?", options: ["Same concept", "Paging uses fixed-size blocks; segmentation uses variable-size logical units", "Segmentation is newer", "Paging is slower"], correctIndex: 1, explanation: "Paging: fixed-size pages. Segmentation: variable-size logical segments (code, stack, data)." },
      { id: "os9", question: "What is a mutex?", options: ["A data type", "A locking mechanism for exclusive resource access", "A memory address", "A process ID"], correctIndex: 1, explanation: "A mutex (mutual exclusion) is a lock ensuring only one thread accesses a resource at a time." },
      { id: "os10", question: "What are the four conditions for deadlock?", options: ["Speed, memory, CPU, disk", "Mutual exclusion, hold & wait, no preemption, circular wait", "Read, write, execute, delete", "Create, update, delete, query"], correctIndex: 1, explanation: "Deadlock requires all four: mutual exclusion, hold & wait, no preemption, and circular wait." }
    ]
  },
  {
    id: "security",
    title: "Cybersecurity Fundamentals",
    description: "OWASP, encryption, authentication, XSS, CSRF, and secure coding.",
    icon: "🔒",
    category: "CS Fundamentals",
    difficulty: "Hard",
    timePerQuestion: 35,
    questions: [
      { id: "sec1", question: "What is SQL injection?", options: ["A database optimization", "Inserting malicious SQL through user input", "A type of join", "A backup technique"], correctIndex: 1, explanation: "SQL injection exploits unsanitized user input to execute malicious SQL commands." },
      { id: "sec2", question: "What is XSS (Cross-Site Scripting)?", options: ["A CSS framework", "Injecting malicious scripts into web pages viewed by others", "A testing tool", "A server configuration"], correctIndex: 1, explanation: "XSS allows attackers to inject scripts into web pages, stealing data or hijacking sessions." },
      { id: "sec3", question: "What is CSRF?", options: ["A caching strategy", "Tricking a user's browser into making unauthorized requests", "A file format", "A database lock"], correctIndex: 1, explanation: "CSRF tricks authenticated users into submitting unintended requests to a trusted site." },
      { id: "sec4", question: "Symmetric vs asymmetric encryption?", options: ["Same thing", "Symmetric uses one key; asymmetric uses public/private key pair", "Asymmetric is faster", "Symmetric uses two keys"], correctIndex: 1, explanation: "Symmetric: one shared key (AES). Asymmetric: public/private key pair (RSA)." },
      { id: "sec5", question: "What is hashing?", options: ["Encryption", "A one-way function producing fixed-size output", "Compression", "Encoding"], correctIndex: 1, explanation: "Hashing is a one-way function (SHA-256, bcrypt) — you can't reverse it to get the original input." },
      { id: "sec6", question: "What is a JWT?", options: ["A JavaScript library", "A JSON Web Token for stateless authentication", "A database query", "A CSS property"], correctIndex: 1, explanation: "JWT is a self-contained token (header.payload.signature) for stateless authentication." },
      { id: "sec7", question: "What is the principle of least privilege?", options: ["Give everyone admin access", "Grant only minimum permissions needed", "Remove all permissions", "Use one account for everything"], correctIndex: 1, explanation: "Least privilege: users/processes get only the minimum access required for their task." },
      { id: "sec8", question: "What is two-factor authentication (2FA)?", options: ["Two passwords", "Using two different verification methods", "Two usernames", "Two login pages"], correctIndex: 1, explanation: "2FA requires two different verification factors (password + OTP/biometric) for stronger security." },
      { id: "sec9", question: "What is a man-in-the-middle attack?", options: ["A social engineering trick", "Intercepting communication between two parties", "A DDoS attack", "A brute force attack"], correctIndex: 1, explanation: "MITM attacks intercept and potentially alter communication between two parties without their knowledge." },
      { id: "sec10", question: "What is OAuth 2.0?", options: ["A password manager", "An authorization framework for third-party access", "An encryption algorithm", "A firewall rule"], correctIndex: 1, explanation: "OAuth 2.0 allows third-party apps to access user resources without sharing credentials (e.g., 'Sign in with Google')." }
    ]
  },
  {
    id: "api-design",
    title: "API Design & REST",
    description: "REST principles, GraphQL, versioning, error handling, and best practices.",
    icon: "🔌",
    category: "Backend",
    difficulty: "Medium",
    timePerQuestion: 30,
    questions: [
      { id: "api1", question: "What does REST stand for?", options: ["Remote Execution Standard Technology", "Representational State Transfer", "Real-time Event Streaming Technology", "Resource Exchange Service Tool"], correctIndex: 1, explanation: "REST = Representational State Transfer, an architectural style for distributed systems." },
      { id: "api2", question: "Which HTTP method is idempotent?", options: ["POST", "PUT", "PATCH (always)", "None of them"], correctIndex: 1, explanation: "PUT is idempotent — calling it multiple times produces the same result. POST creates new resources each time." },
      { id: "api3", question: "What is the purpose of HTTP status code 201?", options: ["OK", "Created", "No Content", "Accepted"], correctIndex: 1, explanation: "201 Created indicates a new resource was successfully created, typically returned after POST." },
      { id: "api4", question: "What is API versioning?", options: ["Backing up APIs", "Managing different versions of an API simultaneously", "Deleting old APIs", "Testing APIs"], correctIndex: 1, explanation: "API versioning (v1, v2) allows breaking changes without affecting existing consumers." },
      { id: "api5", question: "GraphQL vs REST?", options: ["Same thing", "GraphQL lets clients request exact data needed; REST returns fixed structures", "REST is newer", "GraphQL is faster always"], correctIndex: 1, explanation: "GraphQL allows clients to specify exactly what data they need, avoiding over/under-fetching." },
      { id: "api6", question: "What is pagination in APIs?", options: ["Creating pages", "Breaking large result sets into smaller chunks", "Page routing", "Caching pages"], correctIndex: 1, explanation: "Pagination splits large datasets into pages (offset/limit or cursor-based) for efficient transfer." },
      { id: "api7", question: "What is an API gateway?", options: ["A firewall", "A single entry point managing routing, auth, and rate limiting", "A database", "A load balancer only"], correctIndex: 1, explanation: "An API gateway provides a unified entry point handling authentication, routing, rate limiting, and logging." },
      { id: "api8", question: "What does HATEOAS mean in REST?", options: ["A security protocol", "Hypermedia as the Engine of Application State", "A caching strategy", "An error handling pattern"], correctIndex: 1, explanation: "HATEOAS means API responses include links to related resources, enabling discoverable APIs." },
      { id: "api9", question: "What is the purpose of an API key?", options: ["Encrypt data", "Identify and authenticate API consumers", "Speed up requests", "Version the API"], correctIndex: 1, explanation: "API keys identify and authenticate clients making requests, enabling usage tracking and access control." },
      { id: "api10", question: "What HTTP method should be used to partially update a resource?", options: ["PUT", "POST", "PATCH", "DELETE"], correctIndex: 2, explanation: "PATCH applies partial modifications to a resource, while PUT replaces the entire resource." }
    ]
  },
  {
    id: "testing",
    title: "Software Testing",
    description: "Unit tests, integration tests, TDD, mocking, and testing strategies.",
    icon: "🧪",
    category: "CS Fundamentals",
    difficulty: "Medium",
    timePerQuestion: 30,
    questions: [
      { id: "test1", question: "What is unit testing?", options: ["Testing the entire app", "Testing individual functions/components in isolation", "Testing user interface", "Testing performance"], correctIndex: 1, explanation: "Unit tests verify individual functions or components work correctly in isolation." },
      { id: "test2", question: "What is TDD?", options: ["Test-Driven Development: write tests before code", "Test During Development", "Type-Driven Design", "Test Data Design"], correctIndex: 0, explanation: "TDD: Write failing test → Write minimal code to pass → Refactor. Red-Green-Refactor cycle." },
      { id: "test3", question: "What is mocking?", options: ["Making fun of code", "Simulating dependencies with controlled behavior", "Deleting test data", "Running tests in parallel"], correctIndex: 1, explanation: "Mocks simulate external dependencies (APIs, databases) so tests run fast and predictably." },
      { id: "test4", question: "Unit test vs integration test?", options: ["Same thing", "Unit tests individual parts; integration tests parts working together", "Integration is faster", "Unit tests are optional"], correctIndex: 1, explanation: "Unit tests check individual components; integration tests verify components work correctly together." },
      { id: "test5", question: "What is code coverage?", options: ["Code formatting", "Percentage of code executed during tests", "Code review", "Code deployment"], correctIndex: 1, explanation: "Code coverage measures what percentage of your codebase is exercised by tests." },
      { id: "test6", question: "What is E2E testing?", options: ["Error-to-Error testing", "Testing the full application flow from user perspective", "Edge testing", "Exception testing"], correctIndex: 1, explanation: "End-to-end tests simulate real user scenarios through the entire application stack." },
      { id: "test7", question: "What is regression testing?", options: ["Going back to old code", "Verifying existing functionality still works after changes", "Testing performance", "Load testing"], correctIndex: 1, explanation: "Regression testing ensures new changes haven't broken existing functionality." },
      { id: "test8", question: "What is a test fixture?", options: ["A bug fix", "A fixed state/data used as a baseline for tests", "A test framework", "A deployment step"], correctIndex: 1, explanation: "Test fixtures provide a known, fixed environment (setup data) so tests run consistently." },
      { id: "test9", question: "What is snapshot testing?", options: ["Taking screenshots", "Comparing rendered output against a saved reference", "Database backups", "Version control"], correctIndex: 1, explanation: "Snapshot testing saves component output and alerts you when it changes unexpectedly." },
      { id: "test10", question: "What is the testing pyramid?", options: ["A monument", "Strategy: many unit tests, fewer integration, fewest E2E tests", "A test framework", "A CI/CD stage"], correctIndex: 1, explanation: "The testing pyramid recommends many fast unit tests, fewer integration tests, and few slow E2E tests." }
    ]
  },
  {
  id: "html",
  title: "HTML Fundamentals",
  description: "Structure, tags, forms, and semantics.",
  icon: "📄",
  category: "Frontend",
  tech: "HTML",
  difficulty: "Easy",
  timePerQuestion: 20,
  questions: [
    { id: "html1", question: "HTML stands for?", options: ["Hyper Trainer Marking Language","Hyper Text Markup Language","Hyper Text Markdown Language","None"], correctIndex: 1, explanation: "Correct expansion of HTML." },
    { id: "html2", question: "Tag for hyperlink?", options: ["<a>","<link>","<href>","<p>"], correctIndex: 0, explanation: "<a> is used." },
    { id: "html3", question: "Heading tag?", options: ["<h1>","<head>","<title>","<p>"], correctIndex: 0, explanation: "<h1> to <h6>." },
    { id: "html4", question: "Image tag?", options: ["<img>","<image>","<src>","<pic>"], correctIndex: 0, explanation: "<img> tag." },
    { id: "html5", question: "Form tag?", options: ["<form>","<input>","<button>","<submit>"], correctIndex: 0, explanation: "<form> container." },
    { id: "html6", question: "Paragraph tag?", options: ["<p>","<para>","<text>","<h1>"], correctIndex: 0, explanation: "<p> tag." },
    { id: "html7", question: "List tag?", options: ["<ul>","<li>","Both","None"], correctIndex: 2, explanation: "Both used together." },
    { id: "html8", question: "Semantic tag?", options: ["<div>","<span>","<section>","<b>"], correctIndex: 2, explanation: "Section is semantic." },
    { id: "html9", question: "Meta tag used for?", options: ["Styling","SEO & metadata","Scripts","Images"], correctIndex: 1, explanation: "Meta gives info." },
    { id: "html10", question: "HTML is?", options: ["Programming","Markup","Database","OS"], correctIndex: 1, explanation: "HTML is markup." }
  ]
},
  {
  id: "css-basic",
  title: "CSS Basics",
  description: "Styling, layouts, and responsiveness.",
  icon: "🎨",
  category: "Frontend",
  tech: "CSS",
  difficulty: "Easy",
  timePerQuestion: 20,
  questions: [
    { id: "css1", question: "CSS stands for?", options: ["Color Style Sheets","Cascading Style Sheets","Creative Style System","None"], correctIndex: 1, explanation: "Correct full form." },
    { id: "css2", question: "Property to change color?", options: ["font-color","color","text","bg"], correctIndex: 1, explanation: "Use color." },
    { id: "css3", question: "Flexbox is?", options: ["1D layout","2D layout","Grid","None"], correctIndex: 0, explanation: "Flexbox is 1D." },
    { id: "css4", question: "Grid is?", options: ["1D","2D","Inline","None"], correctIndex: 1, explanation: "Grid is 2D." },
    { id: "css5", question: "Selector for id?", options: [".","#","*","@"], correctIndex: 1, explanation: "#id selector." },
    { id: "css6", question: "Selector for class?", options: [".","#","*","@"], correctIndex: 0, explanation: ".class selector." },
    { id: "css7", question: "Position fixed means?", options: ["Scrolls","Stays fixed","Relative","None"], correctIndex: 1, explanation: "Fixed stays." },
    { id: "css8", question: "z-index used for?", options: ["Size","Stacking","Color","Margin"], correctIndex: 1, explanation: "Controls stacking." },
    { id: "css9", question: "Media queries used for?", options: ["DB","Responsive design","JS","API"], correctIndex: 1, explanation: "Responsive." },
    { id: "css10", question: "Box model includes?", options: ["Margin","Padding","Border","All"], correctIndex: 3, explanation: "All included." }
  ]
},
  {
  id: "java",
  title: "Java Basics",
  description: "OOP, JVM, syntax.",
  icon: "☕",
  category: "Backend",
  tech: "Java",
  difficulty: "Medium",
  timePerQuestion: 25,
  questions: [
    { id: "java1", question: "Java is?", options: ["Compiled","Interpreted","Both","None"], correctIndex: 2, explanation: "Both." },
    { id: "java2", question: "JVM stands for?", options: ["Java Virtual Machine","Java Variable Method","Joint VM","None"], correctIndex: 0, explanation: "Correct." },
    { id: "java3", question: "OOP concept?", options: ["Encapsulation","Inheritance","Polymorphism","All"], correctIndex: 3, explanation: "All." },
    { id: "java4", question: "main method?", options: ["Entry point","Exit","Loop","None"], correctIndex: 0, explanation: "Program starts here." },
    { id: "java5", question: "Extension?", options: [".js",".py",".java",".html"], correctIndex: 2, explanation: ".java files." },
    { id: "java6", question: "Class keyword?", options: ["class","Class","define","obj"], correctIndex: 0, explanation: "class keyword." },
    { id: "java7", question: "Interface is?", options: ["Class","Blueprint","Object","None"], correctIndex: 1, explanation: "Blueprint." },
    { id: "java8", question: "Inheritance uses?", options: ["extends","implements","both","none"], correctIndex: 2, explanation: "Both used." },
    { id: "java9", question: "Java is platform?", options: ["Dependent","Independent","Both","None"], correctIndex: 1, explanation: "Platform independent." },
    { id: "java10", question: "Garbage collection?", options: ["Memory cleanup","Error","Compile","None"], correctIndex: 0, explanation: "Removes unused objects." }
  ]
},
  {
  id: "react-basic",
  title: "React Basics",
  description: "Components, props, state.",
  icon: "⚛️",
  category: "Frontend",
  tech: "React",
  difficulty: "Easy",
  timePerQuestion: 25,
  questions: [
    { id: "rb1", question: "React is?", options: ["Library","Framework","DB","Language"], correctIndex: 0, explanation: "React is library." },
    { id: "rb2", question: "Component?", options: ["Reusable UI","API","DB","None"], correctIndex: 0, explanation: "Reusable UI." },
    { id: "rb3", question: "State?", options: ["Data storage","UI state","Both","None"], correctIndex: 2, explanation: "State holds data." },
    { id: "rb4", question: "Props?", options: ["Inputs","Outputs","State","None"], correctIndex: 0, explanation: "Props are inputs." },
    { id: "rb5", question: "Hook?", options: ["Function","Class","Loop","None"], correctIndex: 0, explanation: "Hooks are functions." },
    { id: "rb6", question: "useState?", options: ["State hook","Effect","Ref","None"], correctIndex: 0, explanation: "useState manages state." },
    { id: "rb7", question: "JSX?", options: ["HTML in JS","CSS","API","None"], correctIndex: 0, explanation: "JSX syntax." },
    { id: "rb8", question: "Virtual DOM?", options: ["Real DOM","Copy DOM","None","CSS"], correctIndex: 1, explanation: "Virtual DOM is copy." },
    { id: "rb9", question: "React uses?", options: ["Components","Pages","Files","None"], correctIndex: 0, explanation: "Component-based." },
    { id: "rb10", question: "Render?", options: ["Display UI","Delete","Update DB","None"], correctIndex: 0, explanation: "Render UI." }
  ]
},
{
  id: "mysql",
  title: "MySQL Fundamentals",
  description: "Relational database, queries, joins, normalization.",
  icon: "🐬",
  category: "Backend",
  tech: "MySQL",
  difficulty: "Medium",
  timePerQuestion: 25,
  questions: [
    { id: "mysql1", question: "MySQL is?", options: ["NoSQL","Relational DB","Graph DB","None"], correctIndex: 1, explanation: "MySQL is relational." },
    { id: "mysql2", question: "Primary key is?", options: ["Duplicate","Unique identifier","Null value","Index"], correctIndex: 1, explanation: "Primary key uniquely identifies row." },
    { id: "mysql3", question: "Command to fetch data?", options: ["GET","SELECT","FETCH","SHOW"], correctIndex: 1, explanation: "SELECT retrieves data." },
    { id: "mysql4", question: "INSERT used for?", options: ["Delete","Add data","Update","Read"], correctIndex: 1, explanation: "INSERT adds data." },
    { id: "mysql5", question: "DELETE removes?", options: ["Rows","Columns","Tables","DB"], correctIndex: 0, explanation: "DELETE removes rows." },
    { id: "mysql6", question: "JOIN is used for?", options: ["Delete","Combine tables","Sort","Insert"], correctIndex: 1, explanation: "JOIN combines tables." },
    { id: "mysql7", question: "WHERE clause?", options: ["Filter rows","Sort","Group","Join"], correctIndex: 0, explanation: "Filters rows." },
    { id: "mysql8", question: "GROUP BY?", options: ["Sort","Group rows","Delete","Insert"], correctIndex: 1, explanation: "Groups rows." },
    { id: "mysql9", question: "HAVING?", options: ["Filter groups","Filter rows","Sort","Join"], correctIndex: 0, explanation: "Filters groups." },
    { id: "mysql10", question: "Normalization?", options: ["Reduce redundancy","Increase data","Delete data","Sort"], correctIndex: 0, explanation: "Reduces redundancy." }
  ]
},

];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}

export function saveResult(result: QuizResult): void {
  const results = getResults();
  results.push(result);
  localStorage.setItem("quiz_results", JSON.stringify(results));
}

export function getResults(): QuizResult[] {
  const stored = localStorage.getItem("quiz_results");
  return stored ? JSON.parse(stored) : [];
}

export function getLeaderboard(): QuizResult[] {
  return getResults()
    .sort((a, b) => {
      const scoreA = (a.score / a.totalQuestions) * 100;
      const scoreB = (b.score / b.totalQuestions) * 100;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return a.timeTaken - b.timeTaken;
    })
    .slice(0, 20);
}


