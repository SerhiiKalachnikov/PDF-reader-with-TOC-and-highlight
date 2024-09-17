import { SxProps, useTheme } from "@mui/material";

export const usePdfViewerStyle = () => {
  const theme = useTheme();

  const wrapper: SxProps = {
    py: 2,
  };

  const contentWrapper: SxProps = {
    display: "flex",
    justifyContent: "space-between",
    mt: 4,
  };

  const leftSideWrapper: SxProps = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  };

  const divider: SxProps = {
    borderWidth: "1px",
    mx: 3,
  };

  const iconsWrapper: SxProps = {
    display: "flex",
    gap: 1,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 1.5,
    width: "fit-content",
    mb: 2,
  };

  return { wrapper, contentWrapper, leftSideWrapper, divider, iconsWrapper };
};
