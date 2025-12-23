# Quick Reference: Tutorial Scripts Overview

**Created:** December 2024
**Purpose:** Claude Code tutorial series for minimal-flashcards application
**Total Duration:** ~60 minutes across 5 scripts

---

## Scripts Summary

### 📚 Script 1: Introduction & Getting Started
- **Duration:** 8-10 minutes
- **File:** `01-introduction-and-getting-started.md`
- **Focus:** Installation, setup, first demo
- **Student Outcome:** Can install Claude Code and run basic commands

### 🎯 Script 2: How to Use Claude Effectively
- **Duration:** 10-12 minutes (can split into 2×6min)
- **File:** `02-how-to-use-claude-effectively.md`
- **Focus:** File references, context, commands, prompt hygiene
- **Student Outcome:** Can write effective prompts and use core features

### 🔍 Script 3: Understanding a New Codebase
- **Duration:** 10-12 minutes
- **File:** `03-understanding-a-new-codebase.md`
- **Focus:** Systematic codebase exploration, verification
- **Student Outcome:** Can independently explore and understand codebases

### 🛠️ Script 4: Planning and Implementing Features
- **Duration:** 12-15 minutes (can split into 2×7min)
- **File:** `04-planning-and-implementing-features.md`
- **Focus:** End-to-end feature development (multiple choice cards)
- **Student Outcome:** Can plan and implement full-stack features

### ⚡ Script 5: Tips and Tricks
- **Duration:** 10-12 minutes
- **File:** `05-tips-and-tricks.md`
- **Focus:** Advanced techniques, debugging, workflow integration
- **Student Outcome:** Can use advanced techniques and avoid common pitfalls

---

## Key Teaching Concepts

### Script 1 Highlights:
- Claude Code vs other AI tools (codebase awareness, command execution)
- Installation: `npm install -g @anthropic-ai/claude-code`
- Authentication: `claude auth login`
- Demo: Understanding structure + environment setup

### Script 2 Highlights:
- File references: natural language, `@filename`, asking Claude to find
- Slash commands: `/init`, `/help`, `/clear`
- CLAUDE.md: Project knowledge base
- **Don't vibe code** - be specific!
- Prompt hygiene: one task, examples, constraints

### Script 3 Highlights:
- **Phase 1:** Ask broad questions (what, how, where, what data)
- **Phase 2:** Drill down to specific implementations
- **Phase 3:** Verify by reading code and running tests
- Document your understanding as you learn

### Script 4 Highlights:
- **Plan first, code second**
- Backend → Test → Frontend → Test (incremental)
- Use Claude for: understanding requirements, planning, implementation
- Example: Adding multiple choice card type end-to-end

### Script 5 Highlights:
- Chain of thought prompting
- "Error sandwich" debugging technique
- Code review with Claude before commits
- 80/20 rule: 80% thinking, 20% AI assistance
- Workflow integration patterns

---

## Quick Command Reference

### Essential Commands:
```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Authenticate
claude auth login

# Start Claude
claude

# In Claude Code:
/init          # Initialize project documentation
/help          # Show available commands
/clear         # Clear conversation context
```

### Development Commands (from scripts):
```bash
# Backend setup
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000

# Frontend setup
cd frontend
npm install
npm run dev

# Testing
cd backend
DATABASE_URL="sqlite:///./test.db" pytest
```

---

## Example Prompts from Scripts

### Understanding Codebase:
```
What is the purpose of this application and what are its main features?
```

```
Explain the technical architecture. What are the major components and how do they interact?
```

```
Walk me through the project structure. What is the purpose of each major directory?
```

### Planning Feature:
```
I want to add [feature]. Help me plan the implementation.

Break down all changes needed across:
1. Backend models and schemas
2. Backend services and API
3. Frontend types and components
4. Database migrations

For each area, list specific files and changes needed.
```

### Debugging:
```
What I was trying to do: [context]
What I expected: [expected behavior]
What actually happened: [actual behavior]
Error message: [full error]
Help me debug this.
```

### Code Review:
```
Review [file] for:
1. Breaking changes
2. Error handling gaps
3. Performance issues
4. Security concerns
5. Missing tests
```

---

## Common Student Questions & Answers

**Q: Is using Claude Code cheating?**
A: No more than using Stack Overflow or reading documentation. Understanding the code you use is what matters.

