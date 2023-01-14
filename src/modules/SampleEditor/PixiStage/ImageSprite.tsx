import * as PIXI from "pixi.js";
import { Component, createSignal, onCleanup, onMount } from "solid-js";
import { getImage } from "~/services/image";
import { SampleEditorValue } from "../SampleEditor.utils";

type Props = {
  app: PIXI.Application;
  value: SampleEditorValue;
};

export const ImageSprite: Component<Props> = (props) => {
  const [sprite, setSprite] = createSignal<PIXI.Sprite>();

  onMount(() => {
    PIXI.Assets.load(getImage({ path: props.value.path })).then((value) => {
      const sprite = new PIXI.Sprite(value);
      props.app.stage.addChild(sprite);
      sprite.zIndex = 0;
      setSprite(sprite);
      return;
    });
  });

  onCleanup(() => {
    const child = sprite();
    if (child) {
      props.app.stage.removeChild(child);
    }
  });

  return null;
};
