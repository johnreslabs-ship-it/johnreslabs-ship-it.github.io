export type DownloadItem = {
  id: string;
  name: string;
  category: "Cheat Sheets" | "Scripts" | "Documentation" | "Network Diagrams" | string;
  format: string;
  description: string;
  href: string;
  createdAt?: number;
};

export const DOWNLOADS: DownloadItem[] = [
  {
    id: "linux-command-cheatsheet",
    name: "Linux Command Cheat Sheet",
    category: "Cheat Sheets",
    format: "PDF",
    description: "The 60 commands I actually use day-to-day for file management, permissions, processes, and networking.",
    href: "/downloads/linux-command-cheatsheet.pdf",
  },
  {
    id: "grub-recovery-cheatsheet",
    name: "GRUB Recovery Cheat Sheet",
    category: "Cheat Sheets",
    format: "PDF",
    description: "The chroot + grub-install + update-grub sequence from the blog post, formatted as a printable one-pager.",
    href: "/downloads/grub-recovery-cheatsheet.pdf",
  },
  {
    id: "dualboot-checklist",
    name: "Dual-Boot Pre-Flight Checklist",
    category: "Cheat Sheets",
    format: "PDF",
    description: "Printable checklist to run through before starting any Windows + Linux dual-boot install.",
    href: "/downloads/dualboot-checklist.pdf",
  },
  {
    id: "grub-recovery-script",
    name: "GRUB Recovery Script",
    category: "Scripts",
    format: "SH",
    description: "Bash script automating GRUB reinstallation from a live USB chroot environment.",
    href: "https://github.com/johnreslab/grub-recovery-script",
  },
  {
    id: "dualboot-preflight-script",
    name: "Dual-Boot Pre-Flight Checker",
    category: "Scripts",
    format: "PS1",
    description: "PowerShell script that checks UEFI mode, Fast Startup, and BitLocker before you begin.",
    href: "https://github.com/johnreslab/dualboot-preflight",
  },
  {
    id: "home-network-diagram-template",
    name: "Home Network Diagram Template",
    category: "Network Diagrams",
    format: "PNG",
    description: "A blank, editable home network topology diagram — router, switch, thin clients, and common device layout.",
    href: "/downloads/home-network-diagram-template.png",
  },
];

export const DOWNLOAD_CATEGORIES = ["All", "Cheat Sheets", "Scripts", "Documentation", "Network Diagrams"] as const;
