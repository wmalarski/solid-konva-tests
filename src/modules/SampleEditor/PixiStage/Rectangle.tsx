import * as PIXI from "pixi.js";
import {
  Component,
  createEffect,
  createMemo,
  onCleanup,
  onMount,
} from "solid-js";
import { Sample, useSelectedId } from "../SampleEditor.utils";
import { usePixiContext } from "./PixiContext";

type Props = {
  sample: Sample;
  onDragStart: (
    target: PIXI.DisplayObject,
    callback?: (event: PIXI.FederatedPointerEvent) => void
  ) => void;
};

export const Rectangle: Component<Props> = (props) => {
  const ctx = usePixiContext();
  const { selectedId, setSelectedId } = useSelectedId();

  const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);

  sprite.alpha = 0.3;
  sprite.interactive = true;
  sprite.cursor = "pointer";
  sprite.anchor.set(0.5);

  onMount(() => {
    ctx.app.stage.addChild(sprite);
  });

  onCleanup(() => {
    ctx.app.stage.removeChild(sprite);
  });

  const isSelected = createMemo(() => {
    return selectedId() === props.sample.id;
  });

  const onPointerDown = () => {
    if (isSelected()) {
      // TODO: fix anchor to correct position
      props.onDragStart(sprite, () => {
        ctx.onValueChange(
          "samples",
          (sample) => sample.id === props.sample.id,
          "shape",
          "x",
          sprite.x
        );
        ctx.onValueChange(
          "samples",
          (sample) => sample.id === props.sample.id,
          "shape",
          "y",
          sprite.y
        );
      });
      return;
    }
    setSelectedId(props.sample.id);
  };

  onMount(() => {
    sprite.on("pointerdown", onPointerDown);
  });

  onCleanup(() => {
    sprite.off("pointerdown", onPointerDown);
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
    sprite.tint = isSelected() ? 0xff0000 : 0x000000;
  });

  return null;
};
