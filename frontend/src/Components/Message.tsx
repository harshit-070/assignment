import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useAppSelector } from "../hooks";

export default function Message() {
  const { enqueueSnackbar } = useSnackbar();

  const { message, variant, toggle } = useAppSelector((state) => state.message);

  useEffect(() => {
    enqueueSnackbar(message, { variant: variant });
  }, [toggle]);

  return <></>;
}
