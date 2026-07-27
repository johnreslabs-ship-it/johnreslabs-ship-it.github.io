export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: "Linux" | "Windows" | "Networking" | "VirtualBox" | "VMware" | "How-To" | string;
  tags: string[];
  date?: string;
  readingTime?: string;
  excerpt: string;
  content: string;
  status?: "draft" | "published";
  createdAt?: number;
  updatedAt?: number;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "fix-grub-after-windows-update",
    slug: "fix-grub-after-windows-update",
    title: "How to Fix GRUB After a Windows Update Overwrites It",
    category: "Linux",
    tags: ["GRUB", "Dual Boot", "Windows"],
    date: "2026-06-02",
    readingTime: "6 min read",
    excerpt:
      "Windows updates sometimes overwrite the bootloader on dual-boot machines. Here's the safe way to restore GRUB without losing either OS.",
    content: `Windows updates occasionally rewrite the Windows Boot Manager over GRUB, which leaves your Linux install unreachable at boot. The fix does not require reinstalling anything — you're repairing the bootloader, not the operating systems.

Boot from a Linux live USB, then:

1. Identify your Linux root partition with \`sudo fdisk -l\`.
2. Mount it: \`sudo mount /dev/sdXN /mnt\`.
3. Bind the system directories: \`sudo mount --bind /dev /mnt/dev && sudo mount --bind /proc /mnt/proc && sudo mount --bind /sys /mnt/sys\`.
4. Chroot into your installed system: \`sudo chroot /mnt\`.
5. Reinstall GRUB to the disk (not the partition): \`grub-install /dev/sdX\`.
6. Regenerate the config: \`update-grub\`.
7. Exit the chroot and reboot.

If GRUB still doesn't appear, double-check your firmware boot order in BIOS/UEFI — Windows updates can also reset that alongside the bootloader.`,
  },
  {
    id: "virtualbox-vs-vmware-2026",
    slug: "virtualbox-vs-vmware-2026",
    title: "VirtualBox vs VMware Workstation: Which Should You Use in 2026?",
    category: "VirtualBox",
    tags: ["VirtualBox", "VMware", "Virtual Machines"],
    date: "2026-05-14",
    readingTime: "7 min read",
    excerpt:
      "Both are free for personal use now. Here's how performance, snapshots, and guest OS support actually compare for tutorial and testing workloads.",
    content: `VirtualBox and VMware Workstation Pro solve the same problem in different ways, and the "best" choice depends on what you're actually testing.

VirtualBox is fully free and open-source, cross-platform, and has a shallower learning curve — a good default for anyone following along with beginner tutorials.

VMware Workstation Pro tends to have better 3D acceleration and slightly smoother snapshot management for heavier workloads, and is now free for personal use as well.

For most of the tutorials on this site — dual-boot practice, distro testing, and troubleshooting — VirtualBox is what I demo with, purely because it's the lowest-friction starting point. If you're doing GPU-heavy testing or need more advanced networking modes, VMware is worth the switch.`,
  },
  {
    id: "subnetting-explained-simply",
    slug: "subnetting-explained-simply",
    title: "Subnetting Explained Simply (With a Calculator You Can Use)",
    category: "Networking",
    tags: ["Networking", "Subnetting", "IP"],
    date: "2026-04-22",
    readingTime: "8 min read",
    excerpt:
      "Subnetting trips up almost everyone the first time. Here's the mental model that made it click for me, plus a free subnet calculator.",
    content: `Subnetting is just division — you're splitting a block of IP addresses into smaller blocks, and a subnet mask is simply how many addresses go in each block.

The trick that made this click for me: convert the subnet mask into how many "host bits" are left. Every host bit doubles your available addresses, and every bit you take away for the network halves it.

A /24 network gives you 256 addresses (8 host bits). A /25 splits that into two blocks of 128. A /26 splits it into four blocks of 64. Once you see it as "how many times am I cutting the block in half," the rest is just bookkeeping.

Try it yourself with the Subnet Calculator in the Tools section on this site — plug in an IP and a mask and it'll show you the network address, broadcast address, and usable range instantly.`,
  },
  {
    id: "windows-11-dual-boot-checklist",
    slug: "windows-11-dual-boot-checklist",
    title: "The Windows 11 + Linux Dual-Boot Checklist (Do This Before You Start)",
    category: "How-To",
    tags: ["Dual Boot", "Windows 11", "Linux"],
    date: "2026-03-10",
    readingTime: "5 min read",
    excerpt:
      "Most dual-boot horror stories come from skipping prep steps, not from the install itself. Here's the checklist I run through every time.",
    content: `Before touching partitions, run through this list:

1. Back up your data — a full image backup, not just important files.
2. Confirm you're using UEFI, not Legacy BIOS (\`msinfo32\` in Windows will tell you under "BIOS Mode").
3. Shrink your Windows partition from Disk Management, leaving unallocated space for Linux.
4. Disable Fast Startup in Windows power settings — it can lock the disk and cause corruption when both OSes try to access it.
5. Temporarily disable BitLocker if it's enabled.
6. Create your Linux installer USB and verify the checksum before booting from it.

Skipping steps 2 and 4 causes the vast majority of dual-boot issues I see reported — both are quick to check and save hours of troubleshooting later.`,
  },
];

export const BLOG_CATEGORIES = [
  "All",
  "Linux",
  "Windows",
  "Networking",
  "VirtualBox",
  "VMware",
  "How-To",
] as const;
