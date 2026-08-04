#!/usr/bin/env bash
#
# push-indexnow.sh — Submit one or more URLs to IndexNow
#
# IndexNow is a SHARED protocol: a single POST to the central endpoint
# (api.indexnow.org) is distributed to ALL participating search engines
# — Bing, Yandex, Seznam, Naver, and others. You do NOT ping each engine
# separately. One request covers them all.
#
# Usage:
#   bash push-indexnow.sh https://desidesign.me/lagna-patrika
#   bash push-indexnow.sh https://desidesign.me/p1 https://desidesign.me/p2
#   bash push-indexnow.sh --dry-run https://desidesign.me/lagna-patrika   # print payload, don't send
#
# Requires: curl (jq optional — script falls back to hand-rolled JSON)

set -euo pipefail

# ---------- Config ----------
HOST="desidesign.me"
KEY="49dbda2edcfb40699de4a13c7bba1da6"
KEY_LOCATION="https://desidesign.me/49dbda2edcfb40699de4a13c7bba1da6.txt"
ENDPOINT="https://api.indexnow.org/indexnow"

# ---------- Parse flags ----------
DRY_RUN=0
ARGS=()
for a in "$@"; do
  case "$a" in
    --dry-run) DRY_RUN=1 ;;
    *) ARGS+=("$a") ;;
  esac
done
set -- "${ARGS[@]}"

# ---------- Validate ----------
if [ "$#" -eq 0 ]; then
  echo "❌ Usage: bash push-indexnow.sh [--dry-run] <url> [<url2> ...]" >&2
  echo "   Example: bash push-indexnow.sh https://desidesign.me/lagna-patrika" >&2
  exit 1
fi

# ---------- Build urlList JSON ----------
if command -v jq >/dev/null 2>&1; then
  URL_LIST=$(printf '%s\n' "$@" | jq -R . | jq -s .)
else
  URL_LIST="["
  for u in "$@"; do
    URL_LIST="${URL_LIST}\"${u}\","
  done
  URL_LIST="${URL_LIST%,}]"
fi

read -r -d '' PAYLOAD <<EOF || true
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": ${URL_LIST}
}
EOF

echo "📤 IndexNow submission → ${ENDPOINT}"
echo "   Engines: Bing + Yandex + Seznam + Naver (shared protocol)"
printf '   URLs: '; echo "$URL_LIST" | tr -d '\n'
echo

if [ "$DRY_RUN" -eq 1 ]; then
  echo "🔍 --dry-run: payload below, NOT sent"
  echo "$PAYLOAD"
  exit 0
fi

# ---------- Send ----------
HTTP_BODY=$(curl -s -w '\n__HTTP_CODE__%{http_code}' \
  -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  --data-binary "$PAYLOAD")

HTTP_CODE=$(printf '%s' "$HTTP_BODY" | sed -n 's/.*__HTTP_CODE__//p')
RESPONSE=$(printf '%s' "$HTTP_BODY" | sed 's/__HTTP_CODE__.*//')

echo "↳ HTTP ${HTTP_CODE}"
echo "--- Response body ---"
echo "$RESPONSE"
echo

case "$HTTP_CODE" in
  200) echo "✅ Accepted — URLs submitted to all IndexNow engines." ;;
  202) echo "✅ Accepted (202) — URLs received and queued for processing." ;;
  400) echo "❌ 400 Bad request — check URL format / JSON validity." ;;
  403) echo "❌ 403 Forbidden — key/keyLocation mismatch. Verify ${KEY_LOCATION} is live." ;;
  422) echo "⚠️  422 Unprocessable — URLs must belong to host '${HOST}'." ;;
  429) echo "⚠️  429 Too many requests — slow down, retry later." ;;
  *)   echo "⚠️  Unexpected status ${HTTP_CODE}." ;;
esac
