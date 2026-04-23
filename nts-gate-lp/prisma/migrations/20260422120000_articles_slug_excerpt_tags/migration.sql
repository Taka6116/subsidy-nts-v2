-- GeneratedContent に記事用カラムを追加（slug / excerpt / tags / heroImagePath）
-- 既存データがある可能性を考慮し、IF NOT EXISTS で冪等性を担保

ALTER TABLE "generated_contents"
  ADD COLUMN IF NOT EXISTS "slug" TEXT;

ALTER TABLE "generated_contents"
  ADD COLUMN IF NOT EXISTS "excerpt" TEXT;

ALTER TABLE "generated_contents"
  ADD COLUMN IF NOT EXISTS "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

ALTER TABLE "generated_contents"
  ADD COLUMN IF NOT EXISTS "hero_image_path" TEXT;

-- Unique index on slug（NULL は複数許容）
CREATE UNIQUE INDEX IF NOT EXISTS "generated_contents_slug_key"
  ON "generated_contents"("slug");

-- 一覧表示用の複合インデックス（status + publishedAt）
CREATE INDEX IF NOT EXISTS "generated_contents_status_published_at_idx"
  ON "generated_contents"("status", "published_at");
