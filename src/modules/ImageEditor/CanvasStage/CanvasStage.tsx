import Konva from "konva";
import { Component, createMemo, createSignal } from "solid-js";
import { ImageEditorValue } from "../ImageEditor.utils";
import { useContainerReshape } from "./CanvasStage.utils";
import { createZoom } from "./createZoom";
import { createImageLayer } from "./ImageLayer/createImageLayer";
import { createShapesLayer } from "./ShapesLayer/createShapesLayer";

type Props = {
  value: ImageEditorValue;
  onValueChange: (value: ImageEditorValue) => void;
};

const CanvasStage: Component<Props> = (props) => {
  const [container, setContainer] = createSignal<HTMLDivElement>();

  const stage = createMemo(() => {
    const element = container();
    return element && new Konva.Stage({ container: element });
  });

  useContainerReshape({ container, stage });

  createShapesLayer({
    stage,
  });

  createImageLayer({
    path: props.value.path,
    stage,
  });

  createZoom({
    stage,
  });

  return <div ref={setContainer} class="grow" />;
};

export default CanvasStage;
