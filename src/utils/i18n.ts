import { createI18nContext } from "@solid-primitives/i18n";

const dict = {
  pl: {
    addInvoice: {
      header: "Dodaj fakture",
    },
  },
};

export const i18n = createI18nContext(dict, "pl");
