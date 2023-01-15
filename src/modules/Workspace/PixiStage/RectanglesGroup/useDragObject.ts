import * as PIXI from "pixi.js";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { Point2D } from "~/utils/geometry";
import { usePixiContext } from "../PixiContext";

type Props = {
  onDragEnd?: (event: PIXI.FederatedMouseEvent) => void;
  onDragMove?: (event: PIXI.FederatedMouseEvent) => void;
  onDragStart?: (event: PIXI.FederatedMouseEvent) => void;
  sprite: PIXI.DisplayObject;
};

export const useDragObject = (props: Props) => {
  const pixi = usePixiContext();

  const [shift, setShift] = createSignal<Point2D>();

  const onDragMove = (event: PIXI.FederatedPointerEvent) => {
    const point = shift();
    if (!point) {
      return;
    }

    props.sprite.parent.toLocal(event.global, undefined, props.sprite.position);
    props.sprite.position.set(
      props.sprite.x - point.x,
      props.sprite.y - point.y
    );

    props.onDragMove?.(event);
  };

  const onPointerDown = (event: PIXI.FederatedMouseEvent) => {
    if (event.button === 2) {
      return;
    }

    const transform = pixi.app.stage.transform.worldTransform;
    const inverted = transform.applyInverse(event.global);

    setShift({
      x: inverted.x - props.sprite.x,
      y: inverted.y - props.sprite.y,
    });

    pixi.app.stage.on("pointermove", onDragMove);
    props.onDragStart?.(event);
  };

  onMount(() => {
    props.sprite.on("pointerdown", onPointerDown);
  });

  onCleanup(() => {
    props.sprite.off("pointerdown", onPointerDown);
  });

  createEffect(() => {
    if (!shift()) {
      return;
    }

    const onDragEnd = (event: PIXI.FederatedMouseEvent) => {
      pixi.app.stage.off("pointermove", onDragMove);
      setShift();
      props.onDragEnd?.(event);
    };

    onMount(() => {
      pixi.app.stage.on("pointerup", onDragEnd);
      pixi.app.stage.on("pointerupoutside", onDragEnd);
    });

    onCleanup(() => {
      pixi.app.stage.off("pointerup", onDragEnd);
      pixi.app.stage.off("pointerupoutside", onDragEnd);
    });
  });
};
