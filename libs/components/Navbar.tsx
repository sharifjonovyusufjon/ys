import { Button, Link, Stack } from "@mui/material";
import useDeviceDetect from "../hooks/useDeviceDetect";
import RoofingOutlinedIcon from "@mui/icons-material/RoofingOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";

const Navbar = () => {
  const device = useDeviceDetect();

  const EMAIL = "yusufjon6727@gmail.com";
  const SOCIAL = {
    github: "https://github.com/sharifjonovyusufjon",
    telegram: "https://t.me/YusufjonSharifjonov",
    instagram: "https://www.instagram.com/sharifjonovyusufjon/",
    linkedin: "https://www.linkedin.com/in/yusufjon-sharifjonov-20128a33a/",
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("프로젝트 관련 문의드립니다.");
    const body = encodeURIComponent("안녕하세요~ ");
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  if (device === "mobile") {
    return (
      <>
        <div
          style={{
            width: "100%",
            height: "90px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "390px",
              height: "50px",
              border: "1px solid #C4C4C4",
              borderRadius: "10px",

              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack
              style={{
                width: "70px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                href="/"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RoofingOutlinedIcon sx={{ color: "#1a1a1a" }} />
              </Link>
            </Stack>
            <div
              style={{
                width: "1px",
                height: "27px",
                background: "#C4C4C4",
              }}
            ></div>
            <Stack
              style={{
                width: "190px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack
                style={{
                  width: "160px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  href={SOCIAL.linkedin}
                  sx={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LinkedInIcon sx={{ color: "#1a1a1a" }} />
                </Link>
                <Link
                  href={SOCIAL.github}
                  sx={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GitHubIcon sx={{ color: "#1a1a1a" }} />
                </Link>

                <Link
                  href={SOCIAL.telegram}
                  sx={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TelegramIcon sx={{ color: "#1a1a1a" }} />
                </Link>
                <Link
                  href={SOCIAL.instagram}
                  sx={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <InstagramIcon sx={{ color: "#1a1a1a" }} />
                </Link>
              </Stack>
            </Stack>
            <div
              style={{
                width: "1px",
                height: "27px",
                background: "#C4C4C4",
              }}
            ></div>
            <Stack
              style={{
                width: "120px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={handleEmail}
                // variant="contained"
                sx={{
                  width: "100px",
                  height: "40px",
                  backgroundColor: "#1a1a1a",
                  color: "#fff",
                  borderRadius: "10px",
                }}
              >
                연락하기
              </Button>
            </Stack>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <>
          <div
            style={{
              width: "100%",
              height: "90px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "390px",
                height: "50px",
                border: "1px solid #C4C4C4",
                borderRadius: "10px",

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack
                style={{
                  width: "70px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link
                  href="/"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <RoofingOutlinedIcon sx={{ color: "#1a1a1a" }} />
                </Link>
              </Stack>
              <div
                style={{
                  width: "1px",
                  height: "27px",
                  background: "#C4C4C4",
                }}
              ></div>
              <Stack
                style={{
                  width: "190px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack
                  style={{
                    width: "160px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Link
                    href={SOCIAL.linkedin}
                    sx={{
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LinkedInIcon sx={{ color: "#1a1a1a" }} />
                  </Link>
                  <Link
                    href={SOCIAL.github}
                    sx={{
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GitHubIcon sx={{ color: "#1a1a1a" }} />
                  </Link>

                  <Link
                    href={SOCIAL.telegram}
                    sx={{
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TelegramIcon sx={{ color: "#1a1a1a" }} />
                  </Link>
                  <Link
                    href={SOCIAL.instagram}
                    sx={{
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <InstagramIcon sx={{ color: "#1a1a1a" }} />
                  </Link>
                </Stack>
              </Stack>
              <div
                style={{
                  width: "1px",
                  height: "27px",
                  background: "#C4C4C4",
                }}
              ></div>
              <Stack
                style={{
                  width: "120px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={handleEmail}
                  // variant="contained"
                  sx={{
                    width: "100px",
                    height: "40px",
                    backgroundColor: "#1a1a1a",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  연락하기
                </Button>
              </Stack>
            </div>
          </div>
        </>
      </>
    );
  }
};
export default Navbar;
