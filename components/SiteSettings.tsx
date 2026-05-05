"use client";

import { createContext, useContext, ReactNode } from "react";

export interface SiteSettingsValue {
  contactEmail?: string;
  contactFormMode?: "smtp" | "activecampaign";
  contactListId?: string;
  contactTags?: string;
  newsletterListId?: string;
  newsletterTags?: string;
}

const SiteSettingsContext = createContext<SiteSettingsValue>({});

export interface SiteSettingsProps extends SiteSettingsValue {
  children?: ReactNode;
}

export function SiteSettings({ children, ...value }: SiteSettingsProps) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettingsValue {
  return useContext(SiteSettingsContext);
}

// Component prop wins unless empty/undefined, then falls back to the global.
// Empty strings from Plasmic Studio are treated as "unset".
export function pickSetting<T extends string | undefined>(
  componentValue: T,
  globalValue: T
): T {
  if (componentValue === undefined || componentValue === "") return globalValue;
  return componentValue;
}
