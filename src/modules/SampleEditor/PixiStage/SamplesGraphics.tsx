import { Component, For } from "solid-js";
import { Sample } from "../SampleEditor.utils";
import { createDragging } from "./createDragging";
import { Rectangle } from "./Rectangle";
import { useDeselect } from "./useDeselect";

type Props = {
  samples: Sample[];
};

export const SamplesGraphics: Component<Props> = (props) => {
  useDeselect();

  const { onDragStart } = createDragging();

  return (
    <For each={props.samples}>
      {(sample) => <Rectangle onDragStart={onDragStart} sample={sample} />}
    </For>
  );
};
