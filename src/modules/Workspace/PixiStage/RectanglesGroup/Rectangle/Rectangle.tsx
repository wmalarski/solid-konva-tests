import * as PIXI from "pixi.js";
import { Component, createEffect, onCleanup, onMount } from "solid-js";
import { useWorkspaceContext } from "~/modules/Workspace/WorkspaceContext";
import { Sample, Tool, useSelectedId } from "../../../Workspace.utils";
import { usePixiContext } from "../../PixiContext";
import { useDragObject } from "../useDragObject";

type Props = {
  sample: Sample;
  tool: Tool;
};

export const Rectangle: Component<Props> = (props) => {
  const pixi = usePixiContext();
  const workspace = useWorkspaceContext();
  const { selectedId, setSelectedId } = useSelectedId();

  const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);

  sprite.alpha = 0.3;
  sprite.interactive = true;
  sprite.cursor = "pointer";
  sprite.anchor.set(0.5);

  onMount(() => {
    pixi.app.stage.addChild(sprite);
  });

  onCleanup(() => {
    pixi.app.stage.removeChild(sprite);
  });

  createEffect(() => {
    if (props.tool === "selector") {
      useDragObject({
        onDragEnd: () => {
          workspace.onChange(
            "samples",
            (sample) => sample.id === props.sample.id,
            "shape",
            "x",
            sprite.x
          );
          workspace.onChange(
            "samples",
            (sample) => sample.id === props.sample.id,
            "shape",
            "y",
            sprite.y
          );
        },
        onDragStart: () => {
          if (selectedId() !== props.sample.id) {
            setSelectedId(props.sample.id);
          }
        },
        sprite,
      });
    }
  });

  createEffect(() => {
    sprite.x = props.sample.shape.x;
  });

  createEffect(() => {
    sprite.y = props.sample.shape.y;
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

  return null;
};
