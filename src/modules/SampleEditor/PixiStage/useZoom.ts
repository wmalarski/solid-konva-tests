import * as PIXI from "pixi.js";
import { createEffect, onCleanup, onMount } from "solid-js";
import { Point2D } from "~/utils/geometry";
import { useZoomParams } from "../SampleEditor.utils";

const scaleBy = 1.1;

type CreateZoomState = {
  scale: number;
  x: number;
  y: number;
};

const defaultZoomState: CreateZoomState = {
  scale: 1,
  x: 0,
  y: 0,
};

const getNewZoomState = (
  newScale: number,
  point: Point2D,
  old: CreateZoomState
): CreateZoomState => {
  const { x: stageX, y: stageY, scale: stageScale } = old;
  const mouseX = point.x / stageScale - stageX / stageScale;
  const mouseY = point.y / stageScale - stageY / stageScale;
  const newStageX = -(mouseX - point.x / newScale) * newScale;
  const newStageY = -(mouseY - point.y / newScale) * newScale;
  return { ...old, scale: newScale, x: newStageX, y: newStageY };
};

type Props = {
  app: PIXI.Application;
};

export const useZoom = (props: Props) => {
  const { setZoomParams, zoomParams } = useZoomParams();

  const resetZoom = () => {
    setZoomParams(defaultZoomState);
  };

  const zoomIn = (point: Point2D) => {
    const state = zoomParams();
    setZoomParams(getNewZoomState(state.scale * scaleBy, point, state));
  };

  const zoomOut = (point: Point2D) => {
    const state = zoomParams();
    setZoomParams(getNewZoomState(state.scale / scaleBy, point, state));
  };

  const setZoom = (point: Point2D, scale: number) => {
    const state = zoomParams();
    setZoomParams(getNewZoomState(scale, point, state));
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
    const state = zoomParams();
    props.app.stage.transform.position.set(state.x, state.y);
    props.app.stage.transform.scale.set(state.scale);
  });

  onMount(() => {
    props.app.stage.on("wheel", onWheel);
  });

  onCleanup(() => {
    props.app.stage.off("wheel", onWheel);
  });

  return { resetZoom, setZoom, zoomIn, zoomOut };
};
