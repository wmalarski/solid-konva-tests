import { Stage } from "konva/lib/Stage";
import { VideoEditorValue } from "../../VideoEditor.utils";

type CreateVideoLayer = {
  value: VideoEditorValue;
  onValueChange: (value: VideoEditorValue) => void;
  stage: () => Stage | undefined;
};

export const createVideoLayer = ({
  onValueChange,
  value,
  stage,
}: CreateVideoLayer) => {
  //
};
