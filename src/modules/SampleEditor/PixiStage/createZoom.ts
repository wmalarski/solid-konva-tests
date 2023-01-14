import * as PIXI from "pixi.js";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { Point2D } from "~/utils/geometry";

type CreateZoomState = {
  scaleBy: number;
  stageScale: number;
  stageX: number;
  stageY: number;
};

const defaultZoomState: CreateZoomState = {
  scaleBy: 1.1,
  stageScale: 1,
  stageX: 0,
  stageY: 0,
};

const getNewZoomState = (
  newScale: number,
  point: Point2D,
  old: CreateZoomState
): CreateZoomState => {
  const { stageX, stageY, stageScale } = old;
  const mouseX = point.x / stageScale - stageX / stageScale;
  const mouseY = point.y / stageScale - stageY / stageScale;
  const newStageX = -(mouseX - point.x / newScale) * newScale;
  const newStageY = -(mouseY - point.y / newScale) * newScale;
  return { ...old, stageScale: newScale, stageX: newStageX, stageY: newStageY };
};

type Props = {
  app: PIXI.Application;
};

export const createZoom = (props: Props) => {
  const [state, setState] = createSignal(defaultZoomState);

  const resetZoom = () => {
    setState(defaultZoomState);
  };

  const zoomIn = (point: Point2D) => {
    setState((state) =>
      getNewZoomState(state.stageScale * state.scaleBy, point, state)
    );
  };

  const zoomOut = (point: Point2D) => {
    setState((state) =>
      getNewZoomState(state.stageScale / state.scaleBy, point, state)
    );
  };

  const setZoom = (point: Point2D, scale: number) => {
    setState((state) => getNewZoomState(scale, point, state));
  };

  const onWheel = (event: PIXI.FederatedWheelEvent) => {
    const point = { x: event.globalX, y: event.globalY };
    if (event.deltaY < 0) {
      zoomIn(point);
      return;
    }
    zoomOut(point);
  };

  createEffect(() => {
    const value = state();
    props.app.stage.x = value.stageX;
    props.app.stage.y = value.stageY;
    props.app.stage.scale.set(value.stageScale);
  });

  onMount(() => {
    props.app.stage.on("wheel", onWheel);
  });

  onCleanup(() => {
    props.app.stage.off("wheel", onWheel);
  });

  return { resetZoom, setZoom, zoomIn, zoomOut };
};
