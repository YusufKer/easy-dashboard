# Easy Dashboard

A React + TypeScript dashboard application for managing proteins, cuts, and flavours with full CRUD operations.

## Tech Stack

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool and dev server
- **React Router 7.9.6** - Client-side routing
- **Tailwind CSS 4.1.17** - Styling
- **ESLint** - Code linting

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── lib/            # API utilities
├── config/         # Configuration files
└── assets/         # Static assets
```

---

## 🚨 TODO: Issues to Address

### **HIGH PRIORITY** 🔴

- [ ] **Fix DELETE API functions error handling**

  - File: `src/lib/api.ts`
  - Functions: `removeFlavourFromProtein()` and `removeCutFromProtein()`
  - Issue: Missing `response.ok` check and response parsing
  - Action: Add proper error handling like other API functions

- [ ] **Add proper error boundaries**

  - Create: `src/components/ErrorBoundary.tsx`
  - Wrap app in error boundary for better error handling
  - Add fallback UI for caught errors

- [ ] **Fix price type from string to number**

  - Files: All interface definitions using `price: string`
  - Change to: `price: number`
  - Update all API calls and form inputs accordingly
  - Add proper number parsing/formatting

- [ ] **Add input validation for price fields**

  - Files: `CutCard.tsx`, `FlavourCard.tsx`, `CutsSection.tsx`, `FlavoursSection.tsx`
  - Validate: No negative numbers, max decimals, required field
  - Consider: Add min/max constraints

- [ ] **Fix CSS typo in ProteinDetailPage**
  - File: `src/pages/ProteinDetailPage.tsx`
  - Line: `className="bg-linear-to-br from-slate-50 to-slate-100/50"`
  - Fix to: `className="bg-gradient-to-br from-slate-50 to-slate-100/50"`

### **MEDIUM PRIORITY** 🟡

- [ ] **Replace confirm()/alert() with modal components**

  - Install a modal library (e.g., `@headlessui/react`, `radix-ui`)
  - Create reusable `ConfirmDialog.tsx` component
  - Replace all `confirm()` calls in delete handlers
  - Replace all `alert()` calls with proper error modals

- [ ] **Add try-catch blocks to async handlers**

  - Files: `CutCard.tsx`, `FlavourCard.tsx`
  - Functions: `handleSave()` in both components
  - Add proper error handling and user feedback

- [ ] **Implement optimistic UI updates**

  - File: `src/pages/ProteinDetailPage.tsx`
  - Instead of refetching entire protein after add cut/flavour
  - Update local state immediately, revert on error

- [ ] **Add loading skeletons**

  - Create: `src/components/Skeleton.tsx`
  - Replace "Loading..." text with proper skeleton UI
  - Use in: ListPage, ProteinDetailPage

- [ ] **Add toast notifications**

  - Install: `react-hot-toast` or `sonner`
  - Replace alerts with toast notifications
  - Add success/error/info toasts for all operations

- [ ] **Combine useEffect hooks in ProteinDetailPage**

  - File: `src/pages/ProteinDetailPage.tsx`
  - Combine the 3 separate useEffect hooks for better performance
  - Use Promise.all() to fetch protein, cuts, and flavours together

- [ ] **Add proper form validation library**
  - Install: `zod` + `react-hook-form` or `@tanstack/form`
  - Apply to all forms (AddResourceForm, CutsSection, FlavoursSection)
  - Add schema validation for all inputs

### **LOW PRIORITY** 🟢

- [ ] **Improve accessibility**

  - Add ARIA labels to all interactive elements
  - Add keyboard navigation support (Tab, Enter, Escape)
  - Implement focus management for modals/forms
  - Add focus-visible styles
  - Test with screen reader
  - Improve color contrast (check WCAG AA standards)

- [ ] **Add pagination/search**

  - Implement pagination for large lists
  - Add search/filter functionality
  - Consider virtual scrolling for very large datasets

- [ ] **Add unit and integration tests**

  - Install: `vitest`, `@testing-library/react`
  - Test custom hooks (useResourceList)
  - Test API functions
  - Test components with user interactions
  - Add E2E tests with Playwright

- [ ] **Consider React Query for data fetching**

  - Install: `@tanstack/react-query`
  - Replace manual fetch logic with React Query
  - Get automatic caching, refetching, error handling
  - Simplify optimistic updates

- [ ] **Add environment variable validation**

  - File: `src/config/env.ts`
  - Use `zod` to validate env vars at runtime
  - Provide clear errors if required vars are missing

- [ ] **Add rate limiting/debouncing**

  - Install: `use-debounce`
  - Debounce search inputs
  - Rate limit API requests if needed

- [ ] **Add empty state illustrations**

  - Create or use icon library for empty states
  - Add helpful messages when no data exists
  - Guide users to add their first item

- [ ] **Add undo functionality**

  - Implement undo for deletions
  - Store deleted items temporarily
  - Allow restoration within time window

- [ ] **Add loading states with better UX**

  - Disable buttons during async operations
  - Show inline loading indicators
  - Prevent double-clicks on submit buttons

- [ ] **Add memoization for performance**

  - Use `useMemo` for expensive computations
  - Use `useCallback` for callback functions passed as props
  - Use `React.memo` for components that re-render unnecessarily

- [ ] **Implement global state management**

  - If app grows, consider Context API or Zustand
  - Reduce props drilling
  - Centralize state for better synchronization

- [ ] **Add offline support**
  - Implement service worker
  - Cache API responses
  - Queue mutations when offline
  - Sync when back online

### **NICE TO HAVE** ✨

- [ ] Add dark mode support
- [ ] Add export/import functionality (CSV, JSON)
- [ ] Add bulk operations (delete multiple items)
- [ ] Add sorting functionality
- [ ] Add advanced filters
- [ ] Add data visualization/charts
- [ ] Add audit log/history
- [ ] Add user preferences
- [ ] Improve mobile responsiveness
- [ ] Add keyboard shortcuts

---

## Code Quality Notes

### Current Strengths

✅ Modern tech stack with latest versions  
✅ Well-organized folder structure  
✅ Reusable components and hooks  
✅ Consistent coding patterns  
✅ TypeScript for type safety  
✅ Clean UI with Tailwind CSS

### Areas for Improvement

⚠️ Error handling consistency  
⚠️ Type safety (price as string vs number)  
⚠️ Accessibility features  
⚠️ Performance optimizations  
⚠️ Test coverage

---

## Contributing

When contributing to this project, please:

1. Create a new branch for your feature/fix
2. Follow the existing code style
3. Add tests for new features
4. Update this README if needed
5. Submit a pull request

## License

MIT
