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
};

export const useParamsState = () => {
  const [params, setParams] = useSearchParams<Params>();

  return { params, setParams };
};

export const useSelectedId = () => {
  const [params, setParams] = useSearchParams<Params>();

  const setSelectedId = (selectedId?: string) => {
    setParams({ selectedId }, { replace: false, resolve: true });
  };

  return { selectedId: () => params.selectedId, setSelectedId };
};
