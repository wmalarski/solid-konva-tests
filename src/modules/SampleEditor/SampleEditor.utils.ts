import { useSearchParams } from "solid-start";
import { Rectangle } from "~/utils/geometry";

export type Sample = {
  id: string;
  shape: Rectangle;
};

export type SampleEditorValue = {
  path: string;
  tool: "selector" | "creator";
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
