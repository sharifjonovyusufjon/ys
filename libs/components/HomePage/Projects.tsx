import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";
import Image from "next/image";
import { Box, IconButton, Stack } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

/* ------------------------------------------------------------------ */
/*  Data — shu yerga loyihalaringizni qo'shing                         */
/* ------------------------------------------------------------------ */

interface Project {
  image: string; // /public ichidagi rasm yo'li
  link: string; // bosilganda ochiladigan sayt
}

const projects: Project[] = [
  { image: "/logo.png", link: "https://yusufjon.uz" },
  { image: "/logo.png", link: "https://yusufjon.uz" },
  { image: "/logo.png", link: "https://yusufjon.uz" },
  { image: "/logo.png", link: "https://yusufjon.uz" },
];

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const COLORS = {
  ink: "#111111",
  frame: "#f4f4f4",
  frameBorder: "#e7e7e7",
  dot: "#d6d6d6",
  grid: "rgba(0, 0, 0, 0.05)",
} as const;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Link'dan sayt nomini olish (rasm alt matni va hover yozuvi uchun)
const getHost = (link: string): string => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return link;
  }
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

// Ramka burchaklaridagi kichik "vint" nuqtalar (namunadagi kabi)
const CornerDots = () => (
  <>
    {[
      { top: 8, left: 8 },
      { top: 8, right: 8 },
      { bottom: 8, left: 8 },
      { bottom: 8, right: 8 },
    ].map((pos, i) => (
      <Box
        key={i}
        aria-hidden="true"
        sx={{
          position: "absolute",
          ...pos,
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: COLORS.dot,
        }}
      />
    ))}
  </>
);

const arrowSx: SxProps<Theme> = {
  width: 36,
  height: 36,
  border: `1px solid ${COLORS.frameBorder}`,
  backgroundColor: "#fff",
  color: COLORS.ink,
  transition: `transform 250ms ${EASE}, background-color 200ms ease`,
  "&:hover": { backgroundColor: COLORS.frame, transform: "scale(1.06)" },
  "&:active": { transform: "scale(0.94)" },
  "&.Mui-disabled": { opacity: 0.35, color: COLORS.ink },
};

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

