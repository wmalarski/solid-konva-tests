import Konva from "konva";
import { Component, createMemo, createSignal } from "solid-js";
import { VideoEditorValue } from "../VideoEditor.utils";
import { useContainerReshape } from "./CanvasStage.utils";
import { createShapesLayer } from "./ShapesLayer/createShapesLayer";
import { createVideoLayer } from "./VideoLayer/createVideoLayer";

type Props = {
  value: VideoEditorValue;
  onValueChange: (value: VideoEditorValue) => void;
};

const CanvasStage: Component<Props> = (props) => {
  const [container, setContainer] = createSignal<HTMLDivElement>();

  const stage = createMemo(() => {
    const element = container();
    return element && new Konva.Stage({ container: element });
  });

  useContainerReshape({ container, stage });

  createVideoLayer({
    onValueChange: props.onValueChange,
    stage,
    value: props.value,
  });

  createShapesLayer({
    stage,
  });

  return <div ref={setContainer} class="grow" />;
};

export default CanvasStage;
