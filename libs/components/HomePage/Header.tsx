import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Stack } from "@mui/material";

const Header = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return (
      <>
        <Stack
          sx={{
            with: "100%",
            height: "2000px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            background: "red",
          }}
        >
          waiting... (Mobile)
        </Stack>
      </>
    );
  } else {
    return (
      <>
        <Stack
          sx={{
            width: "100%",
            height: "2000px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            background: "red",
          }}
        >
          waiting... (Desktop)
        </Stack>
      </>
    );
  }
};

export default Header;
