"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export function TextEditor({
  value,
  onChange,
  placeholder = "Enter your text here...",
  maxLength = 10000,
}: TextEditorProps) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  // Calculate color for character count (green to amber to red as it approaches max)
  const getCountColor = () => {
    if (!maxLength) return "text-green-500";
    const ratio = charCount / maxLength;
    if (ratio < 0.7) return "text-green-500";
    if (ratio < 0.9) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card className="min-h-[300px] h-full flex flex-col border-0">
      <CardContent className="p-0 flex-grow overflow-hidden">
        <Textarea
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder}
          className="min-h-[300px] h-full w-full resize-none border-0 p-4 focus-visible:ring-0 focus-visible:ring-transparent overflow-y-auto"
        />
      </CardContent>
      <CardFooter className="flex-none flex items-center justify-between border-t px-4 py-2">
        <div className="text-sm text-muted-foreground">
          Plain text formatting
        </div>
        <div className={`text-sm ${getCountColor()}`}>
          {charCount} / {maxLength} characters
        </div>
      </CardFooter>
    </Card>
  );
} 