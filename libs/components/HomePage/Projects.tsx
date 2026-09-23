import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Stack } from "@mui/material";

const Projects = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return (
      <>
        <Stack
          sx={{
            with: "100%",
            height: "1000px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            background: "red",
          }}
        >
          Projects waiting... (Mobile)
        </Stack>
      </>
    );
  } else {
    return (
      <>
        <Stack
          sx={{
            width: "100%",
            height: "1000px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            background: "red",
          }}
        >
          Projects waiting... (Desktop)
        </Stack>
      </>
    );
  }
};

export default Projects;
