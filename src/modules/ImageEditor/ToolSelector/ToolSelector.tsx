/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { ImageEditorValue } from "../ImageEditor.utils";

type Props = {
  value: ImageEditorValue;
  onValueChange: SetStoreFunction<ImageEditorValue>;
};

export const ToolSelector: Component<Props> = (props) => {
  const handleChange = (tool: ImageEditorValue["tool"]) => {
    props.onValueChange("tool", tool);
    props.onValueChange("samples", () => true, "isSelected", false);
  };

  return (
    <div class="flex flex-col gap-2">
      <div>
        <label>
          <input
            class="radio"
            type="radio"
            value="creator"
            checked={props.value.tool === "creator"}
            onChange={() => handleChange("creator")}
          />
          Creator
        </label>
      </div>

      <div>
        <label>
          <input
            class="radio"
            type="radio"
            value="selector"
            checked={props.value.tool === "selector"}
            onChange={() => handleChange("selector")}
          />
          Selector
        </label>
      </div>
    </div>
  );
};
