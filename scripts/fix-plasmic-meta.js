#!/usr/bin/env node

/**
 * fix-plasmic-meta.js
 *
 * After `plasmic sync` regenerates components, this script patches all
 * Plasmic-generated page components so the twitter:card meta tag uses
 * "summary_large_image" instead of the default "summary".
 *
 * Usage:
 *   node scripts/fix-plasmic-meta.js
 *
 * Only the twitter:card meta tag is affected; other meta tags are left
 * untouched even if they happen to contain content="summary".
 *
 * Zero external dependencies — uses only Node.js built-ins.
 */

const fs = require("fs");
const path = require("path");

const COMPONENTS_DIR = path.resolve(
  __dirname,
  "..",
  "components",
  "plasmic",
  "dirt"
);

// This regex targets only the twitter:card meta tag line.
// It matches the full <meta .../> element so we never accidentally
// touch an unrelated content="summary" attribute on a different tag.
const TWITTER_CARD_RE =
  /(<meta\s+name="twitter:card"\s+content=")summary("\s*\/>)/g;

function run() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.log("Components directory not found:", COMPONENTS_DIR);
    process.exit(1);
  }

  const files = fs
    .readdirSync(COMPONENTS_DIR)
    .filter((f) => f.startsWith("Plasmic") && f.endsWith(".tsx"))
    .map((f) => path.join(COMPONENTS_DIR, f));

  if (files.length === 0) {
    console.log("No Plasmic*.tsx files found in:", COMPONENTS_DIR);
    return;
  }

  let patchedCount = 0;

  for (const filePath of files) {
    const original = fs.readFileSync(filePath, "utf-8");
    const patched = original.replace(
      TWITTER_CARD_RE,
      "$1summary_large_image$2"
    );

    if (patched !== original) {
      fs.writeFileSync(filePath, patched, "utf-8");
      patchedCount++;
      console.log("Patched:", path.relative(process.cwd(), filePath));
    }
  }

  if (patchedCount === 0) {
    console.log(
      "No files needed patching (all twitter:card tags already use summary_large_image)."
    );
  } else {
    console.log(`\nDone. Patched ${patchedCount} file(s).`);
  }
}

run();
