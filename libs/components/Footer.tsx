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
            <Typography
              sx={{
                fontSize: "11px",
                color: "#242424",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    fontSize: "11px",
                    color: "#242424",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Github
                </Link>
              </Typography>
              <Typography>
                <Link
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    fontSize: "11px",
                    color: "#242424",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  LinkedIn
                </Link>
              </Typography>
              <Typography>
                <Link
                  href={SOCIAL.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    fontSize: "11px",
                    color: "#242424",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Telegram
                </Link>
              </Typography>
              <Typography>
                <Link
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    fontSize: "11px",
                    color: "#242424",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
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
            <Typography
              sx={{
                fontSize: "11px",
                color: "#242424",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    fontSize: "11px",
                    color: "#242424",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Github
                </Link>
              </Typography>
              <Typography>
                <Link
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    fontSize: "11px",
                    color: "#242424",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  LinkedIn
                </Link>
              </Typography>
              <Typography>
                <Link
                  href={SOCIAL.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    fontSize: "11px",
                    color: "#242424",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Telegram
                </Link>
              </Typography>
              <Typography>
                <Link
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    fontSize: "11px",
                    color: "#242424",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Instagram
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </div>
      </>
    );
  }
};

export default Footer;
