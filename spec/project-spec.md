# clarifi-spec.md

## User Experience and Flow Specification

| Feature Name | Description | Priority | Status |
|-------------|-------------|----------|--------|
| **Landing Page** | Sleek, minimal landing page with title, subtitle, and CTA to Input Page. Future versions will include motion primitives. | P1 | Not Started |
| **Input Text Box** | Hero component for pasting text content with character count and formatting options. | P0 | Not Started |
| **Model Selector** | Context-rich dropdown allowing selection of 1-3 LLM models with visual cues for cost (INR), performance, and strengths. | P0 | Not Started |
| **Analysis Button** | Primary CTA that processes input text with selected models and creates a unique session ID. | P0 | Not Started |
| **Feedback Rendering** | Visually structured display of LLM feedback following the configured prompt structure. | P0 | Not Started |
| **Improvement Selection** | Interactive UI for selecting/deselecting suggested improvements before applying them. | P0 | Not Started |
| **Navigation Controls** | Secondary CTA to return to Input and primary CTA to continue to Rewrite. | P0 | Not Started |
| **Rewrite Visualization** | Clean, formatted display of rewritten text with option to toggle change highlighting. | P0 | Not Started |
| **Token & Cost Display** | Per-session display of token usage and cost calculation in INR. | P0 | Not Started |
| **Multi-model Comparison** | Side-by-side or tabbed interface to compare feedback and rewrites across models. | P1 | Not Started |
| **Top Navigation Bar** | Sleek header with title and CTAs to Configuration and History pages. | P0 | Not Started |
| **Configuration Page** | Display-only view of feedback and rewrite prompts (editable in future versions). | P0 | Not Started |
| **Usage Statistics** | Dashboard showing total sessions, tokens used, and costs incurred. | P1 | Not Started |
| **Cost Analytics** | Bar chart visualization of per-model cost metrics. | P2 | Not Started |
| **Session History** | Searchable list of all past sessions with summary data. | P1 | Not Started |
| **Session Detail View** | Read-only recreation of the complete session flow for any historical session. | P1 | Not Started |
| **Document Upload** | Ability to upload documents rather than pasting text. | P2 | Not Started |
| **Link Analysis** | Ability to analyze content from a provided URL. | P2 | Not Started |
| **User Accounts** | Personal accounts to track history and preferences. | P2 | Not Started |
| **Progress Tracking** | Visualization of writing improvement over time. | P2 | Not Started |
| **Template Saving** | Save preferred model and improvement combinations. | P2 | Not Started |

## Component Details

### Landing Page
- Minimalistic design with logo, tagline, and primary CTA
- Future integration with motion primitives for enhanced visual appeal
- No authentication required for initial version

### Input Page
- Distraction-free writing environment with character count
- Model selector with grouped options by provider:
  - OpenAI (GPT-4, GPT-3.5)
  - Anthropic (Claude 3, Claude 2)
  - Future: Deepseek, Grok, Gemini
- Each model displays:
  - Estimated cost per 1000 tokens (INR)
  - Performance rating (speed, quality)
  - Specialized strengths (creative, technical, etc.)
- Analysis button triggers processing and creates session ID

### Feedback Page
- Structured display of feedback following JSON response format:
  - Summary dashboard with ratings
  - Storytelling analysis (setup, conflict, resolution)
  - Reasoning analysis (premise, evidence, conclusion)
  - Grammar and style notes
  - Context and inference notes
- Interactive checklist of suggested improvements
- Navigation options to return to input or proceed to rewrite
- Multi-model comparison via tabbed interface (future enhancement)

### Rewrite Page
- Clean display of improved text
- Toggle to highlight changes (additions, deletions, modifications)
- Display of processing statistics (tokens, cost)
- Subtle CTA to start new session

### Configuration Page
- Display of current feedback and rewrite prompts
- Read-only in initial version
- Future: editable with templating options

### History Page
- Usage metrics dashboard
- Bar chart visualization of costs by model
- Searchable, sortable list of past sessions
- Each session entry shows:
  - Date/time
  - Auto-generated summary title
  - Input/output token count
  - Cost
  - Models used

### Session Detail Page
- Complete read-only recreation of session
- Ability to export or share session data
