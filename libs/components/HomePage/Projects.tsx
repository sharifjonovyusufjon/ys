import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";
import Image from "next/image";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import SectionHeading from "@/libs/components/SectionHeading";
import { COLORS, EASE, FONT_FAMILY, REDUCED_MOTION, containerSx, sectionSx } from "@/libs/ui";

interface Project {
  image: string;
  link: string;
  title?: string;
}

const projects: Project[] = [
  { image: "/logo.png", link: "https://yusufjon.uz", title: "Yusufjon" },
  { image: "/logo.png", link: "https://yusufjon.uz", title: "Yusufjon" },
  { image: "/logo.png", link: "https://yusufjon.uz", title: "Yusufjon" },
  { image: "/logo.png", link: "https://yusufjon.uz", title: "Yusufjon" },
];

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const getHost = (link: string): string => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return link;
  }
};

const ProjectCard = ({
  project,
  index,
  isActive,
}: {
  project: Project;
  index: number;
  isActive: boolean;
}) => {
  const host = getHost(project.link);
  const title = project.title ?? host;

  return (
    <Box
      component="a"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      aria-label={`${title} 사이트 방문`}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "100%",
        p: "12px",
        borderRadius: "20px",
        backgroundColor: COLORS.surface,
        border: `1px solid ${COLORS.line}`,
        color: "inherit",
        textDecoration: "none",
        boxShadow: "0 24px 50px -36px rgba(26, 25, 22, 0.45)",
      }}
    >
      <Stack
        sx={{
          mb: "12px",
          px: "4px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Stack direction="row" sx={{ gap: "5px" }} aria-hidden="true">
          {["#e7c1b8", "#ead7a8", "#c9d7c2"].map((color) => (
            <Box
              key={color}
              sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }}
            />
          ))}
        </Stack>
        <Typography
          sx={{
            flex: 1,
            minWidth: 0,
            textAlign: "center",
            fontFamily: FONT_FAMILY,
            fontSize: "12px",
            color: COLORS.muted,
          }}
        >
          {host}
        </Typography>
        <Box sx={{ width: 34 }} />
      </Stack>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#fff",
          border: `1px solid ${COLORS.line}`,
        }}
      >
        <Image
          src={project.image}
          alt={`${title} 프로젝트 화면`}
          fill
          sizes="100vw"
          draggable={false}
          style={{ objectFit: "cover" }}
          priority={index === 0 && isActive}
        />
      </Box>
    </Box>
  );
};

const arrowSx: SxProps<Theme> = {
  width: 42,
  height: 42,
  border: `1px solid ${COLORS.line}`,
  backgroundColor: COLORS.surface,
  color: COLORS.ink,
  borderRadius: "12px",
  transition: `transform 250ms ${EASE}, background-color 200ms ease`,
  "&:hover": { backgroundColor: "#fff", transform: "translateY(-1px)" },
  "&:active": { transform: "scale(0.96)" },
  "&.Mui-disabled": { opacity: 0.35, color: COLORS.ink },
};

