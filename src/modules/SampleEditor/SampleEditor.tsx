import { Component, createSignal, For, lazy, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { isServer } from "solid-js/web";
import { SampleEditorValue } from "./SampleEditor.utils";

const PixiStage = lazy(() => import("./PixiStage/PixiStage"));

export const SampleEditor: Component = () => {
  const [container, setContainer] = createSignal<HTMLDivElement>();

  const [store, setStore] = createStore<SampleEditorValue>({
    path: "brown_sheep.jpg",
    samples: [
      {
        id: "1",
        shape: { height: 100, width: 150, x: 20, y: 55 },
      },
      {
        id: "2",
        shape: { height: 100, width: 150, x: 400, y: 205 },
      },
    ],
    tool: "selector",
  });

  return (
    <section class="flex grow flex-row border-2">
      <Show when={!isServer}>
        <div ref={setContainer} class="grow" />
        <Show when={container()} keyed>
          {(element) => (
            <PixiStage
              container={element}
              value={store}
              onValueChange={setStore}
            />
          )}
        </Show>
      </Show>
      <div>
        <For each={store.samples}>
          {(sample) => <pre>{JSON.stringify(sample, null, 2)}</pre>}
        </For>
      </div>
    </section>
  );
};
