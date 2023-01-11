import type { Stage } from "konva/lib/Stage";
import { createEffect, createSignal } from "solid-js";
import { Point2D } from "~/utils/geometry";

type UseZoomState = {
  scaleBy: number;
  stageScale: number;
  stageX: number;
  stageY: number;
};

const getNewZoomState = (
  newScale: number,
  point: Point2D,
  old: UseZoomState
): UseZoomState => {
  const { stageX, stageY, stageScale } = old;
  const mouseX = point.x / stageScale - stageX / stageScale;
  const mouseY = point.y / stageScale - stageY / stageScale;
  const newStageX = -(mouseX - point.x / newScale) * newScale;
  const newStageY = -(mouseY - point.y / newScale) * newScale;
  return { ...old, stageScale: newScale, stageX: newStageX, stageY: newStageY };
};

const defaultZoomState: UseZoomState = {
  stageScale: 1,
  stageX: 0,
  stageY: 0,
  scaleBy: 1.1,
};

type CreateZoom = {
  stage: () => Stage | undefined;
};

export const createZoom = (props: CreateZoom) => {
  const [zoom, setZoom] = createSignal(defaultZoomState);

  const reset = () => {
    setZoom(defaultZoomState);
  };

  const zoomIn = (point: Point2D) => {
    setZoom((state) =>
      getNewZoomState(state.stageScale * state.scaleBy, point, state)
    );
  };

  const zoomOut = (point: Point2D) => {
    setZoom((state) =>
      getNewZoomState(state.stageScale / state.scaleBy, point, state)
    );
  };

  const set = (point: Point2D, scale: number) => {
    setZoom((state) => getNewZoomState(scale, point, state));
  };

  createEffect(() => {
    props.stage()?.x(zoom().stageX);
    props.stage()?.y(zoom().stageY);
    props.stage()?.scaleX(zoom().stageScale);
    props.stage()?.scaleY(zoom().stageScale);
  });

  createEffect(() => {
    props.stage()?.on("wheel", (event) => {
      event.evt.preventDefault();

      const stage = event.target.getStage();
      const point = stage?.getPointerPosition();

      if (!point) return;

      if (event.evt.deltaY < 0) {
        zoomIn(point);
      } else {
        zoomOut(point);
      }
    });
  });

  return { reset, zoomIn, zoomOut, setZoom: set };
};
