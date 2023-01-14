import * as PIXI from "pixi.js";
import { Component, createEffect } from "solid-js";

type Props = {
  graphics: PIXI.Graphics;
};

export const Rectangle: Component<Props> = (props) => {
  createEffect(() => {
    props.graphics.beginFill(0xde3249);
    props.graphics.drawRect(50, 50, 100, 100);
    props.graphics.endFill();
  });

  return null;
};
