# Course Content Directory

This directory contains the source content for courses generated via the Course Seeder.

## How to Create a New Course

1.  **Create a Folder**: Name it with the slug you want (e.g., `modern-react`).
    - Path: `src/content/courses/modern-react/`

2.  **Add `course.json`**: This defines the course metadata.

    ```json
    {
    	"title": "Modern React Patterns",
    	"description": "Learn the latest...",
    	"tags": ["React", "Advanced"],
    	"progressional": true
    }
    ```

3.  **Add Lessons (.mdx)**: Create files for each lesson.
    - Naming convention: `01-lesson-slug.mdx`, `02-another-lesson.mdx`.
    - The prefix (`01-`) ensures the order but is removed from the final slug.

    **Example `01-intro.mdx`**:

    ```markdown
    ---
    title: 'Introduction'
    description: 'Welcome to the course'
    duration: 5
    exercises:
        - question: 'What is React?'
          type: 'multiple-choice'
          options: 'Library,Framework,Language'
          correctAnswer: 'Library'
          hint: "It's a JS library."
    ---

    # Introduction

    Content goes here...
    ```

4.  **Run the Seeder**:
    ```bash
    npm run seed:courses
    ```
    This script will parse all folders here and update the `Course`, `Lesson`, and `Exercise` tables in your database.
