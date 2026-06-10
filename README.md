# kevin-price.github.io

Personal portfolio and blog for [Kevin Price](https://kevin-price.github.io), built with [Jekyll](https://jekyllrb.com/). The theme is a custom adaptation of the Pelican *Lannisport* theme, reworked for Jekyll with Bootstrap 5, MathJax, syntax highlighting, and several original features.

---

## Running Locally

```bash
bundle exec jekyll serve --livereload
```

The site will be available at `http://localhost:4000`.

---

## Creating Posts

All posts live in the `_posts/` directory and follow the standard Jekyll naming convention:

```
_posts/YYYY-MM-DD-post-slug.md
```

### Front Matter

```yaml
---
layout: post
title: My Post Title
type: portfolio        # "portfolio" or "life" — controls which homepage tab it appears on
category: Mathematics  # display label shown beneath the title
tags: [Math, Python]   # used for the tags page and sidebar tag links
slug: my-post-slug
authors: Kevin Price
image: /images/my-featured-image.jpg   # optional — overrides the default og:image
---
```

#### `type` — Homepage Tab

Posts are sorted into two tabs on the homepage:

| Value | Tab | Use for |
|---|---|---|
| `portfolio` | **Portfolio** | Projects, technical writing, demos |
| `life` | **Life** | Personal essays, reflections |

Posts without a `type` field will not appear on the homepage.

#### `image` — Social Preview Override

Each post can specify a custom Open Graph image for social sharing:

```yaml
image: /images/my-featured-image.jpg
```

If omitted, the site falls back to the default OG image (`urbanorigami-ai-generated-8909957_1920.jpg`).

---

## Article Summaries

The homepage shows a preview excerpt for each post. There are three ways to control what appears, evaluated in priority order:

### 1. `custom_excerpt` (front matter)

Set a hand-written excerpt directly in the post's front matter. Supports full Markdown/HTML.

```yaml
---
custom_excerpt: "A short description of this post, written by hand."
---
```

### 2. `<!--end_summary-->` (inline marker)

Place the HTML comment `<!--end_summary-->` anywhere in the post body. Everything before it will be used as the homepage preview. This is the recommended approach for longer posts where you want a natural break point.

```markdown
This opening paragraph will appear on the homepage as the article summary.
<!--end_summary-->

The rest of the article continues here and is only visible on the full post page.
```

### 3. Auto-truncation (fallback)

If neither of the above is present, Jekyll automatically truncates the post to the number of words set by `EXCERPT_WORDS` in `_config.yml` (currently `70`).

When a post is longer than the excerpt threshold, a **— continued —** link is appended automatically, pointing to the full post.

---

## Math Rendering

Posts support LaTeX math via [MathJax](https://www.mathjax.org/). Use standard LaTeX delimiters:

- **Inline:** `$$x^2$$`
- **Block:**

```
$$A = \pi r^2$$
```

---

## Syntax Highlighting

Code blocks are highlighted using [Rouge](https://rouge.jneen.net/). Use fenced code blocks with a language identifier:

````markdown
```python
def hello():
    print("Hello, world!")
```
````

---

## Tags

Add tags to a post's front matter as a list:

```yaml
tags: [Data Analysis, JavaScript]
```

Tags are linked in the post sidebar and collected on the `/tags` page.

---

## Comments

[Disqus](https://disqus.com/) comments are enabled on all posts. The shortname is configured in `_config.yml` under `DISQUS_SHORTNAME`.

---

## Sidebar Navigation Links

External links shown in the sidebar are configured in `_config.yml` under `LINKS`:

```yaml
LINKS:
  - title: "My Project"
    link: "https://my-project.netlify.app"
```

Each link opens in a new tab. The **Site Home** and **About** links are hardcoded in `_includes/navigation.html`.

---

## Analytics

Google Analytics 4 is configured via the `google_analytics` key in `_config.yml`. The tracking snippet is injected by `_includes/analytics.html`.

---

## Open Graph / Social Sharing

All pages include Open Graph meta tags (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`) generated in `_includes/head.html`. The `og:type` is automatically set to `article` for posts and `website` for all other pages. See the [image override](#image--social-preview-override) section above to set a per-post social image.

---

## Site Configuration (`_config.yml`)

| Key | Purpose |
|---|---|
| `title` | Site title |
| `description` | Site tagline shown in the header and OG tags |
| `SITELOGO` | Path to the header logo/avatar image |
| `EXCERPT_WORDS` | Word count for auto-generated post summaries |
| `LINKS` | Sidebar navigation links |
| `DISQUS_SHORTNAME` | Disqus comments identifier |
| `google_analytics` | GA4 measurement ID |
| `github_username` | GitHub username (used in footer) |
| `GITHUB_URL` / `LINKEDIN_URL` / `FACEBOOK_URL` | Social icon links in the footer |

---

*Built and maintained by Kevin Price.*
