import Konva from "konva";
import { Component, createMemo, createSignal } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { ImageEditorValue, Sample } from "../ImageEditor.utils";
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

  const handleSamplesChange = (sample: Sample) => {
    const index = props.value.samples.findIndex((e) => e.id === sample.id);
    props.onValueChange("samples", index, sample);
  };

  return (
    <>
      <button
        onClick={() => {
          console.log(
            stage()
              ?.getLayers()
              .flatMap((l) => l.children)
          );
        }}
      >
        Change
      </button>
      <div ref={setContainer} class="grow" />
      <ShapesLayer
        path={props.value.path}
        stage={stage()}
        samples={props.value.samples}
        onSampleChange={handleSamplesChange}
        onValueChange={props.onValueChange}
      />
    </>
  );
};

export default CanvasStage;
