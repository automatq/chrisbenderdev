import { IconType } from "react-icons";

import {
  HiArrowUpRight,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiCalendarDays,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
} from "react-icons/pi";

import {
  SiAnthropic,
  SiApple,
  SiCloudflare,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGreensock,
  SiJavascript,
  SiNextdotjs,
  SiClaudecode,
  SiPostgresql,
  SiReact,
  SiSharp,
  SiSquare,
  SiSupabase,
  SiSwift,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaX,
  FaThreads,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaPinterest,
  FaWhatsapp,
  FaReddit,
  FaTelegram,
} from "react-icons/fa6";

export const iconLibrary = {
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  email: HiEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  home: PiHouseDuotone,
  gallery: PiImageDuotone,
  discord: FaDiscord,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaX,
  twitter: FaXTwitter,
  threads: FaThreads,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  javascript: SiJavascript,
  nextjs: SiNextdotjs,
  supabase: SiSupabase,
  figma: SiFigma,
  typescript: SiTypescript,
  react: SiReact,
  tailwind: SiTailwindcss,
  framer: SiFramer,
  gsap: SiGreensock,
  threejs: SiThreedotjs,
  postgresql: SiPostgresql,
  express: SiExpress,
  square: SiSquare,
  vercel: SiVercel,
  cloudflare: SiCloudflare,
  anthropic: SiAnthropic,
  claudecode: SiClaudecode,
  swift: SiSwift,
  apple: SiApple,
  csharp: SiSharp,
  dotnet: SiDotnet,
  docker: SiDocker,
  facebook: FaFacebook,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  reddit: FaReddit,
  telegram: FaTelegram,
  instagram: FaInstagram,
} satisfies Record<string, IconType>;

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;

// Registers the names above with Once UI, so `<Icon name>` and every `icon`
// prop accept them and a typo is a type error.
declare module "@once-ui-system/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- module augmentation must be an interface
  interface IconLibraryOverrides extends Record<IconName, true> {}
}
