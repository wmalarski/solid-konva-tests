import { Component, createSignal, For, lazy, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { isServer } from "solid-js/web";
import { SampleCard } from "./SampleCard/SampleCard";
import { SampleEditorValue } from "./SampleEditor.utils";
import { ToolSelector } from "./ToolSelector/ToolSelector";

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
        <ToolSelector tool={store.tool} onValueChange={setStore} />
        <For each={store.samples}>
          {(sample) => <SampleCard onValueChange={setStore} sample={sample} />}
        </For>
      </div>
    </section>
  );
};
