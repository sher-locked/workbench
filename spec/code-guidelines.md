# clarifi-guidelines.md

## Coding Guidelines and Conventions

### General Principles

- **Single Responsibility**: Each file, function, and component should do one thing well
- **DRY**: Don't repeat yourself, extract reusable logic
- **KISS**: Keep it simple, avoid unnecessary complexity
- **Testability**: Code should be designed with testing in mind
- **Progressive Enhancement**: Core functionality should work without JS where possible

### File Structure Conventions

- Use lowercase with dashes for directories: `components/model-selector`
- Group related components in subdirectories
- Organize files in consistent order:
  1. Exported component
  2. Subcomponents
  3. Helper functions
  4. Static content
  5. Type definitions

### Naming Conventions

- **Components**: PascalCase for component names
- **Files**: kebab-case for file names
- **Functions**: camelCase for function names
- **Constants**: UPPER_SNAKE_CASE for constants
- **Types/Interfaces**: PascalCase with descriptive names
- **Boolean variables**: Use auxiliary verbs (e.g., `isLoading`, `hasError`)
- **Event handlers**: Use `handle` prefix (e.g., `handleSubmit`)

### TypeScript Usage

```typescript
// Prefer interfaces over types when possible
interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
}

// Use discriminated unions instead of enums
type FeedbackRating = 
  | { kind: 'great'; value: 'Great' }
  | { kind: 'good'; value: 'Good' }
  | { kind: 'weak'; value: 'Weak' };

// Use Pick, Omit, Partial for derived types
type CreateUserProfile = Omit<UserProfile, 'id'>;

// Use function type annotations
function calculateTokenCost(
  tokens: number, 
  rate: number
): { cost: number; currency: string } {
  return { cost: tokens * rate, currency: 'INR' };
}
```

### React Component Patterns

```tsx
// Use named exports
export function ModelSelector({ 
  models, 
  onSelect 
}: ModelSelectorProps) {
  // Implementation
}

// Use functional components with hooks
export function useModelSelection() {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  
  function selectModel(modelId: string) {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev 
        : [...prev, modelId].slice(0, 3)
    );
  }
  
  return { selectedModels, selectModel };
}
```

### Server Component Usage

```tsx
// Use React Server Components for data fetching
export default async function FeedbackPage({ 
  params 
}: { 
  params: { sessionId: string } 
}) {
  const session = await getSession(params.sessionId);
  
  return (
    <main>
      <FeedbackHeader session={session} />
      <Suspense fallback={<FeedbackSkeleton />}>
        <FeedbackContent sessionId={params.sessionId} />
      </Suspense>
    </main>
  );
}
```

### Styling with Tailwind

```tsx
// Use Tailwind classes with consistent order
<button
  // Layout
  className="flex items-center justify-center w-full max-w-md
  // Spacing
  px-4 py-2 mx-auto mb-4
  // Typography
  font-medium text-sm
  // Visual
  bg-blue-600 hover:bg-blue-700 
  text-white rounded-md shadow-sm
  // Transitions
  transition-colors duration-200
  // States
  disabled:opacity-50 disabled:cursor-not-allowed"
  onClick={handleAnalyze}
  disabled={isAnalyzing}
>
  {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
</button>
```

### Error Handling

```tsx
// Use error boundaries
export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>, 
  fallback: React.ReactNode
) {
  return function ErrorBoundaryWrapped(props: T) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// Use try/catch with early returns
async function analyzeText(
  text: string, 
  modelIds: string[]
): Promise<Result<AnalysisResponse, Error>> {
  try {
    if (!text.trim()) {
      return { ok: false, error: new Error('Text is required') };
    }
    
    if (modelIds.length === 0) {
      return { ok: false, error: new Error('At least one model is required') };
    }
    
    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ text, modelIds }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      return { ok: false, error: new Error(error.message) };
    }
    
    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    return { 
      ok: false, 
      error: error instanceof Error 
        ? error 
        : new Error('Unknown error occurred') 
    };
  }
}
```

### Performance Optimization

- Use React Server Components for data-heavy components
- Implement code splitting with `dynamic` imports
- Use `useMemo` and `useCallback` for expensive operations
- Utilize `next/image` for optimized image loading
- Implement streaming responses for LLM interactions
- Keep client components small and focused

```tsx
// Example of dynamic import with suspense
import dynamic from 'next/dynamic';

const ModelComparisonChart = dynamic(
  () => import('@/components/charts/model-comparison-chart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);
```

### State Management Guidelines

- Prefer local state when possible
- Use URL state for shareable UI state
- Use TanStack Query for remote data state
- Use Zustand for global app state
- Keep state normalized and minimal

```tsx
// Example of using nuqs for URL state
import { useQueryState } from 'nuqs';

export function ImprovementSelector() {
  const [selectedIds, setSelectedIds] = useQueryState(
    'improvements',
    { defaultValue: [] }
  );
  
  // Implementation
}
```

### Testing Guidelines

- Write unit tests for all utility functions
- Create component tests for interactive UI
- Use MSW for API mocking
- Implement E2E tests for critical user flows
- Test error states and edge cases

```tsx
// Example test for token calculation
describe('calculateTokenCost', () => {
  it('should calculate correct cost for input tokens', () => {
    const result = calculateTokenCost(1000, 0.02);
    expect(result.cost).toBe(20);
    expect(result.currency).toBe('INR');
  });
  
  it('should handle zero tokens', () => {
    const result = calculateTokenCost(0, 0.02);
    expect(result.cost).toBe(0);
  });
});
```

### Documentation Guidelines

- Add JSDoc comments for functions and components
- Include examples for complex utility functions
- Document props with TypeScript interfaces
- Keep README up to date with development instructions
- Add comments for non-obvious code sections

```tsx
/**
 * Calculates the estimated cost for processing text with a specific model
 * 
 * @param text - The input text to analyze
 * @param model - The model configuration
 * @returns The estimated cost in INR
 * 
 * @example
 * ```tsx
 * const cost = estimateCost("Hello world", modelConfig);
 * // Returns { inputCost: 0.02, outputCost: 0.15, total: 0.17 }
 * ```
 */
function estimateCost(
  text: string, 
  model: ModelConfig
): CostEstimate {
  // Implementation
}
```
