import Konva from "konva";
import { createEffect, createSignal, onCleanup } from "solid-js";

type Props = {
  fps: () => number;
  frame: () => number;
  path: () => string;
  onDurationChange: (duration: number) => void;
};

export const createVideoImage = ({
  fps,
  frame,
  path,
  onDurationChange,
}: Props): Konva.Image => {
  const [width, setWidth] = createSignal(0);
  const [height, setHeight] = createSignal(0);

  const videoElement = document.createElement("video");
  videoElement.autoplay = false;

  createEffect(() => {
    videoElement.src = path();
  });

  const onLoadedCallback = () => {
    setWidth(videoElement.videoWidth);
    setHeight(videoElement.videoHeight);
    videoElement.currentTime = 0;
    const durationSeconds = videoElement.duration;
    const framesDuration = Math.floor(durationSeconds * fps());
    onDurationChange(framesDuration);
  };

  videoElement.addEventListener("loadedmetadata", onLoadedCallback);
  onCleanup(() => {
    videoElement.removeEventListener("loadedmetadata", onLoadedCallback);
  });

  createEffect(() => {
    videoElement.currentTime = frame() / fps();
  });

  const image = new Konva.Image({ image: videoElement });
  createEffect(() => image.height(height()));
  createEffect(() => image.width(width()));

  const layer = image.getLayer();
  const anim = new Konva.Animation(() => void 0, layer);
  anim.start();
  onCleanup(() => {
    anim.stop();
  });

  return image;
};
