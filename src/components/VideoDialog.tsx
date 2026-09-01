import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import demoVideo from "@/assets/flect-demo.mp4.asset.json";

const VideoDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={() => setOpen(true)}
        className="text-base px-8 py-6 font-semibold rounded-full border-2 border-foreground/15 hover:border-foreground/40 bg-transparent"
      >
        <Play className="mr-2 h-5 w-5" />
        Voir la vidéo
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-ink border-0 rounded-2xl">
          <DialogTitle className="sr-only">Vidéo de présentation Flect</DialogTitle>
          {open && (
            <video
              src={demoVideo.url}
              controls
              autoPlay
              playsInline
              className="w-full aspect-video bg-ink"
            >
              Votre navigateur ne prend pas en charge la lecture vidéo.
            </video>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoDialog;
