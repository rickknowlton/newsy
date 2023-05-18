import * as React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loader = ({ open }) => (
  <Backdrop
    open={open}
    sx={{ color: "#ffffff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default Loader;
