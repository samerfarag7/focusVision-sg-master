### The lang Attribute

```html
<html lang="en">
```
Though frequently omitted, declaring a language for a web page could scarcely be more important. Not only does it make the page more indexable by search engines, but it also becomes easier to translate by user’s operating third-party tools such as Google’s Translate API.5 It also helps the user to write in the page’s language. Firefox, for instance, changes dictionaries on `<textarea>`s so that spelling errors are highlighted appropriately.

Perhaps most starkly, a page that does not have a language declared — or has the wrong language declared for the content — will not trigger the adoption of an appropriate synthetic voice profile when used with a screen reader. That is, if `<html lang="en">` is present but the text is actually in French, you’d hear a voice profile called Jack doing a bad impression of French, rather than a French profile called Jaques using authentic French pronunciation.

In addition to screen readers and computer braille displays benefiting from proper language declaration, it also helps browsers choose and render system fonts with the appropriate character sets. For instance, lang="zh-Hans” will invoke the rendering of a simplified Chinese font. Garbled text, rendered in unbefitting characters is not optimally inclusive of your readership to say the least.

#### Allow Pinch-to-Zoom

```html
<meta name="viewport" content="width=device-width, 
initial-scale=1">
```

The viewport meta tag is where responsive design is, somewhat magically, enabled. Yet it’s also where we habitually disable users’ ability to zoom content, making experiences, well, less magical. In an informal poll I took on Twitter asking my followers about the biggest mistakes designers make regarding inclusion, the suppression of pinch-zoom on handheld devices was by far the most cited. To be clear, then, the first of what follows is unacceptable; the second is correct.

```html
<!-- don’t use this -->
<meta name="viewport" content="width=device-width, initialscale=
1.0, minimum-scale=1.0, maximum-scale=1.0,
user-scalable=no">

<!-- use this -->
<meta name="viewport" content="width=device-width,
initial-scale=1.0">
```

Adrian Roselli provides a comprehensive list of reasons why disabling this feature undermines inclusion:
- The text may be too small for the user to read.
- The user may want to see more detail in an image.
- Selecting words to copy/paste may be easier for users when the text is larger.
- The user wants to crop animated elements out of the view to reduce distraction.
- The developer did a poor job of responsive design, and the user needs to zoom just to use the page (this happens!).
- There is a browser bug or quirk (still a bug) that causes the default zoom level to be odd.
- It can be confounding for users when a pinch/spread gesture is interpreted as something else.

#### The `<main>` Element

```html
<main id="main">
	<!-- this page’s unique content -->
</main>
```
 
The concept of main content is not a new one, but it is only recently that we’ve been afforded a tool to inclusively separate it from surrounding page apparatus like headers,
navigation regions and footers. The `<main>` element defines a region recognized and communicated by screen readers. Screen readers like JAWS also offer a keyboard shortcut (the
Q key) to access `<main>`, allowing the user to bypass a page’s preamble and go straight to the content they came for. In a single-page application, your singular `<main>` should be where each of your functionality-heavy views is rendered. In a static blog or brochure website, `<main>` would contain blog posts and other informational content. A products page would describe the products within `<main>`.

#### Skip Links

Skip links are a classic allowance made in the name of inclusive design: they feel like an awful cludge, but their impact on the experience of some types of users is tried and tested. A skip link appears above all other content on the page and points to the main content area. But who’s it for? Conventional wisdom says screen reader users but, as I’ve already covered, they have other means to reach the `<main>` element. The principal beneficiaries of skip links are sighted keyboard users. Such people are not afforded the same
shortcuts as screen reader operators, so it’s them we’re mostly helping to skip over navigation and other header content. Skip links should not appear visually by default because
they have very limited utility to mouse and touch users and would only serve to confound them. To make skip links available to keyboard users, we should bring them into view on focus:

```html
[href=”#main”] {
	position: absolute;
	top: 0;
	right: 100%; /* moves off screen */
}

[href=”#main”]:focus {
	right: auto;
}
```
When a keyboard user enters a new page, the document itself will be the first thing to receive focus. With the above provision in place, when the user hits their Tab key they’ll
focus the first interactive element on the page: the skip link. Focusing the skip link reveals it visually, giving the user the option of skipping to the main content if so desired. Tabbing again will hide the skip link and focus on the next interactive element on the page (probably the homepage link or the first link in the navigation list).


#### The `<H1>` Element

The `<h1>` element represents your document’s first-level heading. It is the top heading of the document. At our permalink, it should be the title of the blog article itself. The `<h1>` text effectively labels the supersection that is the document body, so it’s not logical to have more than one per page.

