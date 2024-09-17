import React from "react";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";

import { TocItem } from "../../interfaces/toc";
import { truncateText } from "../../utils/truncate-text";
import { useTableOfContentsStyle } from "./table-of-contents.style";

interface Props {
  toc: TocItem[];
  visibleItems: {
    [key: number]: boolean;
  };
  handleItemClick: (index: number) => void;
}

const TableOfContents = (props: Props) => {
  const { toc, visibleItems, handleItemClick } = props;
  const sx = useTableOfContentsStyle();

  return (
    <Box sx={sx.wrapper}>
      <Typography variant='h5'>Table of Contents</Typography>
      <Divider sx={sx.divider} />

      <List>
        {toc.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton onClick={() => handleItemClick(index)}>
              <ListItemIcon>
                {visibleItems[index] ? (
                  <TurnedInOutlinedIcon />
                ) : (
                  <TurnedInNotOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText>
                {truncateText(item.text, 45)}
                {visibleItems[index] ? "▲" : "▼"}
              </ListItemText>
            </ListItemButton>

            {visibleItems[index] ? (
              <ListItemText sx={sx.openedText}>{item.text}</ListItemText>
            ) : null}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default TableOfContents;
