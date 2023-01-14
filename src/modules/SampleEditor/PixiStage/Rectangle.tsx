import * as PIXI from "pixi.js";
import { Component, createEffect, onCleanup, onMount } from "solid-js";
import { Sample } from "../SampleEditor.utils";
import { usePixiContext } from "./PixiContext";

type Props = {
  sample: Sample;
};

export const Rectangle: Component<Props> = (props) => {
  const ctx = usePixiContext();

  const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);

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

  onMount(() => {
    ctx.app.stage.addChild(sprite);
  });

  onCleanup(() => {
    ctx.app.stage.removeChild(sprite);
  });

  return null;
};
