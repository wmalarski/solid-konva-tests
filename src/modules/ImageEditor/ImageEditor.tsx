import { Component, For, lazy, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { isServer } from "solid-js/web";
import { ImageEditorValue } from "./ImageEditor.utils";
import { ToolSelector } from "./ToolSelector/ToolSelector";

const CanvasStage = lazy(() => import("./CanvasStage/CanvasStage"));

export const ImageEditor: Component = () => {
  const [store, setStore] = createStore<ImageEditorValue>({
    path: "brown_sheep.jpg",
    samples: [
      {
        id: "1",
        isSelected: false,
        shape: { height: 100, width: 150, x: 20, y: 55 },
      },
      {
        id: "2",
        isSelected: false,
        shape: { height: 100, width: 150, x: 400, y: 205 },
      },
    ],
    tool: "selector",
  });

  return (
    <section class="flex grow flex-row border-2">
      <Show when={!isServer}>
        <CanvasStage value={store} onValueChange={setStore} />
      </Show>
      <div>
        <ToolSelector onValueChange={setStore} value={store} />
        <For each={store.samples}>
          {(sample) => <pre>{JSON.stringify(sample, null, 2)}</pre>}
        </For>
      </div>
    </section>
  );
};
