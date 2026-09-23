import { Link, Stack, Typography } from "@mui/material";
import useDeviceDetect from "../hooks/useDeviceDetect";

const Footer = () => {
  const device = useDeviceDetect();
  const year = new Date().getFullYear();
  const SOCIAL = {
    github: "https://github.com/sharifjonovyusufjon",
    telegram: "https://t.me/YusufjonSharifjonov",
    instagram: "https://www.instagram.com/sharifjonovyusufjon/",
    linkedin: "https://www.linkedin.com/in/yusufjon-sharifjonov-20128a33a/",
  };

  if (device === "mobile") {
    return (
      <>
        <div
          style={{
            width: "100%",
            height: "70px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            style={{
              width: "390px",
              height: "60px",
              borderTop: "1px solid #C4C4C4",

              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "11px", color: "#242424" }}>
              © {year} Yusufjon
            </Typography>
            <Stack
              style={{
                width: "190px",

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>
                <Link
                  href={SOCIAL.github}
                  sx={{ fontSize: "11px", color: "#242424" }}
                >
                  Github
                </Link>
              </Typography>
              <Typography>
                <Link
                  href={SOCIAL.linkedin}
                  sx={{ fontSize: "11px", color: "#242424" }}
                >
                  LinkedIn
                </Link>
              </Typography>
              <Typography>
                <Link
                  href={SOCIAL.telegram}
                  sx={{ fontSize: "11px", color: "#242424" }}
                >
                  Telegram
                </Link>
              </Typography>
              <Typography>
                <Link
                  href={SOCIAL.instagram}
                  sx={{ fontSize: "11px", color: "#242424" }}
                >
                  Instagram
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>Footer (Desktop)</div>
      </>
    );
  }
};

export default Footer;
