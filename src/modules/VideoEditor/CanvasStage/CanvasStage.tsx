import Konva from "konva";
import { Component, createMemo, createSignal } from "solid-js";
import { VideoEditorValue } from "../VideoEditor.utils";
import { useContainerReshape } from "./CanvasStage.utils";
import { createShapesLayer } from "./ShapesLayer/createShapesLayer";

type Props = {
  value: VideoEditorValue;
  onValueChange: (value: VideoEditorValue) => void;
};

const CanvasStage: Component<Props> = (props) => {
  const [container, setContainer] = createSignal<HTMLDivElement>();

  const [frame, setFrame] = createSignal(0);
  const [fps, setFps] = createSignal(0);

  const stage = createMemo(() => {
    const element = container();
    return element && new Konva.Stage({ container: element });
  });

  useContainerReshape({ container, stage });

  createShapesLayer({
    stage,
  });

  return <div ref={setContainer} class="grow" />;
};

export default CanvasStage;
