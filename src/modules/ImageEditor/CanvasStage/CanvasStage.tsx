import Konva from "konva";
import { Component, createMemo, createSignal } from "solid-js";
import { ImageEditorValue } from "../ImageEditor.utils";
import { createZoom, useContainerReshape } from "./CanvasStage.utils";
import { ShapesLayer } from "./ShapesLayer/ShapesLayer";

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

  useContainerReshape({
    container,
    stage,
  });

  createZoom({
    stage,
  });

  return (
    <div ref={setContainer} class="grow">
      <ShapesLayer path={props.value.path} stage={stage()} />
    </div>
  );
};

export default CanvasStage;
