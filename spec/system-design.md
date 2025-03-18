# clarifi-design.md

## System Architecture

### API Design

We'll use a hybrid approach with REST APIs for CRUD operations and GraphQL for complex data fetching:

#### REST API Endpoints

```
- GET /api/models - List available LLM models with metadata
- POST /api/analyze - Create new analysis session
- GET /api/sessions/:id - Get session details
- GET /api/sessions - List all sessions (paginated)
- PUT /api/sessions/:id/improvements - Update selected improvements
- POST /api/sessions/:id/rewrite - Generate rewrite based on selections
- GET /api/config - Get current configuration
- PUT /api/config - Update configuration (future)
- GET /api/stats - Get usage statistics
```

#### GraphQL Schema (for complex data fetching)

```graphql
type Query {
  session(id: ID!): Session
  sessions(limit: Int, offset: Int, filter: SessionFilter): [Session]
  models: [Model]
  stats: Stats
}

type Session {
  id: ID!
  createdAt: DateTime!
  originalText: String!
  modelSelections: [ModelSelection!]!
  feedbacks: [Feedback!]!
  rewrites: [Rewrite!]
  tokenUsage: TokenUsage!
  cost: Cost!
}

type ModelSelection {
  model: Model!
  providerId: String!
}

type Model {
  id: ID!
  name: String!
  provider: Provider!
  costPerInputToken: Float!
  costPerOutputToken: Float!
  strengths: [String!]!
  performanceMetrics: PerformanceMetrics!
}

type Provider {
  id: ID!
  name: String!
  models: [Model!]!
}

type Feedback {
  id: ID!
  modelId: ID!
  summary: FeedbackSummary!
  storytelling: StorytellingAnalysis!
  reasoning: ReasoningAnalysis!
  grammarNotes: [GrammarNote!]!
  contextNotes: [ContextNote!]!
  improvements: [Improvement!]!
  tokenUsage: TokenUsage!
  cost: Cost!
}

type Rewrite {
  id: ID!
  modelId: ID!
  revisedText: String!
  improvementsApplied: [AppliedImprovement!]!
  tokenUsage: TokenUsage!
  cost: Cost!
}

# Additional types for feedback structure...
```

### Database Schema

Using PostgreSQL with the following schema:

#### Tables

```sql
-- Core tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  original_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  title TEXT GENERATED ALWAYS AS (LEFT(original_text, 50) || '...') STORED
);

CREATE TABLE providers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  api_base_url TEXT NOT NULL
);

CREATE TABLE models (
  id TEXT PRIMARY KEY,
  provider_id TEXT NOT NULL REFERENCES providers(id),
  name TEXT NOT NULL,
  input_token_cost NUMERIC(10, 6) NOT NULL,
  output_token_cost NUMERIC(10, 6) NOT NULL,
  strengths JSONB NOT NULL DEFAULT '[]',
  performance_metrics JSONB NOT NULL DEFAULT '{}'
);

CREATE TABLE session_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES sessions(id),
  model_id TEXT NOT NULL REFERENCES models(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE feedbacks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_model_id UUID NOT NULL REFERENCES session_models(id),
  raw_response JSONB NOT NULL,
  input_tokens INTEGER NOT NULL,
  output_tokens INTEGER NOT NULL,
  cost_inr NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE rewrites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_model_id UUID NOT NULL REFERENCES session_models(id),
  revised_text TEXT NOT NULL,
  improvements_applied JSONB NOT NULL,
  input_tokens INTEGER NOT NULL,
  output_tokens INTEGER NOT NULL,
  cost_inr NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  feedback_prompt TEXT NOT NULL,
  rewrite_prompt TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT true
);
```

### Code Organization Structure

```
clarifi/
├── .github/                    # GitHub Actions workflows
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── input/
│   │   │   └── page.tsx
│   │   ├── feedback/[sessionId]/
│   │   │   └── page.tsx
│   │   ├── rewrite/[sessionId]/
│   │   │   └── page.tsx
│   │   ├── config/
│   │   │   └── page.tsx
│   │   ├── history/
│   │   │   └── page.tsx
│   │   └── session/[sessionId]/
│   │       └── page.tsx
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components (shadcn)
│   │   ├── layout/             # Layout components
│   │   ├── input/              # Input page components
│   │   ├── feedback/           # Feedback page components
│   │   ├── rewrite/            # Rewrite page components
│   │   ├── history/            # History page components
│   │   └── configuration/      # Configuration page components
│   ├── lib/                    # Utility functions
│   │   ├── ai/                 # AI providers integration
│   │   │   ├── openai.ts
│   │   │   ├── anthropic.ts
│   │   │   └── index.ts
│   │   ├── db/                 # Database utilities
│   │   ├── hooks/              # Custom React hooks
│   │   └── utils/              # Helper functions
│   ├── types/                  # TypeScript type definitions
│   │   ├── api.ts
│   │   ├── models.ts
│   │   ├── feedback.ts
│   │   └── rewrite.ts
│   └── api/                    # API routes
│       ├── models/
│       │   └── route.ts
│       ├── analyze/
│       │   └── route.ts
│       ├── sessions/
│       │   └── [id]/
│       │       ├── route.ts
│       │       └── rewrite/
│       │           └── route.ts
│       └── stats/
│           └── route.ts
├── prisma/                     # Prisma schema and migrations
├── .env.example                # Environment variables example
├── .eslintrc.js                # ESLint configuration
├── .gitignore                  # Git ignore file
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

### State Management

We'll use a combination of:

1. **React Server Components** for initial data loading
2. **TanStack Query** for client-side data fetching and caching
3. **Zustand** for global UI state with type-safe store
4. **nuqs** for URL-based state management

```typescript
// Example Zustand store for model selection
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ModelState {
  selectedModels: string[];
  selectModel: (modelId: string) => void;
  deselectModel: (modelId: string) => void;
  clearSelection: () => void;
}

export const useModelStore = create<ModelState>()(
  persist(
    (set) => ({
      selectedModels: [],
      selectModel: (modelId) => set((state) => ({
        selectedModels: [...state.selectedModels, modelId].slice(0, 3)
      })),
      deselectModel: (modelId) => set((state) => ({
        selectedModels: state.selectedModels.filter(id => id !== modelId)
      })),
      clearSelection: () => set({ selectedModels: [] })
    }),
    { name: 'clarifi-model-selection' }
  )
);
```

### Data Flow Architecture

1. **Input Page Flow**:
   - User inputs text
   - Selects models
   - System creates session on submit
   - Redirects to feedback page with session ID

2. **Feedback Page Flow**:
   - Load session data using React Server Components
   - Stream feedback responses from LLM providers
   - Convert JSON responses to interactive UI
   - Store selection state in URL parameters using nuqs

3. **Rewrite Page Flow**:
   - Load session and selected improvements
   - Stream rewrite generation
   - Render diff visualization
   - Store final session data

### Caching Strategy

1. **Static Assets**: Edge caching with long TTL
2. **API Responses**: Short-lived cache (5 minutes) for models list
3. **Session Data**: No caching for user-specific data
4. **LLM Results**: Cache identical requests (same text + model) for cost optimization

### Error Handling

1. **API Error Responses**: Consistent error format with status codes
2. **Client-Side Error Boundaries**: Isolated component failures
3. **Retry Logic**: Automatic retry for transient LLM API failures
4. **Fallback UI**: Graceful degradation for all dynamic components
