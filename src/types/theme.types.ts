import { ButtonProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

export type TCustomThemeColors = keyof Theme["palette"];
export type TButtonColors = NonNullable<ButtonProps["color"]>;
