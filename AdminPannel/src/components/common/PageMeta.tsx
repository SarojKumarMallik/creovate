import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export interface PageMetaProps {
  title?: string;
  description?: string;
}

export default function PageMeta({ title, description }: PageMetaProps) {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}
