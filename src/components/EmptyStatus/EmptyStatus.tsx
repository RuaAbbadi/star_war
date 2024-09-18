import { Box, Typography } from "@mui/material";
import React from "react";
import SearchOffIcon from "@mui/icons-material/SearchOff";

interface EmptyStatusProps {
  message?: string;
  suggestion?: string;
}
const EmptyStatus: React.FC<EmptyStatusProps> = ({
  message = "No results found",
  suggestion = "Try adjusting your search or check back later.",
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginTop="20px"
      padding="20px"
      border="1px solid #ddd"
      borderRadius="8px"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <SearchOffIcon fontSize="large" color="disabled" />
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ marginTop: "6px" }}
      >
        {message}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {suggestion}
      </Typography>
    </Box>
  );
};

export default EmptyStatus;
