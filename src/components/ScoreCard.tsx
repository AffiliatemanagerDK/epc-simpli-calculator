
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface ScoreCardProps {
  score: number;
  label: string;
  description?: string;
  tooltip?: string;
  delay?: number;
}

// Function to get color based on score (0-10)
const getScoreColor = (score: number): string => {
  if (score < 3) return 'bg-red-500'; // Poor score
  if (score < 5) return 'bg-yellow-500'; // Average score
  if (score < 7) return 'bg-green-400'; // Good score
  return 'bg-green-600'; // Excellent score
};

// Function to get text color based on score
const getScoreTextColor = (score: number): string => {
  if (score < 3) return 'text-red-500'; // Poor score
  if (score < 5) return 'text-yellow-500'; // Average score
  if (score < 7) return 'text-green-400'; // Good score
  return 'text-green-600'; // Excellent score
};

const ScoreCard = ({ score, label, description, tooltip, delay = 0 }: ScoreCardProps) => {
  const progressColor = getScoreColor(score);
  const textColor = getScoreTextColor(score);
  
  return (
    <Card className="result-card overflow-hidden" style={{ animationDelay: `${delay}ms` }}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-full mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">0</span>
              <span className={`text-3xl font-bold ${textColor}`}>{score.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">10</span>
            </div>
            <Progress 
              value={score * 10} 
              className="h-2.5 bg-gray-200"
              indicatorClassName={progressColor}
            />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <p className="result-label">{label}</p>
            {tooltip && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
