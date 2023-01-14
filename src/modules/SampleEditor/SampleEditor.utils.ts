import { useSearchParams } from "solid-start";
import { Rectangle } from "~/utils/geometry";

export type Tool = "selector" | "creator";

export type Sample = {
  id: string;
  shape: Rectangle;
};

export type SampleEditorValue = {
  path: string;
  tool: Tool;
  samples: Sample[];
};

type Params = {
  selectedId?: string;
  x?: string;
  y?: string;
  scale?: string;
};

export type ZoomParams = {
  x: number;
  y: number;
  scale: number;
};

export const useParamsState = () => {
  const [params, setParams] = useSearchParams<Params>();

  return { params, setParams };
};

export const useSelectedId = () => {
  const [params, setParams] = useSearchParams<Params>();

  const setSelectedId = (selectedId?: string) => {
    setParams({ selectedId }, { replace: false });
  };

  const selectedId = () => {
    return params.selectedId;
  };

  return { selectedId, setSelectedId };
};

export const useZoomParams = () => {
  const [params, setParams] = useSearchParams<Params>();

  const setZoomParams = (zoomParams: ZoomParams) => {
    setParams(
      {
        scale: `${zoomParams.scale}`,
        x: `${zoomParams.x}`,
        y: `${zoomParams.y}`,
      },
      { replace: false }
    );
  };

  const zoomParams = () => {
    return {
      scale: +(params.scale || 1),
      x: +(params.x || 0),
      y: +(params.y || 0),
    };
  };

  return { setZoomParams, zoomParams };
};
