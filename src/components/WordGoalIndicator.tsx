import React, { useState, useMemo, useEffect } from 'react';
import { Target, Edit2, Check, Trophy, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import confetti from 'canvas-confetti';

interface WordGoalIndicatorProps {
  wordCount: number;
  className?: string;
}

export function WordGoalIndicator({ wordCount, className }: WordGoalIndicatorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [goalInput, setGoalInput] = useState('');
  const [showGoalReachedDialog, setShowGoalReachedDialog] = useState(false);
  const [goalReachedAcknowledged, setGoalReachedAcknowledged] = useState(false);
  
  // Try to load goal from localStorage or default to 0 (no goal)
  const [wordGoal, setWordGoal] = useState<number>(() => {
    const savedGoal = localStorage.getItem('markdown-editor-word-goal');
    return savedGoal ? parseInt(savedGoal) : 0;
  });

  // Calculate progress percentage
  const progress = useMemo(() => {
    if (!wordGoal) return 0;
    return Math.min(100, Math.round((wordCount / wordGoal) * 100));
  }, [wordCount, wordGoal]);

  // Show congratulations dialog when goal is reached
  useEffect(() => {
    if (wordGoal && progress >= 100 && !goalReachedAcknowledged) {
      setShowGoalReachedDialog(true);
    }
  }, [progress, wordGoal, goalReachedAcknowledged]);

  // Save goal to localStorage
  const saveGoal = (goal: number) => {
    setWordGoal(goal);
    localStorage.setItem('markdown-editor-word-goal', goal.toString());
    setIsEditing(false);
    setGoalReachedAcknowledged(false);
  };

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goal = parseInt(goalInput);
    if (!isNaN(goal) && goal > 0) {
      saveGoal(goal);
    }
    setGoalInput('');
  };

  // Handle clearing the goal
  const clearGoal = () => {
    setWordGoal(0);
    localStorage.removeItem('markdown-editor-word-goal');
    setGoalReachedAcknowledged(false);
  };

  // Handle closing the goal reached dialog
  const handleCloseGoalDialog = () => {
    setShowGoalReachedDialog(false);
    setGoalReachedAcknowledged(true);
    
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Render editing form
  if (isEditing) {
    return (
      <form 
        className={cn("flex items-center gap-2 bg-muted/50 rounded-md p-2", className)}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="word-goal" className="text-xs font-medium">
            Set Word Goal
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="word-goal"
              type="number"
              placeholder="Word count target"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              className="h-8 w-28 text-sm"
              min={1}
              autoFocus
            />
            <div className="flex gap-1">
              <Button 
                type="submit" 
                size="sm" 
                className="h-8 px-3"
              >
                <Check size={14} className="mr-1" />
                Set
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="h-8 px-3"
                onClick={() => setIsEditing(false)}
              >
                <X size={14} className="mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  // Render "Set goal" button when no goal is set
  if (!wordGoal) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 text-sm px-3 flex items-center gap-1 hover:bg-primary/10"
          onClick={() => setIsEditing(true)}
        >
          <Target size={14} className="text-primary" />
          Set writing goal
        </Button>
      </div>
    );
  }

  // Render progress indicator
  return (
    <>
      <div className={cn("flex items-center gap-3 rounded-md p-1.5", className)}>
        <div className="flex items-center gap-1.5 min-w-[4rem]">
          <Target size={14} className={cn("opacity-70", progress >= 100 && "text-green-500")} />
          <span className="text-sm font-medium">
            {wordCount}/{wordGoal}
          </span>
        </div>
        
        <div className="flex-1 flex items-center gap-2 max-w-[180px]">
          <div className="flex-1">
            <Progress 
              value={progress} 
              className="h-2" 
              indicatorClassName={cn(
                progress >= 100 ? "bg-green-500" : 
                progress >= 75 ? "bg-amber-500" : 
                "bg-primary"
              )}
            />
            {progress >= 100 && (
              <p className="text-xs font-medium text-green-500 mt-1">
                Goal reached! 🎉
              </p>
            )}
          </div>
          
          <div className="flex flex-shrink-0 gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 rounded-full"
              onClick={() => setIsEditing(true)}
              title="Edit goal"
            >
              <Edit2 size={12} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 rounded-full text-muted-foreground hover:text-destructive"
              onClick={clearGoal}
              title="Clear goal"
            >
              <X size={12} />
            </Button>
          </div>
        </div>
      </div>

      {/* Goal reached dialog */}
      <Dialog open={showGoalReachedDialog} onOpenChange={setShowGoalReachedDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-xl gap-2">
              <Trophy className="h-6 w-6 text-green-500" />
              Congratulations!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              You've reached your writing goal of {wordGoal} words!
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 flex justify-center">
            <div className="bg-green-500/10 rounded-full p-6">
              <Trophy size={48} className="text-green-500" />
            </div>
          </div>

          <DialogFooter className="flex justify-center sm:justify-center gap-2">
            <Button 
              onClick={handleCloseGoalDialog}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              Awesome!
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowGoalReachedDialog(false);
                setGoalReachedAcknowledged(true);
                setIsEditing(true);
              }}
              className="w-full"
            >
              Set new goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default WordGoalIndicator; 