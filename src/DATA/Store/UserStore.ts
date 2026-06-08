import { create } from "zustand";

import type { UserInterface } from "@interfaces/UserInterface";
import { getUser, getPdfReport } from "@fetch/userFetch";

type UserStore = {
  userData: UserInterface | null;
  loadUserData: () => Promise<void>;
  loaded: boolean;
  generatePdfPreview: () => Promise<void>;
  downloadPdf: () => Promise<void>;
  pdfBlob?: Blob | null;
};

export const useUserStore = create<UserStore>((set, get) => ({
  loaded: false,
  userData: null,
  pdfBlob: null,
  loadUserData: async (): Promise<void> => {
    try {
      if (get().loaded) return;
      const userData = await getUser();
      set({ userData: userData, loaded: true });
    } catch (error) {
      console.error("Failed to load user Data", error);
    }
  },

  generatePdfPreview: async () => {
    try {
      const blob = await getPdfReport({ download: false });
      if (blob instanceof Blob) {
        set({ pdfBlob: blob });
      }
    } catch (error) {
      console.error("Failed to generate PDF preview", error);
    }
  },
  downloadPdf: async () => {
    try {
      await getPdfReport({ download: true });
    } catch (error) {
      console.error("Failed to download PDF", error);
    }
  },
}));
