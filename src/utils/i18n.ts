import { createI18nContext } from "@solid-primitives/i18n";

const dict = {
  pl: {
    index: {
      title: "Video Editor",
    },
  },
};

export const i18n = createI18nContext(dict, "pl");
