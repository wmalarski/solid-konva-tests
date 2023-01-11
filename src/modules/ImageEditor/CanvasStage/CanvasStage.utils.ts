import { Stage } from "konva/lib/Stage";
import { onCleanup, onMount } from "solid-js";

type UseContainerReshape = {
  container: () => HTMLDivElement | undefined;
  stage: () => Stage | undefined;
};

export const useContainerReshape = ({
  container,
  stage,
}: UseContainerReshape) => {
  const listener = () => {
    const stageElement = stage();
    const containerElement = container();
    if (!stageElement || !containerElement) {
      return;
    }

    stageElement.height(containerElement.clientHeight);
    stageElement.width(containerElement.clientWidth);
  };

  onMount(() => listener());
  window.addEventListener("resize", listener);
  onCleanup(() => window.removeEventListener("resize", listener));
};
