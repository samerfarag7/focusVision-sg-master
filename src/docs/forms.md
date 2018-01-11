### Radio Buttons

```html
<form role="form" class="sorter" method="get">
  <fieldset>
    <legend>Sort by</legend>
    <input type="radio" name="sort-method" id="most-recent"
    value="most-recent" checked>
    <label for="most-recent">most recent</label>
    <input type="radio" name="sort-method" id="popularity"
    value="popularity">
    <label for="popularity">popularity</label>
    <input type="radio" name="sort-method" id="price-lowhigh"
    value="price-low-high">
    <label for="price-low-high">price (low to high)</label>
    <input type="radio" name="sort-method" id="price-highlow"
    value="price-high-low">
    <label for="price-high-low">price (high to low)</label>
  </fieldset>
  <button type="submit">sort</button>
</form>
```

Having the ARIA role of form on a `<form>` seems
counterintuitive, but it turns the widget into a region,
making it navigable in screen readers using shortcuts.
Since the basic functionality works without JavaScript
and triggers a page refresh, this helps users navigate
back to the form from the top of the document.

The `<form>` contains a single `<fieldset>` which is used
to group the radio options under the label “Sort by”,
followed by a submit button. When a radio `<input>` is
focused, the `<legend>` content is announced followed
by the `<input>`’s `<label>`. To begin with, the first option
(“most recent”) is checked. Standard behavior is that
only this checked `<input>` is focusable by Tab. Focusing
it would trigger the announcement of “Sort by most
recent, selected, radio button, one of four.” “Sort by” is
the group label; “most recent” is the element label;
“selected” is the element state; “radio button” is the element
role. The number four is the total number of radio
buttons which share a common name="sort-method".

### Tabindex

As for tabindex, using a positive integer like tabindex="4"
will refer to the fourth in focus order within the shadow
DOM and not the fourth in focus order within the parent
document. This may have some useful applications, but
use of explicit tabindex ordering is not advised in any case.
Focus order should follow source order for logical keyboard
operation. This is most easily achieved simply by using
implicitly focusable elements and — where necessary —
elements with tabindex="0". Both of which are placed in
default focus order according to source order, unaffected by
Shadow DOM subtrees.