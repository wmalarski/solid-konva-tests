import Konva from "konva";
import { Component, createMemo, createSignal, Show } from "solid-js";
import { useContainerReshape } from "./CanvasCard.utils";
import { ShapesLayer } from "./ShapesLayer/ShapesLayer";

const CanvasCard: Component = () => {
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

export default CanvasCard;