**Q: How much should I rely on Claude?**
A: Use the 80/20 rule - 80% thinking/learning, 20% getting AI assistance.

**Q: What if Claude gives wrong information?**
A: Always verify! Read the code, run tests, understand the logic. Trust but verify.

**Q: When should I use /clear?**
A: When switching between unrelated tasks or when Claude seems confused by previous context.

**Q: How do I know if my prompt is good?**
A: Good prompts are specific, include context, state constraints, and ask for explanations.

---

## Teaching Tips

### Do's:
✅ Show actual errors and debug them
✅ Type prompts live (don't copy-paste)
✅ Pause after explanations
✅ Verify Claude's answers by showing real code
✅ Emphasize understanding over code generation
✅ Test incrementally throughout demos

### Don'ts:
❌ Don't skip the planning phase
❌ Don't hide mistakes
❌ Don't rush through concepts
❌ Don't accept Claude's code blindly
❌ Don't try to cover everything in one session
❌ Don't forget to emphasize fundamentals

---

## Video Recording Checklist

### Before Recording:
- [ ] Claude Code installed and authenticated
- [ ] Repository cloned in clean directory
- [ ] Backend and frontend tested and running
- [ ] Docker running (if needed)
- [ ] Terminal history cleared
- [ ] Screen recording software ready
- [ ] Zoom level appropriate for viewers
- [ ] Sample prompts prepared
- [ ] Backup plans for demos

### During Recording:
- [ ] Speak clearly and at moderate pace
- [ ] Explain what you're typing as you type
- [ ] Show the results of commands
- [ ] Point out key concepts explicitly
- [ ] Handle errors as teaching moments
- [ ] Recap at the end of sections

### After Recording:
- [ ] Review for technical accuracy
- [ ] Check audio quality
- [ ] Add timestamps in video description
- [ ] Include links to resources
- [ ] Provide sample code if helpful

---

## Suggested Assignments

### After Script 1-2:
**Assignment:** "Getting to Know Claude"
- Install and set up Claude Code
- Run `/init` on minimal-flashcards
- Ask 10 questions about the codebase (5 high-level, 5 detailed)
- Document what you learned

### After Script 3:
**Assignment:** "Deep Dive Documentation"
- Choose one feature (e.g., spaced repetition, deck management)
- Use Claude to understand it end-to-end
- Create a diagram showing the complete flow
- Explain it in your own words (1-2 pages)

### After Script 4:
**Assignment:** "Feature Planning"
- Plan (don't implement) a new feature:
  - Short answer question type, OR
  - Deck statistics dashboard, OR
  - Card tagging system
- Submit: Implementation plan, file list, sequence, edge cases

### After Script 5:
**Assignment:** "Full Feature Implementation"
- Implement one complete feature using all learned techniques
- Submit: Plan, code, tests, Claude conversation log, reflection
- Grading: Planning quality, code quality, testing, understanding

---

## Assessment Rubric Example

### Feature Implementation Assignment (100 points):

**Planning (25 points)**
- Clear requirements (5)
- Comprehensive implementation plan (10)
- Edge cases identified (5)
- Realistic sequence (5)

**Implementation (40 points)**
- Code quality and style (10)
- Follows existing patterns (10)
- Proper error handling (10)
- TypeScript/type safety (10)

**Testing (20 points)**
- Backend tests (10)
- Manual testing documented (5)
- Edge cases tested (5)

**Understanding (15 points)**
- Can explain code in own words (10)
- Reflection on learning process (5)

---

## Additional Resources

### For Students:
- Claude Code docs: https://claude.ai/code
- Minimal-flashcards CLAUDE.md
- Tutorial scripts in this directory

### For Instructors:
- Each script has detailed instructor notes
- Timing breakdowns provided
- Common pitfalls documented
- Customization suggestions included

---

## Version History

**v1.0 (Dec 2024)**
- Initial release
- 5 comprehensive tutorial scripts
- Total ~60 minutes of content
- Focused on minimal-flashcards application

---

**For questions or improvements, contact:**
- Instructional Operations Coordinator: Kendall Reinisch (kj0y@seas.upenn.edu)
- Associate Director of Instructional Technology: Alexander Savoth (asavoth@seas.upenn.edu)
