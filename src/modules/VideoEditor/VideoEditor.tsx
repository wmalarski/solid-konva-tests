import { Component, lazy, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { isServer } from "solid-js/web";
import { VideoEditorValue } from "./VideoEditor.utils";

const CanvasStage = lazy(() => import("./CanvasStage/CanvasStage"));

export const VideoEditor: Component = () => {
  const [store, setStore] = createStore<VideoEditorValue>({
    href: "",
  });

  return (
    <section class="border-base-300 flex grow flex-col border-2">
      <Show when={!isServer}>
        <CanvasStage value={store} onValueChange={setStore} />
      </Show>
    </section>
  );
};
