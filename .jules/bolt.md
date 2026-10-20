## 2026-10-20 - Incomplete diffs in proposals
**Learning:** A previous proposal to optimize CatalogList.tsx was rejected because the diff was incomplete (only imported useMemo without using it). Proposals must include the full implementation in the diff.
**Action:** Always ensure the proposed diff contains the complete, working change, not just imports.
## 2026-10-20 - Adding raw git diffs and lockfiles
**Learning:** During the attempt to add the exact git diff to the `PROPUESTAS.md` file, a temporary file (`my.diff`) and `pnpm-lock.yaml` were accidentally generated and staged. The constraints specifically dictate to avoid polluting the workspace with garbage files and unnecessary auto-generated files. Furthermore, I learned how not to leave temporary files that would dirty the PR.
**Action:** Be extremely cautious when manipulating the git index or creating temporary files. Make sure to delete them. And do not generate `pnpm-lock.yaml` when just running tests and checks if not explicitly told.
