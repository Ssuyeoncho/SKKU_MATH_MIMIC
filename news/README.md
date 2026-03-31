# News Update Guide

1. Create or reuse the year folder under `news/` such as `news/2026/`.
2. Copy `_templates/news_detail.md` to a new file named `YYYY-MM-DD-short-title.html`.
3. If the post has images, create a folder at `news/<year>/images/<same-slug>/`.
4. Put `thumbnail.jpg` and any event photos in that folder.
5. Fill the front matter in the news file. The main page and news archive update automatically as soon as the HTML file exists.

## Notes

- Standard file format: `news/<year>/YYYY-MM-DD-short-title.html`
- Image folder format: `news/<year>/images/YYYY-MM-DD-short-title/`
- Use `archive_title` / `archive_title_ko` if the archive list should show a shorter title than the full page title.
- Use `period` / `period_ko` for labels such as `2026 Spring Semester` or `2026년 1학기`.
- `thumbnail` is read relative to the post's own image folder. If omitted, the first image in `gallery` is used for the main card.
- Korean/English toggle appears only when `summary_body_ko` or `summary_ko` is filled.
- `gallery` is shared by both Korean and English views.
- In `gallery`, `file:` is also read relative to the post's own image folder.
- `event_date` and `event_date_ko` can be a single date or a date range.
- Use `date_display` / `date_display_ko` only if the list date should differ from the detail-page date.
