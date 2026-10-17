## 2023-10-17 - React useMemo Optimization
**Learning:** Found an unoptimized `filter` call in `CatalogList.tsx` that ran on every keystroke and render, doing string trimming and lowercasing inside the $O(n)$ loop.
**Action:** Implemented a debounced input state for the search and used `useMemo` to extract the $O(1)$ operations outside the loop, significantly improving rendering performance when searching through the large book catalog.
