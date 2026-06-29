import { Chip } from "@mui/material";
import { useRecordContext } from "react-admin";
import { CATEGORY_TOKENS, CATEGORY_FALLBACK } from "../themes/tokens";

interface CategoryFieldProps {
  label?: string;
}

export const CategoryField = (_props: CategoryFieldProps) => {
  const record = useRecordContext();
  if (!record) return null;

  const token = CATEGORY_TOKENS[record.category] ?? CATEGORY_FALLBACK;
  const Icon = token.icon;

  return (
    <Chip
      icon={<Icon style={{ color: "inherit" }} />}
      label={record.category}
      size="small"
      variant="outlined"
      sx={{
        borderColor: token.color,
        color: token.color,
        fontWeight: 600,
        "& .MuiChip-icon": { color: token.color },
      }}
    />
  );
};

CategoryField.defaultProps = {
  label: "Catégorie",
};
