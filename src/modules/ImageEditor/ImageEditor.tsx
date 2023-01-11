import { Component, lazy, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { isServer } from "solid-js/web";
import { ImageEditorValue } from "./ImageEditor.utils";

const CanvasStage = lazy(() => import("./CanvasStage/CanvasStage"));

export const ImageEditor: Component = () => {
  const [store, setStore] = createStore<ImageEditorValue>({
    path: "brown_sheep.jpg",
  });

  return (
    <section class="border-base-300 flex grow flex-col border-2 bg-base-300">
      <Show when={!isServer}>
        <CanvasStage value={store} onValueChange={setStore} />
      </Show>
    </section>
  );
};
