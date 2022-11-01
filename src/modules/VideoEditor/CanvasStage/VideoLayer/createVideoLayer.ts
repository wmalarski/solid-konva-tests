import { createVideoImage } from "./createVideoImage";

type CreateVideoLayer = {
  fps: () => number;
  frame: () => number;
  path: () => string;
  onDurationChange: (duration: number) => void;
};

export const createVideoLayer = ({
  fps,
  frame,
  onDurationChange,
  path,
}: CreateVideoLayer) => {
  createVideoImage({
    fps,
    frame,
    onDurationChange,
    path,
  });
  //
};
