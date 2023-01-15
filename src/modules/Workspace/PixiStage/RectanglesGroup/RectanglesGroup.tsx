import { Component, createEffect, For } from "solid-js";
import { Sample, Tool } from "../../Workspace.utils";
import { Rectangle } from "./Rectangle/Rectangle";
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

  return (
    <For each={props.samples}>
      {(sample) => <Rectangle sample={sample} tool={props.tool} />}
    </For>
  );
};
