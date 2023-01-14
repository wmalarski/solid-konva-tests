import { Component, createEffect, For } from "solid-js";
import { Sample, Tool } from "../../Workspace.utils";
import { Rectangle } from "./Rectangle/Rectangle";
import { useCreator } from "./useCreator";
import { useDeselect } from "./useDeselect";
import { useDrag } from "./useDrag";

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

  const { onDragStart } = useDrag();

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
