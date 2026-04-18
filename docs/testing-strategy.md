# Testing Strategy

## Why this strategy

This project follows a practical testing approach inspired by:

- Next.js testing guide: https://nextjs.org/docs/pages/guides/testing
- Testing Trophy thinking: https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications

Goal: maximize confidence per effort by prioritizing tests that resemble real user behavior, while keeping feedback fast and reliable.

## Test types and intended usage

## Tooling decisions for this project

This repository uses a split testing stack:

- **Jest** -> unit test runner
- **RCA (React Testing Library)** -> component tests and snapshots
- **Cypress** -> E2E tests only

This is aligned with Next.js guidance on test types and common tool usage.

### Unit tests

Use for isolated logic with little/no framework coupling:

- markdown helpers (`slugifyHeading`, citation/link transforms, table wrappers)
- date/format utils
- small pure utility functions

Keep unit tests focused on edge cases and correctness of deterministic transforms.

### Component tests

Use for rendering and interaction behavior of single components:

- table hint visibility states
- heading/citation link rendering
- small UI components with props/interaction branches

These are useful when behavior can be validated without a full page flow.
In this project, component tests run with RCA + Jest.

### Integration tests (default priority)

Primary investment area for this project.

Examples:

- blog post page rendering from CMS payloads
- markdown parsing pipeline -> rendered HTML output
- heading anchors + references linking end-to-end inside page render
- fallback behavior between markdown and legacy content

Integration tests should verify meaningful user-visible behavior across multiple modules.

### End-to-End (E2E) tests

Use a small, high-value smoke set for critical paths:

- open blog post and navigate by heading hash
- click citation and jump to reference
- horizontal table scroll behavior on narrow viewport
- key page navigation flows

Prefer a lean suite to avoid slow/flaky pipelines.
In this project, E2E tests run with Cypress only.

### Snapshot tests

Use sparingly for stable structural output (not for fast-changing visual noise).
Good fit for selected markdown render outputs when snapshots are reviewed carefully.
In this project, snapshots are maintained in Jest (with RCA render trees).

## Async Server Components note

Per Next.js guidance, async Server Components may have limited support in some unit/component test tools.
For async Server Components, prefer E2E coverage over low-level unit tests when confidence is the goal.

## Testing Trophy distribution (project guidance)

Recommended emphasis for this codebase:

- Integration: most tests
- Unit: enough for core pure logic
- E2E: thin critical-path layer
- Static checks: TypeScript + linting always on

This aligns with the principle:
"The more your tests resemble the way your software is used, the more confidence they can give you."

## Quality bar for new features

For each non-trivial feature/change:

1. Add/adjust unit tests for pure transformation logic.
2. Add/adjust at least one integration test for user-visible behavior.
3. Add/adjust E2E only when the flow is critical or historically fragile.
4. Ensure lint + type checks pass in CI.

## Initial focus areas for this project

- `src/utils/postMarkdownParser.ts`
- `src/utils/loadPostMarkdown.ts`
- `src/pages/blog/posts/[slug].tsx`
- markdown table/anchor/citation UX behaviors

