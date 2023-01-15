import * as PIXI from "pixi.js";
import { Component, createEffect, onCleanup, onMount, Show } from "solid-js";
import { useWorkspaceContext } from "~/modules/Workspace/WorkspaceContext";
import { Sample, Tool, useSelectedId } from "../../../Workspace.utils";
import { usePixiContext } from "../../PixiContext";
import { useDragObject } from "../useDragObject";
import { createLabel } from "./createLabel";
import { createSprite } from "./createSprite";
import { Transformer } from "./Transformer/Transformer";

type Props = {
  sample: Sample;
  tool: Tool;
};

export const Rectangle: Component<Props> = (props) => {
  const pixi = usePixiContext();
  const workspace = useWorkspaceContext();
  const { selectedId, setSelectedId } = useSelectedId();

  const container = new PIXI.Container();

  createLabel({ container, sample: props.sample });
  createSprite({ container, sample: props.sample, tool: props.tool });

  onMount(() => {
    pixi.app.stage.addChild(container);
  });
  onCleanup(() => {
    pixi.app.stage.removeChild(container);
  });

  createEffect(() => {
    if (props.tool !== "selector") {
      return;
    }

    useDragObject({
      displayObject: container,
      onDragEnd: () => {
        workspace.onChange(
          "samples",
          (sample) => sample.id === props.sample.id,
          "shape",
          "x",
          container.x
        );
        workspace.onChange(
          "samples",
          (sample) => sample.id === props.sample.id,
          "shape",
          "y",
          container.y
        );
      },
      onDragStart: () => {
        if (selectedId() !== props.sample.id) {
          setSelectedId(props.sample.id);
        }
      },
    });
  });

  createEffect(() => {
    container.x = props.sample.shape.x;
  });
  createEffect(() => {
    container.y = props.sample.shape.y;
  });

  return (
    <Show when={props.tool === "selector" && selectedId() === props.sample.id}>
      <Transformer
        sample={props.sample}
        tool={props.tool}
        container={container}
      />
    </Show>
  );
};
