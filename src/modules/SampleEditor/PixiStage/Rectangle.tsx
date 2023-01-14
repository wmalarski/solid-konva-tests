import * as PIXI from "pixi.js";
import { Component, createEffect, onCleanup, onMount } from "solid-js";
import { Sample } from "../SampleEditor.utils";
import { usePixiContext } from "./PixiContext";

type Props = {
  sample: Sample;
  onDragStart: (target: PIXI.DisplayObject) => void;
};

export const Rectangle: Component<Props> = (props) => {
  const ctx = usePixiContext();

  const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);

  sprite.alpha = 1;
  sprite.interactive = true;
  sprite.cursor = "pointer";
  sprite.anchor.set(0.5);

  onMount(() => {
    ctx.app.stage.addChild(sprite);
  });

  onCleanup(() => {
    ctx.app.stage.removeChild(sprite);
  });

  const onDragStart = () => {
    sprite.alpha = 0.5;
    // TODO: fix anchor to correct position
    props.onDragStart(sprite);
  };

  onMount(() => {
    sprite.on("pointerdown", onDragStart);
  });

  onCleanup(() => {
    sprite.off("pointerdown", onDragStart);
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

  return null;
};
