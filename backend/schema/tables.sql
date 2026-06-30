CREATE TABLE posts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  excerpt       TEXT,
  content       TEXT NOT NULL,
  cover_image   TEXT,
  status        TEXT NOT NULL DEFAULT 'draft',
  read_time     TEXT NOT NULL,
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tags (
  id    SERIAL PRIMARY KEY,
  name  TEXT UNIQUE NOT NULL
);

CREATE TABLE projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  excerpt         TEXT,
  preview_image   TEXT NOT NULL,
  github_url      TEXT NOT NULL,
  post_url        TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
)

CREATE TABLE post_tags (
  post_id  UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id   INT  REFERENCES tags(id)  ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE project_tags (
  project_id  UUID REFERENCES projects(id) ON DELETE CASCADE,
  tag_id      INT  REFERENCES tags(id)  ON DELETE CASCADE,
  PRIMARY KEY (project_id, tag_id)
);