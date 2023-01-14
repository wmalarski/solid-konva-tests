import * as PIXI from "pixi.js";
import { Component, createEffect } from "solid-js";

type Props = {
  graphics: PIXI.Graphics;
};

export const Rectangle: Component<Props> = (props) => {
  // const ctx = usePixiContext();

  createEffect(() => {
    props.graphics.beginFill(0xde3249);
    props.graphics.drawRect(50, 50, 100, 100);
    props.graphics.endFill();
  });

  // const r = new PIXI.Rectangle(10, 20, 30, 40);

  return null;
};
