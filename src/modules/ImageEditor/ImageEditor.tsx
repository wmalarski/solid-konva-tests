import { Component, lazy, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { isServer } from "solid-js/web";
import { ImageEditorValue } from "./ImageEditor.utils";

const CanvasStage = lazy(() => import("./CanvasStage/CanvasStage"));

export const ImageEditor: Component = () => {
  const [store, setStore] = createStore<ImageEditorValue>({
    path: "brown_sheep.jpg",
    samples: [
      { id: "1", shape: { height: 100, width: 150, x: 20, y: 55 } },
      { id: "2", shape: { height: 100, width: 150, x: 400, y: 205 } },
    ],
    tool: "selector",
  });

  return (
    <section class="flex grow flex-col border-2">
      <Show when={!isServer}>
        <CanvasStage value={store} onValueChange={setStore} />
      </Show>
    </section>
  );
};
