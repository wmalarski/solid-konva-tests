import * as PIXI from "pixi.js";
import { createEffect, onCleanup, onMount } from "solid-js";
import { Sample, Tool, useSelectedId } from "../../../Workspace.utils";

type Props = {
  container: PIXI.Container;
  sample: Sample;
  tool: Tool;
};

export const createSprite = (props: Props) => {
  const { selectedId } = useSelectedId();

  const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);

  sprite.alpha = 0.3;
  sprite.interactive = true;
  sprite.cursor = "pointer";

  onMount(() => {
    props.container.addChild(sprite);
  });
  onCleanup(() => {
    props.container.removeChild(sprite);
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
};
