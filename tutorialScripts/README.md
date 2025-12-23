# Tutorial Scripts for Claude Code with Minimal Flashcards

This directory contains comprehensive tutorial scripts for teaching students how to use Claude Code effectively with the minimal-flashcards application.

## Overview

These scripts are designed for video tutorials, with each script targeting a maximum of 10-12 minutes of content. They are written for a professor/instructor to deliver and include detailed notes, timing breakdowns, and teaching tips.

## Tutorial Series Structure

### Script 1: Introduction & Getting Started (8-10 minutes)
**File:** `01-introduction-and-getting-started.md`

**Covers:**
- Course introduction and learning objectives
- What is Claude Code and how it differs from other AI tools
- Installing and setting up Claude Code
- Small demo showing codebase understanding and environment setup

**Key Learning Outcomes:**
- Students understand what Claude Code is
- Students can install and authenticate Claude Code
- Students can start Claude and ask basic questions
- Students see the value proposition through live demo

---

### Script 2: How to Use Claude Effectively (10-12 minutes, can be split into 2 parts)
**File:** `02-how-to-use-claude-effectively.md`

**Part A: Core Features (6 min)**
- Referencing files (natural language, @ symbol, asking Claude to find)
- Understanding context windows
- Slash commands (/init, /help, /clear)

**Part B: Best Practices (6 min)**
- The CLAUDE.md file and its importance
- Don't "vibe code" - being specific with prompts
- Prompt hygiene (one task at a time, examples, constraints)

**Key Learning Outcomes:**
- Students can reference files effectively
- Students understand context management
- Students know key slash commands
- Students write clear, specific prompts
- Students understand CLAUDE.md's role

---

### Script 3: Understanding a New Codebase (10-12 minutes)
**File:** `03-understanding-a-new-codebase.md`

**Covers:**
- Cloning and initializing with /init
- Asking high-level questions first (what, how, where, what data)
- Drilling down with detailed questions
- Verifying Claude's answers by reading code and running tests
- Building a systematic understanding

**Key Learning Outcomes:**
- Students have a systematic approach to learning codebases
- Students know what questions to ask and in what order
- Students can verify AI-generated information
- Students can trace code flows through multiple files

---

### Script 4: Planning and Implementing Features (12-15 minutes, split into 2 parts)
**File:** `04-planning-and-implementing-features.md`

**Part A: Learning and Planning (7 min)**
- Understanding feature requirements
- Asking Claude for implementation plans
- Identifying edge cases and constraints

**Part B: Implementation (7 min)**
- Implementing backend changes (models, schemas, services)
- Testing backend via API
- Implementing frontend changes (forms, display logic)
- End-to-end testing

**Example Feature:** Adding multiple-choice questions to flashcards

**Key Learning Outcomes:**
- Students plan before coding
- Students break features into testable increments
- Students use Claude for planning AND implementation
- Students test as they build
- Students understand full-stack development flow

---

### Script 5: Tips and Tricks (10-12 minutes)
**File:** `05-tips-and-tricks.md`

**Covers:**
- Advanced prompting techniques (chain of thought, constraints, roles, comparisons)
- Debugging strategies with Claude
- Code review and refactoring
- Context management and performance
- Common mistakes to avoid
- Workflow integration (git, testing, development process)

**Key Learning Outcomes:**
- Students know advanced prompting patterns
- Students can debug systematically with Claude
- Students integrate Claude into their workflow
- Students avoid common pitfalls
- Students understand the 80/20 rule (80% thinking, 20% AI assistance)

---

## Using These Scripts

### For Instructors:

Each script includes:

1. **Timing breakdowns** - Know how long each section takes
2. **Screen directions** - What to show on screen at each moment
3. **Typed examples** - Exact prompts to type into Claude Code
4. **Teaching emphasis** - What points to stress
5. **Preparation notes** - What to set up before recording
6. **Common questions** - Student questions to address
7. **Instructor notes** - Tips for delivery

### Recording Tips:

- **Practice first**: Run through each script once before recording
- **Have fallbacks**: If something fails during demo, have a backup ready
- **Show real errors**: Don't hide mistakes - they're teaching moments
- **Pause for thinking**: Give students time to absorb information
- **Live typing**: Students learn better seeing you actually type prompts
- **Split long videos**: Videos over 10 minutes can be split at suggested points

### Customization:

