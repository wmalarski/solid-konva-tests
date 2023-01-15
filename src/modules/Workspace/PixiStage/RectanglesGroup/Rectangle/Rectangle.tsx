import * as PIXI from "pixi.js";
import { Component, createEffect, onCleanup, onMount, Show } from "solid-js";
import { useWorkspaceContext } from "~/modules/Workspace/WorkspaceContext";
import { Sample, Tool, useSelectedId } from "../../../Workspace.utils";
import { usePixiContext } from "../../PixiContext";
import { useDragObject } from "../useDragObject";
import { createLabel } from "./createLabel";
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
  const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
  container.addChild(sprite);

  sprite.alpha = 0.3;
  sprite.interactive = true;
  sprite.cursor = "pointer";

  onMount(() => {
    pixi.app.stage.addChild(container);
  });
  onCleanup(() => {
    pixi.app.stage.removeChild(container);
  });

  createLabel({ container, sample: props.sample });

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
  createEffect(() => {
    sprite.height = props.sample.shape.height;
  });
  createEffect(() => {
    sprite.width = props.sample.shape.width;
  });

  createEffect(() => {
    const isSelected = selectedId() === props.sample.id;
    sprite.tint = isSelected ? 0xff0000 : 0x000000;
  });
  createEffect(() => {
    sprite.cursor = props.tool !== "selector" ? "default" : "pointer";
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
