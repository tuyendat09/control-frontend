# Library moderation (exercises + foods)

Same model for both shared libraries.

## Lifecycle
`pending` (user-created) → `approved` (official, visible to everyone) · or deleted / merged into a duplicate.

## Visibility
- Pending items are visible and usable **only by their creator**.
- Approved items are shared; shared data stays clean.
- A creator's past logs keep working if their item is merged or approved (re-point to the official item).

## AI
- Role: suggest/match only — map free text to existing approved items. Not a source of truth, never auto-approves.
- Drafting new library entries with AI is out of scope for now.

## Admin
- Admin role signs in to this app and gets a review page: pending list, approve, merge duplicates, delete.
- Foods created from a missed barcode also land in the queue with the barcode attached.