const Projects = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef<number>(0);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const [active, setActive] = useState<number>(0);

  // i-kartani track markaziga olib keladi
  const goTo = useCallback((index: number, smooth = true): void => {
    const track = trackRef.current;
    const item = itemRefs.current[index];
    if (!track || !item) return;
    track.scrollTo({
      left: item.offsetLeft + item.offsetWidth / 2 - track.clientWidth / 2,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  // Scroll paytida markazga eng yaqin kartani "active" qiladi
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const update = (): void => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let min = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (d < min) {
          min = d;
          best = i;
        }
      });
      activeRef.current = best;
      setActive(best);
    };
    const onScroll = (): void => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    // Boshlanishda o'rtadagi karta markazda tursin (namunadagi kabi)
    goTo(Math.floor((projects.length - 1) / 2), false);
    update();

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [goTo]);

  /* ---------- Kompyuterda sichqoncha bilan sudrab aylantirish ---------- */

  const onPointerDown = (e: PointerEvent<HTMLDivElement>): void => {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startLeft: trackRef.current.scrollLeft,
      moved: false,
    };
    trackRef.current.style.scrollSnapType = "none";
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>): void => {
    const d = drag.current;
    if (!d.down || !trackRef.current) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5) d.moved = true;
    trackRef.current.scrollLeft = d.startLeft - dx;
  };

  const endDrag = (): void => {
    const d = drag.current;
    if (!d.down || !trackRef.current) return;
    d.down = false;
    trackRef.current.style.scrollSnapType = "";
    goTo(activeRef.current);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(Math.min(active + 1, projects.length - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(Math.max(active - 1, 0));
    }
  };

  // Yon kartani bossa — avval markazga keladi; markazdagini bossa — saytga o'tadi
  const onCardClick = (
    e: MouseEvent<HTMLAnchorElement>,
    index: number,
  ): void => {
    if (drag.current.moved) {
      e.preventDefault();
      drag.current.moved = false;
      return;
    }
    if (index !== active) {
      e.preventDefault();
      goTo(index);
    }
  };

  return (
    <Box
      component="section"
      aria-label="Projects"
      sx={{
        position: "relative",
        width: "100%",
        py: { xs: "24px", sm: "40px" },
        overflow: "hidden",
        // Namunadagi kabi fondagi ingichka vertikal chiziqlar
        backgroundImage: `linear-gradient(to right, ${COLORS.grid} 1px, transparent 1px)`,
        backgroundSize: { xs: "25% 100%", sm: "12.5% 100%" },
        backgroundPosition: "center",
      }}
    >
      {/* ---------------- Slider ---------------- */}
      <Box
        ref={trackRef}
        role="list"
        tabIndex={0}
        aria-roledescription="carousel"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        sx={{
          "--card-w": { xs: "min(78vw, 300px)", sm: "420px" },
          position: "relative",
          py: "16px",
          px: "calc(50% - var(--card-w) / 2)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: { xs: "14px", sm: "24px" },
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          cursor: "grab",
          userSelect: "none",
          "&:active": { cursor: "grabbing" },
          "&:focus-visible": {
            outline: `2px solid ${COLORS.ink}`,
            outlineOffset: "-2px",
          },
        }}
      >
        {projects.map((project, i) => {
          const isActive = i === active;
          const host = getHost(project.link);

          return (
            <Box
              key={`${project.link}-${i}`}
              role="listitem"
              ref={(el: HTMLDivElement | null) => {
                itemRefs.current[i] = el;
              }}
              aria-label={`${i + 1} / ${projects.length}`}
              sx={{
                flex: "0 0 var(--card-w)",
                scrollSnapAlign: "center",
                animation: `${fadeUp} 700ms ${EASE} ${150 + i * 90}ms backwards`,
                [REDUCED_MOTION]: { animation: "none" },
              }}
            >
              <Box
                component="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                tabIndex={isActive ? 0 : -1}
                aria-label={`${host} 사이트 방문`}
                onClick={(e: MouseEvent<HTMLAnchorElement>) =>
                  onCardClick(e, i)
                }
                data-active={isActive}
                sx={{
                  position: "relative",
                  display: "block",
                  boxSizing: "border-box",
                  p: { xs: "10px", sm: "14px" },
                  borderRadius: { xs: "18px", sm: "22px" },
                  backgroundColor: COLORS.frame,
                  border: `1px solid ${COLORS.frameBorder}`,
                  color: "inherit",
                  textDecoration: "none",
                  transform: isActive ? "scale(1)" : "scale(0.86)",
                  opacity: isActive ? 1 : 0.5,
                  filter: isActive ? "none" : "saturate(0.7)",
                  boxShadow: isActive
                    ? "0 20px 40px -28px rgba(0, 0, 0, 0.35)"
                    : "none",
                  transition: `transform 550ms ${EASE}, opacity 400ms ease, filter 400ms ease, box-shadow 400ms ease`,

                  // Yon kartalar: hover'da biroz ochiladi
                  "&[data-active='false']:hover": { opacity: 0.75 },

                  // Markazdagi karta: hover'da ko'tariladi, rasm kattalashadi, "사이트 방문" chiqadi
                  "&[data-active='true']:hover, &[data-active='true']:focus-visible":
                    {
                      transform: "translateY(-6px)",
                      boxShadow: "0 28px 50px -26px rgba(0, 0, 0, 0.45)",
                    },
                  "&[data-active='true']:hover .shot, &[data-active='true']:focus-visible .shot":
                    {
                      transform: "scale(1.04)",
                    },
                  "&[data-active='true']:hover .visit, &[data-active='true']:focus-visible .visit":
                    {
                      opacity: 1,
                      transform: "translate(-50%, 0)",
                    },
                  // Sensorli ekranlarda hover yo'q — markazdagi kartada tugma doim ko'rinsin
                  "@media (hover: none)": {
                    "&[data-active='true'] .visit": {
                      opacity: 1,
                      transform: "translate(-50%, 0)",
                    },
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${COLORS.ink}`,
                    outlineOffset: "4px",
                  },
                  [REDUCED_MOTION]: { transition: "opacity 200ms ease" },
                }}
              >
                <CornerDots />

                {/* Sayt skrinshoti */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    borderRadius: { xs: "10px", sm: "12px" },
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <Box
                    className="shot"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      transition: `transform 700ms ${EASE}`,
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={`${host} 프로젝트 화면`}
                      fill
                      sizes="(max-width: 600px) 78vw, 420px"
                      draggable={false}
                      style={{ objectFit: "cover" }}
                      priority={i === 0}
                    />
                  </Box>

                  {/* Hover'da chiqadigan "saytga o'tish" tugmasi */}
                  <Box
                    className="visit"
                    aria-hidden="true"
                    sx={{
                      position: "absolute",
                      left: "50%",
                      bottom: { xs: "10px", sm: "14px" },
                      transform: "translate(-50%, 10px)",
                      opacity: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      height: 34,
                      px: "14px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(17, 17, 17, 0.88)",
                      backdropFilter: "blur(6px)",
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      transition: `opacity 250ms ease, transform 400ms ${EASE}`,
                    }}
                  >
                    사이트 방문
                    <ArrowOutwardRoundedIcon sx={{ fontSize: 16 }} />
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* ---------------- Boshqaruv: strelkalar + nuqtalar ---------------- */}
      <Stack
        sx={{
          mt: { xs: "8px", sm: "16px" },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
        }}
      >
        <IconButton
          aria-label="이전 프로젝트"
          onClick={() => goTo(Math.max(active - 1, 0))}
          disabled={active === 0}
          sx={arrowSx}
        >
          <ArrowBackIosNewRoundedIcon sx={{ fontSize: 14 }} />
        </IconButton>

        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {projects.map((project, i) => (
            <Box
              key={`dot-${project.link}-${i}`}
              component="button"
              type="button"
              aria-label={`${i + 1}번째 프로젝트`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              sx={{
                width: i === active ? 20 : 6,
                height: 6,
                p: 0,
                border: 0,
                borderRadius: "999px",
                backgroundColor: i === active ? COLORS.ink : COLORS.dot,
                cursor: "pointer",
                transition: `width 400ms ${EASE}, background-color 300ms ease`,
                "&:focus-visible": {
                  outline: `2px solid ${COLORS.ink}`,
                  outlineOffset: "3px",
                },
              }}
            />
          ))}
        </Stack>

        <IconButton
          aria-label="다음 프로젝트"
          onClick={() => goTo(Math.min(active + 1, projects.length - 1))}
          disabled={active === projects.length - 1}
          sx={arrowSx}
        >
          <ArrowForwardIosRoundedIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Projects;
