import Konva from "konva";
import { Component, createMemo, createSignal } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { ImageEditorValue } from "../ImageEditor.utils";
import { createZoom, useContainerReshape } from "./CanvasStage.utils";
import { ShapesLayer } from "./ShapesLayer/ShapesLayer";

type Props = {
  value: ImageEditorValue;
  onValueChange: SetStoreFunction<ImageEditorValue>;
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
    <>
      <div ref={setContainer} class="grow" />
      <ShapesLayer
        path={props.value.path}
        stage={stage()}
        samples={props.value.samples}
        onValueChange={props.onValueChange}
      />
    </>
  );
};

export default CanvasStage;
