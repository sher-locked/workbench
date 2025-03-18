"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  costPer1kTokens: number; // in INR
  performance: {
    speed: number; // 1-5
    quality: number; // 1-5
  };
  strengths: string[];
}

// Sample model data
const models: ModelInfo[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "OpenAI",
    costPer1kTokens: 15,
    performance: {
      speed: 3,
      quality: 5,
    },
    strengths: ["Creative writing", "Technical analysis", "Nuanced feedback"],
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    costPer1kTokens: 1.5,
    performance: {
      speed: 5,
      quality: 3,
    },
    strengths: ["Quick edits", "Grammar checks", "Basic suggestions"],
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    costPer1kTokens: 18,
    performance: {
      speed: 3,
      quality: 5,
    },
    strengths: ["Detailed feedback", "Literary analysis", "Stylistic improvements"],
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    provider: "Anthropic",
    costPer1kTokens: 6,
    performance: {
      speed: 4,
      quality: 4,
    },
    strengths: ["Balanced speed/quality", "Style consistency", "Flow improvements"],
  },
];

export function ModelSelector({ 
  onModelSelect 
}: { 
  onModelSelect?: (modelId: string) => void 
}) {
  const [selectedModel, setSelectedModel] = useState<ModelInfo | null>(null);

  const handleModelChange = (modelId: string) => {
    const model = models.find((m) => m.id === modelId) || null;
    setSelectedModel(model);
    if (onModelSelect) {
      onModelSelect(modelId);
    }
  };

  // Helper function to render stars for performance ratings
  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={handleModelChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>OpenAI</SelectLabel>
            {models
              .filter((model) => model.provider === "OpenAI")
              .map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Anthropic</SelectLabel>
            {models
              .filter((model) => model.provider === "Anthropic")
              .map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedModel && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Cost (per 1k tokens)</span>
                <span className="text-sm">₹{selectedModel.costPer1kTokens.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Speed</span>
                <span className="text-sm text-yellow-500">
                  {renderStars(selectedModel.performance.speed)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Quality</span>
                <span className="text-sm text-yellow-500">
                  {renderStars(selectedModel.performance.quality)}
                </span>
              </div>
              <div className="pt-2">
                <span className="text-sm font-medium">Best for:</span>
                <div className="flex flex-wrap gap-1 pt-1">
                  {selectedModel.strengths.map((strength, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 