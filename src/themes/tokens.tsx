/**
 * Design tokens — single source of truth for category/status colors
 * so the Datagrid, Show view, and Dashboard charts stay in sync.
 */
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MicIcon from "@mui/icons-material/Mic";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SchoolIcon from "@mui/icons-material/School";
import HubIcon from "@mui/icons-material/Hub";
import PaletteIcon from "@mui/icons-material/Palette";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import type { SvgIconComponent } from "@mui/icons-material";

export const brand = {
  indigo: "#332E7C",
  indigoDark: "#211D57",
  amber: "#F5A623",
  teal: "#1B998B",
  coral: "#E5533D",
  slate: "#6B7288",
};

export interface CategoryToken {
  color: string;
  icon: SvgIconComponent;
}

export const CATEGORY_TOKENS: Record<string, CategoryToken> = {
  "Conférence": { color: "#332E7C", icon: MicIcon },
  "Concert": { color: "#F5A623", icon: MusicNoteIcon },
  "Sport": { color: "#1B998B", icon: SportsSoccerIcon },
  "Formation": { color: "#5C6BC0", icon: SchoolIcon },
  "Networking": { color: "#00838F", icon: HubIcon },
  "Culturel": { color: "#8E44AD", icon: PaletteIcon },
  "Autre": { color: "#6B7288", icon: ConfirmationNumberIcon },
};

export const CATEGORY_FALLBACK: CategoryToken = {
  color: "#6B7288",
  icon: ConfirmationNumberIcon,
};

export interface StatusToken {
  label: string;
  color: string;
  icon: SvgIconComponent;
}

export const STATUS_TOKENS: Record<string, StatusToken> = {
  upcoming: { label: "À venir", color: "#332E7C", icon: ScheduleIcon },
  ongoing: { label: "En cours", color: "#F5A623", icon: PlayCircleIcon },
  completed: { label: "Terminé", color: "#6B7288", icon: TaskAltIcon },
  cancelled: { label: "Annulé", color: "#E5533D", icon: CancelIcon },
};

export const STATUS_FALLBACK: StatusToken = {
  label: "—",
  color: "#6B7288",
  icon: ScheduleIcon,
};
