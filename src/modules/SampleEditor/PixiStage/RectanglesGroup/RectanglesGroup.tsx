import { Component, createEffect, For } from "solid-js";
import { Sample, Tool } from "../../SampleEditor.utils";
import { createRectangleDrag } from "./createRectangleDrag";
import { Rectangle } from "./Rectangle";
import { useCreator } from "./useCreator";
import { useDeselect } from "./useDeselect";

type Props = {
  samples: Sample[];
  tool: Tool;
};

export const RectanglesGroup: Component<Props> = (props) => {
  createEffect(() => {
    if (props.tool === "selector") {
      useDeselect();
    } else if (props.tool === "creator") {
      useCreator();
    }
  });

  const { onDragStart } = createRectangleDrag();

  return (
    <For each={props.samples}>
      {(sample) => (
        <Rectangle
          onDragStart={onDragStart}
          sample={sample}
          tool={props.tool}
        />
      )}
    </For>
  );
};