Feel free to:
- Adjust timing based on your teaching pace
- Add your own examples relevant to your students
- Skip advanced sections if students are beginners
- Extend with additional exercises
- Create follow-up assignment based on the tutorials

---

## Recommended Tutorial Sequence

### Week 1: Getting Started
- **Day 1**: Script 1 (Introduction & Getting Started)
- **Day 2**: Script 2A (Core Features)
- **Assignment**: Set up Claude Code, run /init, ask 5 questions about the codebase

### Week 2: Understanding Code
- **Day 1**: Script 2B (Best Practices)
- **Day 2**: Script 3 (Understanding Codebases)
- **Assignment**: Document understanding of one feature end-to-end

### Week 3: Building Features
- **Day 1**: Script 4A (Planning)
- **Day 2**: Script 4B (Implementation)
- **Assignment**: Plan and implement a simple feature

### Week 4: Advanced Usage
- **Day 1**: Script 5 (Tips & Tricks)
- **Day 2**: Review and Q&A
- **Assignment**: Implement a complex feature using all learned techniques

---

## Technical Requirements

### Software Needed:
- Node.js 18+
- Python 3.9+
- Docker Desktop
- PostgreSQL 15+ (or Docker)
- VS Code or similar IDE
- Terminal
- Claude Code CLI installed

### Repository Setup:
- Clone minimal-flashcards
- Have backend and frontend ready to run
- Database initialized with migrations
- Sample data loaded (optional)

### Recording Setup:
- Screen recording software
- Split screen showing: Claude Code + Terminal/Browser
- Clear terminal history before recording
- Zoom level appropriate for video viewers

---

## Learning Path Suggestions

### For Complete Beginners:
1. Watch Script 1, 2A, 2B first
2. Practice asking questions for 1-2 days
3. Then move to Scripts 3, 4, 5
4. Focus on understanding over speed

### For Experienced Developers:
1. Watch Script 1 briefly
2. Skim Scripts 2-3
3. Focus on Script 4 (implementation)
4. Deep dive into Script 5 (advanced techniques)

### For AI Tool Beginners (experienced developers new to AI):
1. Watch all scripts in order
2. Pay special attention to Script 2 (best practices)
3. Emphasize Script 5 (avoiding pitfalls)

---

## Assessment Ideas

### Quiz Questions:
1. What command initializes Claude for a new codebase?
2. Name three ways to reference a file in Claude Code
3. What is the "error sandwich" technique?
4. Why should you ask high-level questions before detailed ones?
5. What's the 80/20 rule for AI-assisted development?

### Practical Exercises:
1. Use Claude to understand the SRS algorithm implementation
2. Plan (but don't implement) a new feature
3. Debug a provided broken feature using Claude
4. Review provided code using Claude
5. Implement a complete feature end-to-end

### Project Assignment:
Implement one of these features using Claude Code:
- Short answer question type
- Deck statistics dashboard
- Card tagging system
- Study streak tracking
- Export deck to PDF

Students must submit:
- Implementation plan (from Claude)
- Code changes
- Test results
- Reflection on what they learned

---

## Additional Resources

### Official Documentation:
- Claude Code: https://claude.ai/code
- Claude API: https://docs.anthropic.com
- GitHub: https://github.com/anthropics/claude-code

### Related Topics:
- Prompt engineering best practices
- Software architecture fundamentals
- Full-stack development patterns
- Test-driven development
- Git workflow

### Community:
- Encourage students to share prompts that worked well
- Create a class "prompt library"
- Discuss failures and how to overcome them
- Share debugging strategies

---

## Feedback and Iteration

After delivering these tutorials, collect feedback on:
- Which parts were confusing?
- What needed more/less time?
- What examples resonated?
- What was missing?

Use this feedback to refine the scripts for future cohorts.

---

## License and Usage

These tutorial scripts are designed for educational use in the MCIT 5980 Course Development course at the University of Pennsylvania. They may be adapted for other educational contexts with attribution.

---

## Contact

For questions about these tutorial scripts:
- Instructional Operations Coordinator: Kendall Reinisch (kj0y@seas.upenn.edu)
- Associate Director of Instructional Technology: Alexander Savoth (asavoth@seas.upenn.edu)

---

**Last Updated:** December 2024
**Version:** 1.0
**Target Audience:** Graduate students in computer science
**Prerequisites:** Basic programming knowledge, familiarity with web development concepts
