"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function TextEditorSkeleton() {
  return (
    <Card className="min-h-[300px]">
      <CardContent className="p-0">
        <Skeleton className="min-h-[300px]" />
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t px-4 py-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
      </CardFooter>
    </Card>
  );
}

export function ModelSelectorSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="pt-2">
              <Skeleton className="h-4 w-16 mb-2" />
              <div className="flex flex-wrap gap-1">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function FeedbackSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
      </CardContent>
    </Card>
  );
}

export function RewriteSkeleton() {
  return (
    <Card>
      <CardContent className="p-0">
        <Skeleton className="min-h-[300px]" />
      </CardContent>
      <CardFooter className="border-t px-4 py-2">
        <div className="space-y-2 w-full">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-4 w-full" />
        </div>
      </CardFooter>
    </Card>
  );
} 