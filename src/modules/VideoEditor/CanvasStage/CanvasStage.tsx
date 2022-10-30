import Konva from "konva";
import { Component, createMemo, createSignal, Show } from "solid-js";
import { VideoEditorValue } from "../VideoEditor.utils";
import { useContainerReshape } from "./CanvasStage.utils";
import { ShapesLayer } from "./ShapesLayer/ShapesLayer";

type Props = {
  value: VideoEditorValue;
  onValueChange: (value: VideoEditorValue) => void;
};

const CanvasStage: Component<Props> = () => {
  const [container, setContainer] = createSignal<HTMLDivElement>();

  const stage = createMemo(() => {
    const element = container();
    return element && new Konva.Stage({ container: element });
  });

  useContainerReshape({ container, stage });

  return (
    <div ref={setContainer} class="grow">
      <Show when={stage()} keyed>
        {(value) => (
          <>
            <ShapesLayer stage={value} />
          </>
        )}
      </Show>
    </div>
  );
};

export default CanvasStage;
