# News Update Guide

1. Copy `_templates/news_detail.md` to a new file in `news/`.
2. Rename the file (example: `news/2026-03-14-pi-day-event.html`).
3. Fill only the front matter values (title/date/summary/photos).
4. Add the new item to `_data/news.yml` so it appears on the main page and news archive.

## Notes

- Korean/English toggle appears only when `summary_body_ko` (or `summary_ko`) is filled.
- `gallery` is shared by both Korean/English views.
- `layout`, `nav_active`, and back-link defaults are configured in `_config.yml`.
- `event_date` and `event_date_ko` can be a single date or a date range.
- Use `date_display` in `_data/news.yml` for the card/archive date text.
