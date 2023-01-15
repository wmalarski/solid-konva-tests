import * as PIXI from "pixi.js";
import { Component, createEffect, onCleanup, onMount } from "solid-js";
import { Sample, Tool } from "../../../../Workspace.utils";
import { usePixiContext } from "../../../PixiContext";

type Props = {
  sprite: PIXI.Sprite;
  sample: Sample;
  tool: Tool;
};

export const Transformer: Component<Props> = (props) => {
  const pixi = usePixiContext();

  const anchor = new PIXI.Sprite(PIXI.Texture.WHITE);

  anchor.alpha = 0.3;
  anchor.interactive = true;
  anchor.cursor = "pointer";
  anchor.anchor.set(0.5);

  onMount(() => {
    pixi.app.stage.addChild(anchor);
  });

  onCleanup(() => {
    pixi.app.stage.removeChild(anchor);
  });

  createEffect(() => {
    anchor.position = props.sprite.position;
  });

  return null;
};
