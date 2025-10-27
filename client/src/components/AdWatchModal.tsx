import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import GradientButton from "./GradientButton";
import { Play } from "lucide-react";

interface AdWatchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AdWatchModal({ open, onClose }: AdWatchModalProps) {
  const [progress, setProgress] = useState(0);
  const [watching, setWatching] = useState(false);
  const [completed, setCompleted] = useState(false);
  const adDuration = 30;
  const earnings = 0.50;

  useEffect(() => {
    if (!watching) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCompleted(true);
          return 100;
        }
        return prev + (100 / adDuration);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [watching]);

  const handleStart = () => {
    setWatching(true);
    setProgress(0);
    setCompleted(false);
  };

  const handleClose = () => {
    setWatching(false);
    setProgress(0);
    setCompleted(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-xl border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-mono">Watch Ad to Earn</DialogTitle>
          <DialogDescription>
            Watch the complete ad to earn ${earnings.toFixed(2)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!watching && !completed && (
            <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <GradientButton
                variant="purple"
                icon={Play}
                onClick={handleStart}
                className="text-lg px-8 py-6"
                testId="button-start-ad"
              >
                Start Watching
              </GradientButton>
            </div>
          )}

          {watching && !completed && (
            <div className="space-y-4">
              <div className="aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-6xl font-bold font-mono mb-2">
                      {Math.ceil((100 - progress) * adDuration / 100)}s
                    </p>
                    <p className="text-lg">Keep watching to earn...</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{Math.floor(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          )}

          {completed && (
            <div className="aspect-video bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-7xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold font-mono mb-2">
                  +${earnings.toFixed(2)}
                </h3>
                <p className="text-lg">Earnings added to your account!</p>
                <GradientButton
                  variant="green"
                  onClick={handleClose}
                  className="mt-6"
                  testId="button-close-ad"
                >
                  Collect Earnings
                </GradientButton>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
