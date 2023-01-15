import * as PIXI from "pixi.js";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { Point2D } from "~/utils/geometry";
import { usePixiContext } from "../PixiContext";

type Props = {
  onDragEnd?: (event: PIXI.FederatedMouseEvent) => void;
  onDragMove?: (event: PIXI.FederatedMouseEvent) => void;
  onDragStart?: (event: PIXI.FederatedMouseEvent) => void;
  displayObject: PIXI.DisplayObject;
};

export const useDragObject = (props: Props) => {
  const pixi = usePixiContext();

  const [shift, setShift] = createSignal<Point2D>();

  const onDragMove = (event: PIXI.FederatedPointerEvent) => {
    const point = shift();
    if (!point) {
      return;
    }

    props.displayObject.parent.toLocal(
      event.global,
      undefined,
      props.displayObject.position
    );
    props.displayObject.position.set(
      props.displayObject.x - point.x,
      props.displayObject.y - point.y
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
      x: inverted.x - props.displayObject.x,
      y: inverted.y - props.displayObject.y,
    });

    pixi.app.stage.on("pointermove", onDragMove);
    props.onDragStart?.(event);
  };

  onMount(() => {
    props.displayObject.on("pointerdown", onPointerDown);
  });

  onCleanup(() => {
    props.displayObject.off("pointerdown", onPointerDown);
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
