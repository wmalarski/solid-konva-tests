import * as PIXI from "pixi.js";
import { Component, createSignal, onCleanup, onMount } from "solid-js";
import { getImage } from "~/services/image";
import { usePixiContext } from "./PixiContext";

type Props = {
  path: string;
};

export const ImageSprite: Component<Props> = (props) => {
  const ctx = usePixiContext();

  const [sprite, setSprite] = createSignal<PIXI.Sprite>();

  onMount(() => {
    PIXI.Assets.load(getImage({ path: props.path })).then((value) => {
      const sprite = new PIXI.Sprite(value);
      ctx.app.stage.addChild(sprite);
      sprite.zIndex = 0;
      setSprite(sprite);
      return;
    });
  });

  onCleanup(() => {
    const child = sprite();
    if (child) {
      ctx.app.stage.removeChild(child);
    }
  });

  return null;
};