```html
<main id="main">
	<h1>How To Mark Up Inclusive Blog Articles</h1>
</main>
```

Like the `<main>` element, the `<h1>` exposes a navigation shortcut for assistive technology users. Both NVDA and JAWS users can press the 1 key and their screen readers will transport them directly to the `<h1>`, where “How To Mark Up Inclusive Blog Articles, heading level one” will be announced.

Practically speaking, the` <main>` and `<h1>` offer similar functionality, so why employ both? Because not all screen reader users are alike. In my informal research into screen reader users’ behaviors and preferences, some respondents were familiar and comfortable with landmark (region) navigation, but the majority used headings to get around. Providing unobtrusive options for users is sometimes called multimodality. It’s why we should also provide transcripts alongside video content. More on that shortly. A number of survey respondents also professed to navigate documents from element to element, reading from the start to the end using their screen reader’s down arrow key (or equivalent). Source order is an important dimension of structure and our blog article should make sense read from top to bottom. Though it can be made to look visually compelling either way, it is therefore important not to open an article with its publish date, but with its heading.

```html
<!-- don’t use this -->
<main id="main">
  <div class="meta">Published on <time
  datetime="2017-12-12">12/12/2017</time></div>
  <h1>How To Mark Up Inclusive Blog Articles</h1>
  <!-- article content here -->
</main>

<!-- use this -->
<main id="main">
  <h1>How To Mark Up Inclusive Blog Articles</h1>
  <div class="meta">Published on <time
  datetime="2017-12-12">12/12/2017</time></div>
  <!-- article content here -->
</main>
```

In the first, commented out example, someone navigating by heading using the generic h key would be unaware of the publish date because the screen reader would take them silently past it.

### Hgroup

`<hgroup>` has been removed from the HTML5 specification.
It cannot therefore relied upon becoming implemented
uniformly or reliably in browsers.

Finding the right solution depends on what is trying to be
achieved. If the subtitle “In Seven Easy Steps” is desired, separate it with a semantically inert `<span>`
element and drop it onto a new line using
h1 span { display: block; }.

```html
<h1>
How To Mark Up Blog Articles <span>In Seven Simple Steps</span>
</h1>
```

Instead, the subtitle might be removed from the H1 outline altogether. In which case,
the following solution could work:

```html
<h1>How To Mark Up Blog Articles</h1>
<p><span class="visually-hidden">Subtitle:</span> In Seven
Simple Steps</p>
```

### Login and Register

It’s important the choice being presented to the user is clear
both visually and non-visually. A simple way to communicate
the choice and the current selection would be to
construct a little toolbar:

```html
<h1>Welcome</h1>
<div role="toolbar" aria-label="Login or register">
  <button aria-pressed="true">Login</button>
  <button aria-pressed="false">Register</button>
</div>
<div id="forms">
  <div id="login">
    <form>
      <!-- the login form -->
    </form>
  </div>
  <div id="register">
    <form>
      <!-- the registration form -->
    </form>
  </div>
</div>
```

* Pressing a button changes that button to
aria-pressed="true" and reveals the corresponding
form. A CSS style should be provided to show
that this button is the selected one, possibly with the
[aria-pressed="true"] attribute selector.
* When screen reader users focus the first button, “Login
or register toolbar, login toggle button, selected” (or similar,
depending on the screen reader) is announced. This
informs users that they are interacting with a toolbar
widget presenting them with a choice of “Login or register”
and that the “login” option is currently activated.
* The displayed form (either login or register) is in focus
order following the toolbar so is easily reached by
keyboard or screen reader controls. No explicit relationship
between the toolbar and forms area is therefore
necessary. As previously discussed, aria-controls can
provide an explicit relationship but it should not be relied
upon because of low support. Source order is your
friend in these situations.

### Landmarks

Screen readers aggregate headings, links and landmarks into lists,
providing tables of contents of their own. So that headings
and links make sense decontextualized in such a fashion,
you need to write autonomous, self-describing labels.
Unlike headings and links, landmarks do not constitute
their own labels; they are simply identified by their role.
Accordingly, two navigation landmarks would be listed as:

- Navigation
- Navigation

Use aria-label to personalize these landmarks:

```html
<nav class="toc" aria-label="table of contents">
  <ul>
  <li><a href="#history">Our history</a></li>
  <li><a href="#services">The services we offer</a></li>
  <li><a href="#endorsements">Visit our office</a></li>
  <li><a href="#endorsements">Endorsements</a></li>
  </ul>
</nav>
```