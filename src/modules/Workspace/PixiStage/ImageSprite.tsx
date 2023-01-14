import * as PIXI from "pixi.js";
import { Component, createEffect, createResource, onCleanup } from "solid-js";
import { getImage } from "~/services/image";
import { usePixiContext } from "./PixiContext";

type Props = {
  path: string;
};

export const ImageSprite: Component<Props> = (props) => {
  const pixi = usePixiContext();

  const [resource] = createResource(async () => {
    const asset = await PIXI.Assets.load(getImage({ path: props.path }));
    return new PIXI.Sprite(asset);
  });

  createEffect(() => {
    const sprite = resource();
    if (sprite) {
      pixi.app.stage.addChildAt(sprite, 0);
    }
  });

  onCleanup(() => {
    const sprite = resource();
    if (sprite) {
      pixi.app.stage.removeChild(sprite);
    }
  });

  return null;
};
