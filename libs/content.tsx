import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { cloneContent } from "@/libs/fallback";
import type { SiteContent } from "@/libs/types";

type ContentValue = {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
};

const ContentContext = createContext<ContentValue | null>(null);

export function ContentProvider({
  content,
  children,
}: {
  content?: SiteContent;
  children: ReactNode;
}) {
  const [value, setValue] = useState<SiteContent>(content ?? cloneContent());

  useEffect(() => {
    if (content) setValue(content);
  }, [content]);

  return (
    <ContentContext.Provider value={{ content: value, setContent: setValue }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = (): SiteContent => {
  const value = useContext(ContentContext);
  if (!value) throw new Error("useContent must be used within ContentProvider");
  return value.content;
};

export const useContentState = (): ContentValue => {
  const value = useContext(ContentContext);
  if (!value) throw new Error("useContentState must be used within ContentProvider");
  return value;
};
