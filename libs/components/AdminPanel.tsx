import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Stack, TextField, Typography } from "@mui/material";
import LangThemeControls from "@/libs/components/LangThemeControls";
import { useContentState } from "@/libs/content";
import { useI18n } from "@/libs/locale";
import { TECH_ICON_KEYS } from "@/libs/tech-icons";
import { emptyL10n, LOCALES, type L10n, type SiteContent } from "@/libs/types";
import { COLORS, FONT_FAMILY } from "@/libs/ui";

type Section = "profile" | "socials" | "projects" | "experiences" | "techGroups" | "posts";

const move = <T,>(list: T[], index: number, dir: -1 | 1): T[] => {
  const next = index + dir;
  if (next < 0 || next >= list.length) return list;
  const copy = [...list];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  return copy;
};

const btnSx = {
  height: 36,
  px: "12px",
  borderRadius: "10px",
  border: `1px solid ${COLORS.line}`,
  backgroundColor: COLORS.surface,
  color: COLORS.ink,
  fontFamily: FONT_FAMILY,
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
} as const;

const primarySx = {
  ...btnSx,
  height: 42,
  px: "16px",
  border: 0,
  backgroundColor: COLORS.inverse,
  color: COLORS.inverseText,
} as const;

const L10nFields = ({
  label,
  value,
  onChange,
  rows = 1,
}: {
  label: string;
  value: L10n;
  onChange: (value: L10n) => void;
  rows?: number;
}) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
      gap: "10px",
    }}
  >
    {LOCALES.map((locale) => (
      <TextField
        key={locale}
        size="small"
        label={`${label} · ${locale.toUpperCase()}`}
        value={value?.[locale] ?? ""}
        multiline={rows > 1}
        minRows={rows}
        onChange={(event) => onChange({ ...emptyL10n(), ...value, [locale]: event.target.value })}
      />
    ))}
  </Box>
);

const RowActions = ({
  onUp,
  onDown,
  onRemove,
}: {
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
}) => {
  const { m } = useI18n();
  return (
    <Stack sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
      <Box component="button" type="button" onClick={onUp} sx={btnSx}>
        {m.admin.up}
      </Box>
      <Box component="button" type="button" onClick={onDown} sx={btnSx}>
        {m.admin.down}
      </Box>
      <Box component="button" type="button" onClick={onRemove} sx={{ ...btnSx, color: "#b42318" }}>
        {m.admin.remove}
      </Box>
    </Stack>
  );
};

const cardSx = {
  p: { xs: "14px", md: "18px" },
  borderRadius: "16px",
  border: `1px solid ${COLORS.line}`,
  backgroundColor: COLORS.surface,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
} as const;