const Projects = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number, smooth = true): void => {
    const next = Math.max(0, Math.min(index, projects.length - 1));
    activeRef.current = next;
    setActive(next);

    const track = trackRef.current;
    const item = itemRefs.current[next];
    if (!track || !item || track.clientWidth === 0) return;
    track.scrollTo({
      left: item.offsetLeft + item.offsetWidth / 2 - track.clientWidth / 2,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

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
        const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (distance < min) {
          min = distance;
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

    goTo(0, false);
    update();

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [goTo]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = {
      down: true,
      startX: event.clientX,
      startLeft: trackRef.current.scrollLeft,
      moved: false,
    };
    trackRef.current.style.scrollSnapType = "none";
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    const state = drag.current;
    if (!state.down || !trackRef.current) return;
    const dx = event.clientX - state.startX;
    if (Math.abs(dx) > 5) state.moved = true;
    trackRef.current.scrollLeft = state.startLeft - dx;
  };

  const endDrag = (): void => {
    const state = drag.current;
    if (!state.down || !trackRef.current) return;
    state.down = false;
    trackRef.current.style.scrollSnapType = "";
    goTo(activeRef.current);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(Math.min(active + 1, projects.length - 1));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(Math.max(active - 1, 0));
    }
  };

  const onCardClick = (event: MouseEvent<HTMLAnchorElement>, index: number): void => {
    if (drag.current.moved) {
      event.preventDefault();
      drag.current.moved = false;
      return;
    }
    if (index !== active) {
      event.preventDefault();
      goTo(index);
    }
  };

  const current = projects[active];

  return (
    <Box
      component="section"
      id="work"
      aria-labelledby="work-title"
      sx={{
        ...sectionSx,
        position: "relative",
        overflow: "hidden",
        maxWidth: "100%",
        borderTop: `1px solid ${COLORS.line}`,
        py: { xs: "64px", md: "96px" },
      }}
    >
      <Box sx={{ ...containerSx, mb: { xs: "28px", md: "40px" } }}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "flex-end" },
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <SectionHeading id="work-title" index="01" title="프로젝트" />
          <Typography
            sx={{
              pb: { sm: "6px" },
              fontFamily: FONT_FAMILY,
              fontSize: "13px",
              fontVariantNumeric: "tabular-nums",
              color: COLORS.muted,
            }}
          >
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            {current ? ` · ${current.title ?? getHost(current.link)}` : ""}
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ ...containerSx, display: { xs: "block", md: "none" }, mb: "4px" }}>
        {projects[active] && (
          <ProjectCard project={projects[active]} index={active} isActive />
        )}
      </Box>

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
          "--card-w": "min(52vw, 680px)",
          display: { xs: "none", md: "flex" },
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          py: "8px",
          px: "calc(50% - var(--card-w) / 2)",
          flexDirection: "row",
          alignItems: "stretch",
          gap: { xs: "14px", md: "28px" },
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
          const title = project.title ?? host;

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
                animation: `${fadeUp} 700ms ${EASE} ${120 + i * 70}ms backwards`,
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
                aria-label={`${title} 사이트 방문`}
                onClick={(event: MouseEvent<HTMLAnchorElement>) => onCardClick(event, i)}
                data-active={isActive}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                  p: { xs: "12px", md: "16px" },
                  borderRadius: { xs: "20px", md: "24px" },
                  backgroundColor: COLORS.surface,
                  border: `1px solid ${COLORS.line}`,
                  color: "inherit",
                  textDecoration: "none",
                  transform: isActive ? "scale(1)" : "scale(0.94)",
                  opacity: isActive ? 1 : 0.48,
                  boxShadow: isActive ? "0 24px 50px -36px rgba(26, 25, 22, 0.45)" : "none",
                  transition: `transform 500ms ${EASE}, opacity 350ms ease, box-shadow 350ms ease`,
                  "&[data-active='false']:hover": { opacity: 0.72 },
                  "&[data-active='true']:hover, &[data-active='true']:focus-visible": {
                    transform: "translateY(-6px)",
                  },
                  "&[data-active='true']:hover .shot, &[data-active='true']:focus-visible .shot": {
                    transform: "scale(1.03)",
                  },
                  "&[data-active='true']:hover .visit, &[data-active='true']:focus-visible .visit": {
                    opacity: 1,
                    transform: "translate(-50%, 0)",
                  },
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
                <Stack
                  sx={{
                    mb: "12px",
                    px: "4px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Stack direction="row" sx={{ gap: "5px" }} aria-hidden="true">
                    {["#e7c1b8", "#ead7a8", "#c9d7c2"].map((color) => (
                      <Box
                        key={color}
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: color,
                        }}
                      />
                    ))}
                  </Stack>
                  <Typography
                    sx={{
                      flex: 1,
                      textAlign: "center",
                      fontFamily: FONT_FAMILY,
                      fontSize: "12px",
                      color: COLORS.muted,
                    }}
                  >
                    {host}
                  </Typography>
                  <Box sx={{ width: 34 }} />
                </Stack>

                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 10",
                    borderRadius: { xs: "12px", md: "14px" },
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    border: `1px solid ${COLORS.line}`,
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
                      alt={`${title} 프로젝트 화면`}
                      fill
                      sizes="(max-width: 900px) 86vw, 680px"
                      draggable={false}
                      style={{ objectFit: "cover" }}
                      priority={i === 0}
                    />
                  </Box>
                  <Box
                    className="visit"
                    aria-hidden="true"
                    sx={{
                      position: "absolute",
                      left: "50%",
                      bottom: "14px",
                      transform: "translate(-50%, 8px)",
                      opacity: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      height: 36,
                      px: "14px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(26, 25, 22, 0.9)",
                      color: "#fff",
                      fontFamily: FONT_FAMILY,
                      fontSize: "13px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      transition: `opacity 220ms ease, transform 360ms ${EASE}`,
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

      <Stack
        sx={{
          mt: { xs: "18px", md: "28px" },
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

        <Stack direction="row" sx={{ alignItems: "center", gap: "6px" }}>
          {projects.map((project, i) => (
            <Box
              key={`dot-${project.link}-${i}`}
              component="button"
              type="button"
              aria-label={`${i + 1}번째 프로젝트`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
              sx={{
                width: i === active ? 22 : 7,
                height: 7,
                p: 0,
                border: 0,
                borderRadius: "999px",
                backgroundColor: i === active ? COLORS.ink : "#d5d0c6",
                cursor: "pointer",
                transition: `width 350ms ${EASE}, background-color 250ms ease`,
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
