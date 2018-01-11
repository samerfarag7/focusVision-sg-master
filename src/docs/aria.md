### Aria-Label

Use when a text explanation is not visible on the screen. If there 
is visible text labeling the element, use aria-labelledby instead.

One of the advantages of aria-label is that it overrides the
text node of the element, if present. So, if we were to use a
Unicode rendering method for a hamburger icon, we could replace the potential
“Trigram for heaven” readout (the text node for &#x2630;) with “menu”:

```html
<button aria-label="menu">
  &#x2630;
</button>
```

Since ▶ is read as “black right-pointing triangle” and × as
“times” (multiplication), the same aria-label method could
fix the labeling of play and close buttons, among others.

Another example:

```html
<span class="_ayg" aria-label="Rated 4.0 out of 5">
  <span style="width:66px">*</span>
</span>
```

### Aria-Labelledby

Provide an auxiliary label via
an existing text element. In the following example, the
text node “Contents” (of the `<h2>`) becomes the label of the
region using its id as the aria-labelledby value.

```html
<nav class="toc" aria-labelledby="contents-heading">
  <h2 id="contents-heading">Contents</h2>
  <ul>
    <li><a href="#history">Our history</a></li>
    <li><a href="#services">The services we offer</a></li>
    <li><a href="#endorsements">Visit our office</a></li>
    <li><a href="#endorsements">Endorsements</a></li>
  </ul>
</nav>
```
In this example:
1. When a screen reader user focuses a link inside the navigation
landmark, the label is added to the contextual
information announced. By focusing the “Our history”
link in this example, “contents navigation
landmark, list, one of four items, our history, link” (or
similar) would be announced.
2. In the screen readers VoiceOver, NVDA and JAWS, the
navigation landmark will be distinctly labeled as “Contents
navigation” in any landmark elements list.

### Aria-Hidden

To silence non-language components, use aria-hidden. You can think of aria-hidden="true" as the aural equivalent of display: none. 

```html
<label for="email">Your email address <strong class="red"
aria-hidden="true">*</strong></label>
```

Semantically, aria-hidden is supposed to indicate that content is hidden from _all_ users, but browsers will display content marked as aria-hidden. 

_From the W3C website:_  
Authors MAY, with caution, use aria-hidden to hide visibly rendered content from assistive technologies only if the act of hiding this content is intended to improve the experience for users of assistive technologies by removing redundant or extraneous content. Authors using aria-hidden to hide visible content from screen readers MUST ensure that identical or equivalent meaning and functionality is exposed to assistive technologies.

To actually hide content from all users, use the attribute [hidden]:

```html
<p hidden>This content will not be viewable by anyone.</p>
```

### Aria-Expanded

Aria-expanded="false" and aria-expanded="true" prompts screen readers to explicitly announce
“collapsed” (false) and “expanded” (true).

```html
<button aria-expanded="false">
  <svg><use xlink:href="#navicon"></use></svg>menu
</button>
```

### Aria-Required

For many people, an asterisk
(&#x002a;) character suffixing the field label of a form is familiar for a required field. 

```html
<label for="email">Your email address <strong class="red">*</strong></label>
```

For screen reader users, the label is announced as usual,
including the asterisk, as “Your email address asterisk.” The
term “asterisk” in this context is well enough understood by
screen reader users to mean “required,” but it’s not exactly
robust.

More correctly, placing aria-required="true" on the
input itself will announce “Required” in the set language
of the page.

```html
<label for="email">Your email address <strong class="red"
aria-hidden="true">*</strong></label>
<input type="text" id="email" name="email" aria-required="
true">
```

### Aria-Invalid

Use the aria-invalid attribute for handling invalid fields.

```html
<input type="text" id="password" name="password"
aria-invalid="true">
```

When the user moves back into the
form and focuses the input it will now announce “Invalid”
(or similar) in screen readers.
You can harness the aria-invalid attribute to provide
a visual indication too. By linking the parsable state of
aria-invalid="true" to a visual style, you save yourself the
bother of managing style and state as separate concerns.

```html
[aria-invalid="true"] {
    border-color: red;
    background: url () center right;
}
```

The inclusion of a background icon is recommended for color-blind
users who cannot perceive the red border-color change.

### Aria-DescribedBy

Just knowing that the field is invalid is little use unless
the user knows how to fix it too. For this purpose we can
provide an accompanying description.

```html
<input type="text" id="password" aria-invalid="true" ariadescribedby="
password-hint">
<div id="password-hint">Your password must be at least 6
characters long</div>
```

The #password-hint element is connected to the
input using the aria-describedby attribute and the
password-hint id as a cipher. That is, the description is
connected much like the label. The only difference is in
terms of order: the description is read last. Now, when a
screen reader user focuses the input, this accessible description
will be read out after the label, current value, input type
and (invalid) state information.

### Aria-Selected

Sets or retrieves the selection state of this element.

```html
<ul role="tablist">
  <li role="presentation"><a href="#panel1" id="tab1"
  role="tab" aria-selected="true">First Tab</a></li>
  <li role="presentation"><a href="#panel2" id="tab2"
  role="tab" tabindex="-1">Second Tab</a></li>
  <li role="presentation"><a href="#panel3" id="tab3"
  role="tab" tabindex="-1">Third Tab</a></li>
</ul>
```

### Aria-Pressed

Sets or retrieves the pressed state of a button that can be toggled. In correctly behaving tab interfaces, there should always be one selected tab, defined accessibly using the
aria-selected state. This should be the only element
focusable by the user with the Tab key. All other tabs
should take the tabindex="-1" attribute and be selectable
using only the arrow keys.

```html
<div role="toolbar" aria-label="Login or register">
  <button aria-pressed="true">Login</button>
  <button aria-pressed="false">Register</button>
</div>
```

When screen reader users focus the first button, “Login
or register toolbar, login toggle button, selected” (or similar,
depending on the screen reader) is announced. This
informs users that they are interacting with a toolbar
widget presenting them with a choice of “Login or register”
and that the “login” option is currently activated.

A CSS style should be provided to show
that this button is the selected one, possibly with the
[aria-pressed="true"] attribute selector.

### Aria-Live (Live Regions)

Telling users that content is pending
and will arrive in a matter of
time is the preserve of the ubiquitous
loading symbol.

The trouble is, this is only determinable by sighted users.
It’s important to communicate that content is being fetched
to screen reader users as well. Otherwise they might be left
wondering if hitting the sort button did anything at all.
The WAI-ARIA specification provides live regions for just
this kind of thing. Usually, content is only announced in
screen readers when either:

- An element is focused either by the user or programmatically.
- The user navigates to an element using their screen
reader’s own navigation commands (such as pressing 9
in NVDA to announce the following line).

But live regions announce their content simply when that
content changes. In practice, this means we can provide
commentary to screen reader users without asking them
to leave their location in the page. After the sort button is
pressed, we can populate a live region with the message,
“Please wait. Loading products.”

```html
<div aria-live="assertive" role="alert">
  Please wait. Loading products.
</div>
```

Then, when the products are loaded, we can change the live
region content to inform the user:

```html
<div aria-live="assertive" role="alert">
  Loading complete. 23 products listed.
</div>
```