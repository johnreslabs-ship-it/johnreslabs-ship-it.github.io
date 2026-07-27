export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
  createdAt?: number;
};

export const PROJECTS: Project[] = [
  {
    id: "johnreslab-website",
    name: "Johnres Lab Website",
    description:
      "This site — a React + Vite + Tailwind personal brand site with a blog, tools, and downloadable resources, deployed on GitHub Pages.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    repo: "https://github.com/johnreslab/johnreslab.github.io",
  },
  {
    id: "grub-recovery-script",
    name: "GRUB Recovery Script",
    description:
      "A guided Bash script that automates the chroot + grub-install + update-grub sequence for restoring GRUB after it's overwritten by a Windows update.",
    tech: ["Bash", "Linux"],
    repo: "https://github.com/johnreslab/grub-recovery-script",
  },
  {
    id: "subnet-calculator-cli",
    name: "Subnet Calculator (CLI)",
    description:
      "A command-line subnet calculator written in Python — same logic that powers the Subnet Calculator in the Tools section on this site.",
    tech: ["Python"],
    repo: "https://github.com/johnreslab/subnet-calculator-cli",
  },
  {
    id: "dualboot-preflight",
    name: "Dual-Boot Pre-Flight Checker",
    description:
      "A PowerShell script that checks UEFI mode, Fast Startup, BitLocker status, and free disk space before you start a Windows + Linux dual-boot setup.",
    tech: ["PowerShell", "Windows"],
    repo: "https://github.com/johnreslab/dualboot-preflight",
  },
];
