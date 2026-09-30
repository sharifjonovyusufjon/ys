import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getMessages, type Messages } from "@/libs/messages";
import type { L10n, Locale } from "@/libs/types";

const KEY = "ys-lang";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  m: Messages;
  tr: (value?: L10n | null) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const isLocale = (value: string | null): value is Locale =>
  value === "ko" || value === "en" || value === "uz";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ko");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (isLocale(saved)) setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale): void => {
    setLocaleState(next);
    localStorage.setItem(KEY, next);
    document.documentElement.lang = next;
  };

  const value = useMemo<LocaleContextValue>(() => {
    const m = getMessages(locale);
    return {
      locale,
      setLocale,
      m,
      tr: (item) => item?.[locale] || item?.ko || "",
    };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export const useI18n = (): LocaleContextValue => {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useI18n must be used within LocaleProvider");
  return value;
};