const AdminPanel = () => {
  const router = useRouter();
  const { m } = useI18n();
  const { content, setContent } = useContentState();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [section, setSection] = useState<Section>("profile");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  const sections: { id: Section; label: string }[] = [
    { id: "profile", label: m.admin.profile },
    { id: "socials", label: m.admin.socials },
    { id: "projects", label: m.admin.projects },
    { id: "experiences", label: m.admin.experience },
    { id: "techGroups", label: m.admin.stack },
    { id: "posts", label: m.admin.posts },
  ];

  const save = async (kind: Section, data: unknown): Promise<void> => {
    setSaving(true);
    setStatus("");
    try {
      const response = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, data }),
      });
      const json = await response.json();
      if (!response.ok) {
        setStatus(m.admin.error);
        return;
      }
      setContent(json.content);
      setStatus(m.admin.saved);
    } catch {
      setStatus(m.admin.error);
    } finally {
      setSaving(false);
    }
  };

  const logout = async (): Promise<void> => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const profile = draft.profile;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "240px minmax(0, 1fr)" },
        backgroundColor: COLORS.bg,
        color: COLORS.ink,
        fontFamily: FONT_FAMILY,
      }}
    >
      <Box
        component="aside"
        sx={{
          position: { md: "sticky" },
          top: 0,
          height: { md: "100vh" },
          overflow: "auto",
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: "8px",
          p: "16px",
          borderBottom: { xs: `1px solid ${COLORS.line}`, md: 0 },
          borderRight: { md: `1px solid ${COLORS.line}` },
          backgroundColor: COLORS.surface,
        }}
      >
        <Box sx={{ display: { xs: "none", md: "block" }, mb: "12px" }}>
          <Typography sx={{ fontFamily: FONT_FAMILY, fontWeight: 750, letterSpacing: "-0.03em" }}>
            Yusufjon
          </Typography>
          <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: "13px", color: COLORS.muted }}>
            {m.admin.title}
          </Typography>
        </Box>
        {sections.map((item) => (
          <Box
            key={item.id}
            component="button"
            type="button"
            onClick={() => {
              setSection(item.id);
              setStatus("");
            }}
            sx={{
              ...btnSx,
              textAlign: "left",
              backgroundColor: section === item.id ? COLORS.inverse : "transparent",
              color: section === item.id ? COLORS.inverseText : COLORS.ink,
              borderColor: section === item.id ? "transparent" : COLORS.line,
              whiteSpace: "nowrap",
            }}
          >
            {item.label}
          </Box>
        ))}
        <Box sx={{ mt: { md: "auto" }, display: "flex", flexDirection: { xs: "row", md: "column" }, gap: "8px" }}>
          <LangThemeControls />
          <Box component="a" href="/" sx={{ ...btnSx, display: "inline-flex", alignItems: "center" }}>
            {m.admin.viewSite}
          </Box>
          <Box component="button" type="button" onClick={logout} sx={btnSx}>
            {m.admin.logout}
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: { xs: "16px", md: "32px" }, maxWidth: 980 }}>
        <Stack
          sx={{
            mb: "18px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: "28px", fontWeight: 750, letterSpacing: "-0.04em" }}>
            {sections.find((item) => item.id === section)?.label}
          </Typography>
          <Typography sx={{ fontFamily: FONT_FAMILY, fontSize: "13px", color: status ? COLORS.green : COLORS.muted }}>
            {saving ? "..." : status}
          </Typography>
        </Stack>

        {section === "profile" && (
          <Stack sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: "10px" }}>
              {(
                [
                  ["name", "Name"],
                  ["email", "Email"],
                  ["phone", "Phone"],
                  ["phoneTel", "tel"],
                ] as const
              ).map(([key, label]) => (
                <TextField
                  key={key}
                  size="small"
                  label={label}
                  value={profile[key]}
                  onChange={(event) =>
                    setDraft({ ...draft, profile: { ...profile, [key]: event.target.value } })
                  }
                />
              ))}
              <TextField
                size="small"
                type="number"
                label="KIIP"
                value={profile.koreanLevel}
                onChange={(event) =>
                  setDraft({ ...draft, profile: { ...profile, koreanLevel: Number(event.target.value) } })
                }
              />
              <TextField
                size="small"
                type="number"
                label="KIIP total"
                value={profile.koreanTotal}
                onChange={(event) =>
                  setDraft({ ...draft, profile: { ...profile, koreanTotal: Number(event.target.value) } })
                }
              />
            </Box>
            <TextField
              size="small"
              label={m.admin.highlights}
              value={profile.highlights.join(", ")}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  profile: {
                    ...profile,
                    highlights: event.target.value.split(",").map((item) => item.trim()).filter(Boolean),
                  },
                })
              }
            />
            {(
              [
                ["eyebrow", "Eyebrow", 2],
                ["headline", "Headline", 4],
                ["description", "Description", 3],
                ["meta", "Meta", 2],
                ["availability", "Availability", 2],
                ["footerLead", "Footer", 2],
                ["bio", "Bio", 5],
                ["location", "Location", 1],
                ["visa", "Visa", 1],
                ["koreanTitle", "Korean title", 1],
                ["koreanProgram", "Korean program", 1],
                ["koreanNote", "Korean note", 1],
              ] as const
            ).map(([key, label, rows]) => (
              <L10nFields
                key={key}
                label={label}
                rows={rows}
                value={profile[key]}
                onChange={(value) => setDraft({ ...draft, profile: { ...profile, [key]: value } })}
              />
            ))}
            <Box
              component="button"
              type="button"
              disabled={saving}
              onClick={() => save("profile", draft.profile)}
              sx={{ ...primarySx, alignSelf: "flex-start" }}
            >
              {m.admin.save}
            </Box>
          </Stack>
        )}

        {section === "socials" && (
          <Stack sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {draft.socials.map((item, index) => (
              <Box key={item._id ?? index} sx={cardSx}>
                <TextField
                  size="small"
                  label="Label"
                  value={item.label}
                  onChange={(event) => {
                    const socials = [...draft.socials];
                    socials[index] = { ...item, label: event.target.value };
                    setDraft({ ...draft, socials });
                  }}
                />
                <TextField
                  size="small"
                  label="URL"
                  value={item.href}
                  onChange={(event) => {
                    const socials = [...draft.socials];
                    socials[index] = { ...item, href: event.target.value };
                    setDraft({ ...draft, socials });
                  }}
                />
                <RowActions
                  onUp={() => setDraft({ ...draft, socials: move(draft.socials, index, -1) })}
                  onDown={() => setDraft({ ...draft, socials: move(draft.socials, index, 1) })}
                  onRemove={() =>
                    setDraft({ ...draft, socials: draft.socials.filter((_, i) => i !== index) })
                  }
                />
              </Box>
            ))}
            <Stack sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              <Box
                component="button"
                type="button"
                sx={btnSx}
                onClick={() =>
                  setDraft({
                    ...draft,
                    socials: [...draft.socials, { label: "", href: "", order: draft.socials.length }],
                  })
                }
              >
                {m.admin.add}
              </Box>
              <Box
                component="button"
                type="button"
                disabled={saving}
                onClick={() => save("socials", draft.socials)}
                sx={primarySx}
              >
                {m.admin.save}
              </Box>
            </Stack>
          </Stack>
        )}

        {section === "projects" && (
          <Stack sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Typography sx={{ fontSize: "13px", color: COLORS.muted }}>{m.admin.imageHint}</Typography>
            {draft.projects.map((item, index) => (
              <Box key={item._id ?? index} sx={cardSx}>
                <L10nFields
                  label="Title"
                  value={item.title}
                  onChange={(title) => {
                    const projects = [...draft.projects];
                    projects[index] = { ...item, title };
                    setDraft({ ...draft, projects });
                  }}
                />
                <TextField
                  size="small"
                  label="Link"
                  value={item.link}
                  onChange={(event) => {
                    const projects = [...draft.projects];
                    projects[index] = { ...item, link: event.target.value };
                    setDraft({ ...draft, projects });
                  }}
                />
                <TextField
                  size="small"
                  label="Image"
                  value={item.image}
                  onChange={(event) => {
                    const projects = [...draft.projects];
                    projects[index] = { ...item, image: event.target.value };
                    setDraft({ ...draft, projects });
                  }}
                />
                <RowActions
                  onUp={() => setDraft({ ...draft, projects: move(draft.projects, index, -1) })}
                  onDown={() => setDraft({ ...draft, projects: move(draft.projects, index, 1) })}
                  onRemove={() =>
                    setDraft({ ...draft, projects: draft.projects.filter((_, i) => i !== index) })
                  }
                />
              </Box>
            ))}
            <Stack sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              <Box
                component="button"
                type="button"
                sx={btnSx}
                onClick={() =>
                  setDraft({
                    ...draft,
                    projects: [
                      ...draft.projects,
                      { title: emptyL10n(), link: "", image: "/logo.png", order: draft.projects.length },
                    ],
                  })
                }
              >
                {m.admin.add}
              </Box>
              <Box component="button" type="button" disabled={saving} onClick={() => save("projects", draft.projects)} sx={primarySx}>
                {m.admin.save}
              </Box>
            </Stack>
          </Stack>
        )}

        {section === "experiences" && (
          <Stack sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {draft.experiences.map((item, index) => (
              <Box key={item._id ?? index} sx={cardSx}>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <TextField
                    size="small"
                    label="Start"
                    value={item.start}
                    onChange={(event) => {
                      const experiences = [...draft.experiences];
                      experiences[index] = { ...item, start: event.target.value };
                      setDraft({ ...draft, experiences });
                    }}
                  />
                  <TextField
                    size="small"
                    label="End"
                    value={item.end}
                    placeholder={m.present}
                    onChange={(event) => {
                      const experiences = [...draft.experiences];
                      experiences[index] = { ...item, end: event.target.value };
                      setDraft({ ...draft, experiences });
                    }}
                  />
                </Box>
                <L10nFields
                  label="Role"
                  value={item.role}
                  onChange={(role) => {
                    const experiences = [...draft.experiences];
                    experiences[index] = { ...item, role };
                    setDraft({ ...draft, experiences });
                  }}
                />
                <L10nFields
                  label="Company"
                  value={item.company}
                  onChange={(company) => {
                    const experiences = [...draft.experiences];
                    experiences[index] = { ...item, company };
                    setDraft({ ...draft, experiences });
                  }}
                />
                <Box sx={{ display: "flex", gap: "12px" }}>
                  <TextField
                    size="small"
                    type="color"
                    label="Color"
                    value={item.color}
                    onChange={(event) => {
                      const experiences = [...draft.experiences];
                      experiences[index] = { ...item, color: event.target.value };
                      setDraft({ ...draft, experiences });
                    }}
                    sx={{ width: 120 }}
                  />
                  <TextField
                    size="small"
                    type="color"
                    label="Background"
                    value={item.bg}
                    onChange={(event) => {
                      const experiences = [...draft.experiences];
                      experiences[index] = { ...item, bg: event.target.value };
                      setDraft({ ...draft, experiences });
                    }}
                    sx={{ width: 140 }}
                  />
                </Box>
                <RowActions
                  onUp={() => setDraft({ ...draft, experiences: move(draft.experiences, index, -1) })}
                  onDown={() => setDraft({ ...draft, experiences: move(draft.experiences, index, 1) })}
                  onRemove={() =>
                    setDraft({ ...draft, experiences: draft.experiences.filter((_, i) => i !== index) })
                  }
                />
              </Box>
            ))}
            <Stack sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              <Box
                component="button"
                type="button"
                sx={btnSx}
                onClick={() =>
                  setDraft({
                    ...draft,
                    experiences: [
                      ...draft.experiences,
                      {
                        start: "",
                        end: "",
                        role: emptyL10n(),
                        company: emptyL10n(),
                        color: "#1d4ed8",
                        bg: "#eef3ff",
                        order: draft.experiences.length,
                      },
                    ],
                  })
                }
              >
                {m.admin.add}
              </Box>
              <Box
                component="button"
                type="button"
                disabled={saving}
                onClick={() => save("experiences", draft.experiences)}
                sx={primarySx}
              >
                {m.admin.save}
              </Box>
            </Stack>
          </Stack>
        )}

        {section === "techGroups" && (
          <Stack sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {draft.techGroups.map((group, groupIndex) => (
              <Box key={group._id ?? groupIndex} sx={cardSx}>
                <L10nFields
                  label="Group"
                  value={group.title}
                  onChange={(title) => {
                    const techGroups = [...draft.techGroups];
                    techGroups[groupIndex] = { ...group, title };
                    setDraft({ ...draft, techGroups });
                  }}
                />
                {group.items.map((item, itemIndex) => (
                  <Box
                    key={`${groupIndex}-${itemIndex}`}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr 140px 90px auto" },
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    {LOCALES.map((locale) => (
                      <TextField
                        key={locale}
                        size="small"
                        label={locale.toUpperCase()}
                        value={item.name?.[locale] ?? ""}
                        onChange={(event) => {
                          const techGroups = [...draft.techGroups];
                          const items = [...group.items];
                          items[itemIndex] = {
                            ...item,
                            name: { ...emptyL10n(), ...item.name, [locale]: event.target.value },
                          };
                          techGroups[groupIndex] = { ...group, items };
                          setDraft({ ...draft, techGroups });
                        }}
                      />
                    ))}
                    <Box
                      component="select"
                      aria-label="Icon"
                      value={item.icon}
                      onChange={(event) => {
                        const techGroups = [...draft.techGroups];
                        const items = [...group.items];
                        items[itemIndex] = { ...item, icon: event.target.value };
                        techGroups[groupIndex] = { ...group, items };
                        setDraft({ ...draft, techGroups });
                      }}
                      sx={{
                        height: 40,
                        px: "8px",
                        borderRadius: "8px",
                        border: `1px solid ${COLORS.line}`,
                        backgroundColor: COLORS.chip,
                        color: COLORS.ink,
                      }}
                    >
                      {TECH_ICON_KEYS.map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </Box>
                    <TextField
                      size="small"
                      type="color"
                      value={item.color}
                      onChange={(event) => {
                        const techGroups = [...draft.techGroups];
                        const items = [...group.items];
                        items[itemIndex] = { ...item, color: event.target.value };
                        techGroups[groupIndex] = { ...group, items };
                        setDraft({ ...draft, techGroups });
                      }}
                    />
                    <Box
                      component="button"
                      type="button"
                      sx={btnSx}
                      onClick={() => {
                        const techGroups = [...draft.techGroups];
                        techGroups[groupIndex] = {
                          ...group,
                          items: group.items.filter((_, i) => i !== itemIndex),
                        };
                        setDraft({ ...draft, techGroups });
                      }}
                    >
                      {m.admin.remove}
                    </Box>
                  </Box>
                ))}
                <Stack sx={{ display: "flex", flexDirection: "row", gap: "8px", flexWrap: "wrap" }}>
                  <Box
                    component="button"
                    type="button"
                    sx={btnSx}
                    onClick={() => {
                      const techGroups = [...draft.techGroups];
                      techGroups[groupIndex] = {
                        ...group,
                        items: [...group.items, { name: emptyL10n(), icon: "react", color: "#149ECA" }],
                      };
                      setDraft({ ...draft, techGroups });
                    }}
                  >
                    {m.admin.add}
                  </Box>
                  <RowActions
                    onUp={() => setDraft({ ...draft, techGroups: move(draft.techGroups, groupIndex, -1) })}
                    onDown={() => setDraft({ ...draft, techGroups: move(draft.techGroups, groupIndex, 1) })}
                    onRemove={() =>
                      setDraft({ ...draft, techGroups: draft.techGroups.filter((_, i) => i !== groupIndex) })
                    }
                  />
                </Stack>
              </Box>
            ))}
            <Stack sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              <Box
                component="button"
                type="button"
                sx={btnSx}
                onClick={() =>
                  setDraft({
                    ...draft,
                    techGroups: [
                      ...draft.techGroups,
                      { title: emptyL10n(), items: [], order: draft.techGroups.length },
                    ],
                  })
                }
              >
                {m.admin.add}
              </Box>
              <Box
                component="button"
                type="button"
                disabled={saving}
                onClick={() => save("techGroups", draft.techGroups)}
                sx={primarySx}
              >
                {m.admin.save}
              </Box>
            </Stack>
          </Stack>
        )}

        {section === "posts" && (
          <Stack sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {draft.posts.map((item, index) => (
              <Box key={item._id ?? index} sx={cardSx}>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr auto" }, gap: "10px" }}>
                  <TextField
                    size="small"
                    label={m.admin.slug}
                    value={item.slug}
                    onChange={(event) => {
                      const posts = [...draft.posts];
                      posts[index] = { ...item, slug: event.target.value };
                      setDraft({ ...draft, posts });
                    }}
                  />
                  <TextField
                    size="small"
                    label={m.admin.cover}
                    value={item.cover}
                    onChange={(event) => {
                      const posts = [...draft.posts];
                      posts[index] = { ...item, cover: event.target.value };
                      setDraft({ ...draft, posts });
                    }}
                  />
                  <Box
                    component="label"
                    sx={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600 }}
                  >
                    <input
                      type="checkbox"
                      checked={item.published}
                      onChange={(event) => {
                        const posts = [...draft.posts];
                        posts[index] = { ...item, published: event.target.checked };
                        setDraft({ ...draft, posts });
                      }}
                    />
                    {m.admin.published}
                  </Box>
                </Box>
                <L10nFields
                  label="Title"
                  value={item.title}
                  onChange={(title) => {
                    const posts = [...draft.posts];
                    posts[index] = { ...item, title };
                    setDraft({ ...draft, posts });
                  }}
                />
                <L10nFields
                  label={m.admin.excerpt}
                  rows={2}
                  value={item.excerpt}
                  onChange={(excerpt) => {
                    const posts = [...draft.posts];
                    posts[index] = { ...item, excerpt };
                    setDraft({ ...draft, posts });
                  }}
                />
                <L10nFields
                  label={m.admin.body}
                  rows={6}
                  value={item.body}
                  onChange={(body) => {
                    const posts = [...draft.posts];
                    posts[index] = { ...item, body };
                    setDraft({ ...draft, posts });
                  }}
                />
                <RowActions
                  onUp={() => setDraft({ ...draft, posts: move(draft.posts, index, -1) })}
                  onDown={() => setDraft({ ...draft, posts: move(draft.posts, index, 1) })}
                  onRemove={() => setDraft({ ...draft, posts: draft.posts.filter((_, i) => i !== index) })}
                />
              </Box>
            ))}
            <Stack sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              <Box
                component="button"
                type="button"
                sx={btnSx}
                onClick={() =>
                  setDraft({
                    ...draft,
                    posts: [
                      {
                        slug: "",
                        title: emptyL10n(),
                        excerpt: emptyL10n(),
                        body: emptyL10n(),
                        cover: "",
                        published: false,
                        createdAt: new Date().toISOString(),
                      },
                      ...draft.posts,
                    ],
                  })
                }
              >
                {m.admin.add}
              </Box>
              <Box component="button" type="button" disabled={saving} onClick={() => save("posts", draft.posts)} sx={primarySx}>
                {m.admin.save}
              </Box>
            </Stack>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default AdminPanel;
