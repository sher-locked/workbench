"use client";

import { useState, useEffect } from "react";
import { TextEditor } from "@/components/input/text-editor";
import { ModelSelector } from "@/components/input/model-selector";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function InputPage() {
  const [text, setText] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Apply no-scroll class when component mounts
  useEffect(() => {
    // Add no-scroll class to body
    document.body.classList.add('no-scroll');
    
    // Clean up function to remove class when component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    // Clear any previous errors when model is changed
    setError(null);
  };

  const handleAnalyze = async () => {
    // Validate inputs
    if (!text.trim()) {
      setError("Please enter some text to analyze");
      return;
    }

    if (!selectedModel) {
      setError("Please select a model for analysis");
      return;
    }

    // Clear any previous errors
    setError(null);
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // In the future, this will be where we make the API call to analyze the text
      console.log(`Analyzing text with model: ${selectedModel}`);
      
      // For now, simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would normally be where we'd navigate to the feedback page
      console.log("Analysis complete!");
      
    } catch (err) {
      console.error("Error during analysis:", err);
      setError("An error occurred during analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen max-h-screen overflow-hidden box-border m-0">
      <div className="max-w-4xl mx-auto w-full p-4 overflow-hidden" style={{ height: "50vh" }}>
        <div className="h-full flex flex-col">
          <div className="flex-none mb-2">
            <h2 className="text-lg font-medium">Enter Your Text</h2>
          </div>
          
          <div className="flex-grow overflow-hidden">
            <div className="h-full overflow-y-auto overflow-x-hidden border rounded-md">
              <TextEditor 
                value={text} 
                onChange={setText} 
                placeholder="Type or paste your text here for analysis..."
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-none p-4 border-t max-w-4xl mx-auto w-full">
        <h2 className="text-lg font-medium mb-2">Select Model</h2>
        <ModelSelector onModelSelect={handleModelSelect} />
        
        <div className="mt-4 mb-0">
          <Button 
            onClick={handleAnalyze} 
            disabled={isLoading || !text.trim() || !selectedModel}
            className="w-full"
          >
            {isLoading ? "Analyzing..." : "Analyze Text"}
          </Button>
          
          {error && (
            <p className="text-destructive text-sm mt-2">{error}</p>
          )}
        </div>
      </div>
    </main>
  );
} 