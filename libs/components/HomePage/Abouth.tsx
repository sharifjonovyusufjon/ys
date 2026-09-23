import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Stack } from "@mui/material";

const About = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return (
      <>
        <Stack
          sx={{
            width: "100%",
            height: "300px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            background: "#cbcbcbcd",
          }}
        >
          About waiting... (Mobile)
        </Stack>
      </>
    );
  } else {
    return (
      <>
        <Stack
          sx={{
            width: "100%",
            height: "300px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            background: "#cbcbcbcd",
          }}
        >
          About waiting... (Desktop)
        </Stack>
      </>
    );
  }
};

export default About;
