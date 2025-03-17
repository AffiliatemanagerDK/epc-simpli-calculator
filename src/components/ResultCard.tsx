
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ResultCardProps {
  label: string;
  value: string;
  description?: string;
  delay?: number;
}

const ResultCard = ({ label, value, description, delay = 0 }: ResultCardProps) => {
  return (
    <Card className="result-card overflow-hidden" style={{ animationDelay: `${delay}ms` }}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <p className="result-value">{value}</p>
          <p className="result-label mt-1">{label}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
