// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("joeyjazwinski");

// Insert blog posts
db.getCollection("blog_posts").insertMany([
    {
        title: "Why Linux is Still King in 2025",
        description:
            "Exploring why Linux remains the top choice for developers and servers.",
        content:
            "Linux continues to dominate because of its flexibility, security, and open-source nature...",
        tags: ["linux", "open-source", "servers"],
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "why-linux-is-still-king",
    },
    {
        title: "The Rise of Edge Computing",
        description:
            "Edge computing is changing how we think about cloud infrastructure.",
        content:
            "Instead of relying on centralized servers, edge computing pushes resources closer to the user...",
        tags: ["tech", "cloud", "infrastructure"],
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "rise-of-edge-computing",
    },
    {
        title: "Mastering TailwindCSS: A Beginner’s Guide",
        description:
            "How to get started with TailwindCSS and build responsive designs fast.",
        content:
            "TailwindCSS offers a utility-first approach to CSS that speeds up development time...",
        tags: ["webdev", "tailwind", "beginners"],
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "mastering-tailwindcss-beginner-guide",
    },
    {
        title: "React Server Components: The Future?",
        description:
            "Understanding React Server Components and how they can change frontend development.",
        content:
            "Server Components allow developers to offload heavy computation to the server...",
        tags: ["react", "webdev", "frontend"],
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "react-server-components-future",
    },
    {
        title: "How I Setup a Minimalist Workspace",
        description:
            "Practical tips to reduce distractions and optimize your workspace.",
        content:
            "A clean workspace leads to a clean mind. Here’s how I built mine...",
        tags: ["productivity", "minimalism"],
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "setup-minimalist-workspace",
    },
    {
        title: "The Problem with Modern Politics",
        description:
            "A critical look at the polarization and tribalism in today’s politics.",
        content:
            "Politics has always been divisive, but today’s environment feels uniquely toxic...",
        tags: ["politics", "opinion"],
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "problem-with-modern-politics",
    },
    {
        title: "Securing Your Server in 2025",
        description:
            "Practical steps to harden a Linux server from vulnerabilities.",
        content:
            "Firewalls, SSH hardening, intrusion detection — here’s how to secure your box...",
        tags: ["linux", "security", "servers"],
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "securing-server-2025",
    },
    {
        title: "Is AI Really Replacing Jobs?",
        description:
            "Separating myth from fact about AI automation and employment.",
        content:
            "While AI does automate certain tasks, new job categories are also emerging...",
        tags: ["ai", "tech", "future"],
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "is-ai-replacing-jobs",
    },
    {
        title: "Understanding the Terminal: A Beginner’s Guide",
        description: "Why every developer should master the command line.",
        content:
            "The terminal isn’t just for hackers. It’s a powerful productivity tool...",
        tags: ["linux", "beginners", "terminal"],
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "understanding-terminal-beginners",
    },
    {
        title: "Building Resilient Web Apps",
        description:
            "Best practices for creating fault-tolerant, scalable applications.",
        content:
            "Building for failure is a key principle in modern web development...",
        tags: ["webdev", "scalability", "cloud"],
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "building-resilient-web-apps",
    },
]);

// Insert tutorials
db.getCollection("tutorial_posts").insertMany([
    {
        title: "Getting Started with React",
        description:
            "Learn the basics of building components and state management in React.",
        content:
            "React lets you build user interfaces from reusable components...",
        tags: ["react", "webdev", "beginners"],
        difficulty: "Beginner",
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "getting-started-with-react",
    },
    {
        title: "Introduction to Git and GitHub",
        description:
            "Version control your projects with Git and GitHub collaboration.",
        content:
            "Git is a distributed version control system that tracks changes...",
        tags: ["git", "beginners", "tools"],
        difficulty: "Beginner",
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "intro-to-git-github",
    },
    {
        title: "Setting Up Your First Linux Server",
        description:
            "How to launch, secure, and maintain your own Linux server.",
        content:
            "Deploy a server using cloud providers like AWS or DigitalOcean...",
        tags: ["linux", "servers", "beginners"],
        difficulty: "Beginner",
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "setup-first-linux-server",
    },
    {
        title: "Advanced State Management with Redux",
        description:
            "Learn how to manage complex state in larger React applications.",
        content: "Redux helps centralize and predict your application state...",
        tags: ["react", "redux", "advanced"],
        difficulty: "Advanced",
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "advanced-state-management-redux",
    },
    {
        title: "Docker for Developers",
        description:
            "Package your applications and run them anywhere with Docker.",
        content:
            "Docker containers make your app portable across different environments...",
        tags: ["docker", "devops", "intermediate"],
        difficulty: "Intermediate",
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "docker-for-developers",
    },
    {
        title: "Mastering Terminal Commands",
        description:
            "Level up your terminal skills with these essential commands.",
        content:
            "Knowing your way around the terminal saves time and frustration...",
        tags: ["linux", "terminal", "productivity"],
        difficulty: "Intermediate",
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "mastering-terminal-commands",
    },
    {
        title: "Creating REST APIs with Next.js",
        description:
            "A quick guide to building your own API endpoints inside Next.js apps.",
        content:
            "Next.js API routes make it easy to create serverless functions...",
        tags: ["webdev", "nextjs", "backend"],
        difficulty: "Intermediate",
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "creating-rest-apis-nextjs",
    },
    {
        title: "Secure Authentication with NextAuth.js",
        description:
            "Implement authentication securely in your Next.js apps using NextAuth.js.",
        content: "NextAuth.js simplifies OAuth, JWT, and session handling...",
        tags: ["auth", "nextjs", "security"],
        difficulty: "Advanced",
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "secure-authentication-nextauth",
    },
    {
        title: "Basic Bash Scripting for Automation",
        description: "Automate repetitive tasks with simple bash scripts.",
        content:
            "Learn how to create scripts that execute commands automatically...",
        tags: ["linux", "bash", "automation"],
        difficulty: "Beginner",
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "basic-bash-scripting",
    },
    {
        title: "Deploying a Fullstack App to Vercel",
        description:
            "How to deploy a Next.js frontend and Node.js backend together on Vercel.",
        content: "Vercel makes deploying fullstack apps almost seamless...",
        tags: ["vercel", "deployment", "webdev"],
        difficulty: "Intermediate",
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "deploy-fullstack-vercel",
    },
]);
