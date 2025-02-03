/* cSpell:disable */
// Note: this file is auto concatenated to the end of the bundled d.ts during
// build.

// This code is based on react definition in DefinitelyTyped published under the MIT license.
//      Repository: https://github.com/DefinitelyTyped/DefinitelyTyped
//      Path in the repository: types/react/index.d.ts
//
// Copyrights of original definition are:
//      AssureSign <http://www.assuresign.com>
//      Microsoft <https://microsoft.com>
//                 John Reilly <https://github.com/johnnyreilly>
//      Benoit Benezech <https://github.com/bbenezech>
//      Patricio Zavolinsky <https://github.com/pzavolinsky>
//      Digiguru <https://github.com/digiguru>
//      Eric Anderson <https://github.com/ericanderson>
//      Dovydas Navickas <https://github.com/DovydasNavickas>
//                 Josh Rutherford <https://github.com/theruther4d>
//                 Guilherme Hübner <https://github.com/guilhermehubner>
//                 Ferdy Budhidharma <https://github.com/ferdaber>
//                 Johann Rakotoharisoa <https://github.com/jrakotoharisoa>
//                 Olivier Pascal <https://github.com/pascaloliv>
//                 Martin Hochel <https://github.com/hotell>
//                 Frank Li <https://github.com/franklixuefei>
//                 Jessica Franco <https://github.com/Jessidhia>
//                 Saransh Kataria <https://github.com/saranshkataria>
//                 Kanitkorn Sujautra <https://github.com/lukyth>
//                 Sebastian Silbermann <https://github.com/eps1lon>

import type * as CSS from 'csstype'

export interface CSSProperties
  extends CSS.Properties<string | number>,
    CSS.PropertiesHyphen<string | number> {
  /**
   * The index signature was removed to enable closed typing for style
   * using CSSType. You're able to use type assertion or module augmentation
   * to add properties or an index signature of your own.
   *
   * For examples and more information, visit:
   * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
   */
  [v: `--${string}`]: string | number | undefined
}

type Booleanish = boolean | 'true' | 'false'
type Numberish = number | string

// All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
export interface AriaAttributes {
  /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
  'aria-activedescendant'?: string
  /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
  'aria-atomic'?: Booleanish
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
   * presented if they are made.
   */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both'
  /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
  'aria-busy'?: Booleanish
  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * @see aria-pressed @see aria-selected.
   */
  'aria-checked'?: Booleanish | 'mixed'
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  'aria-colcount'?: Numberish
  /**
   * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  'aria-colindex'?: Numberish
  /**
   * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  'aria-colspan'?: Numberish
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   * @see aria-owns.
   */
  'aria-controls'?: string
  /** Indicates the element that represents the current item within a container or set of related elements. */
  'aria-current'?: Booleanish | 'page' | 'step' | 'location' | 'date' | 'time'
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  'aria-describedby'?: string
  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  'aria-details'?: string
  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   * @see aria-hidden @see aria-readonly.
   */
  'aria-disabled'?: Booleanish
  /**
   * Indicates what functions can be performed when a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  'aria-errormessage'?: string
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  'aria-expanded'?: Booleanish
  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   */
  'aria-flowto'?: string
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  'aria-grabbed'?: Booleanish
  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  'aria-haspopup'?: Booleanish | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  'aria-hidden'?: Booleanish
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  'aria-invalid'?: Booleanish | 'grammar' | 'spelling'
  /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
  'aria-keyshortcuts'?: string
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'aria-label'?: string
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'aria-labelledby'?: string
  /** Defines the hierarchical level of an element within a structure. */
  'aria-level'?: Numberish
  /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
  'aria-live'?: 'off' | 'assertive' | 'polite'
  /** Indicates whether an element is modal when displayed. */
  'aria-modal'?: Booleanish
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  'aria-multiline'?: Booleanish
  /** Indicates that the user may select more than one item from the current selectable descendants. */
  'aria-multiselectable'?: Booleanish
  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  'aria-orientation'?: 'horizontal' | 'vertical'
  /**
   * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
   * @see aria-controls.
   */
  'aria-owns'?: string
  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of the expected format.
   */
  'aria-placeholder'?: string
  /**
   * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-setsize.
   */
  'aria-posinset'?: Numberish
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked @see aria-selected.
   */
  'aria-pressed'?: Booleanish | 'mixed'
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  'aria-readonly'?: Booleanish
  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  'aria-relevant'?:
    | 'additions'
    | 'additions removals'
    | 'additions text'
    | 'all'
    | 'removals'
    | 'removals additions'
    | 'removals text'
    | 'text'
    | 'text additions'
    | 'text removals'
  /** Indicates that user input is required on the element before a form may be submitted. */
  'aria-required'?: Booleanish
  /** Defines a human-readable, author-localized description for the role of an element. */
  'aria-roledescription'?: string
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  'aria-rowcount'?: Numberish
  /**
   * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount @see aria-rowspan.
   */
  'aria-rowindex'?: Numberish
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex @see aria-colspan.
   */
  'aria-rowspan'?: Numberish
  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked @see aria-pressed.
   */
  'aria-selected'?: Booleanish
  /**
   * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-posinset.
   */
  'aria-setsize'?: Numberish
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other'
  /** Defines the maximum allowed value for a range widget. */
  'aria-valuemax'?: Numberish
  /** Defines the minimum allowed value for a range widget. */
  'aria-valuemin'?: Numberish
  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  'aria-valuenow'?: Numberish
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  'aria-valuetext'?: string
}

/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin MDN}
 */
type CrossOrigin = 'anonymous' | 'use-credentials' | ''

// Vue's style normalization supports nested arrays
export type StyleValue =
  | false
  | null
  | undefined
  | string
  | CSSProperties
  | Array<StyleValue>

export interface HTMLAttributes<T = HTMLElement>
  extends AriaAttributes,
    EventHandlers<Events<T>> {
  innerHTML?: string

  class?: any
  style?: StyleValue

  // Standard HTML Attributes
  accesskey?: string
  autocapitalize?:
    | 'off'
    | 'none'
    | 'on'
    | 'sentences'
    | 'words'
    | 'characters'
    | undefined
    | (string & {})
  autofocus?: Booleanish
  contenteditable?: Booleanish | 'inherit' | 'plaintext-only'
  contextmenu?: string
  dir?: string
  draggable?: Booleanish
  enterKeyHint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
  hidden?: Booleanish | '' | 'hidden' | 'until-found'
  id?: string
  inert?: Booleanish
  lang?: string
  nonce?: string
  placeholder?: string
  spellcheck?: Booleanish
  tabindex?: Numberish
  title?: string
  translate?: 'yes' | 'no'

  // Unknown
  radiogroup?: string // <command>, <menuitem>

  // WAI-ARIA
  role?: string

  // RDFa Attributes
  about?: string
  content?: string
  datatype?: string
  inlist?: any
  prefix?: string
  property?: string
  rel?: string
  resource?: string
  rev?: string
  typeof?: string
  vocab?: string

  // Non-standard Attributes
  autocorrect?: string
  autosave?: string
  color?: string
  itemprop?: string
  itemscope?: Booleanish
  itemtype?: string
  itemid?: string
  itemref?: string
  results?: Numberish
  security?: string
  unselectable?: 'on' | 'off'

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputmode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string
}

type HTMLAttributeReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url'

export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
  download?: any
  href?: string
  hreflang?: string
  media?: string
  ping?: string
  rel?: string
  target?: string
  type?: string
  referrerpolicy?: HTMLAttributeReferrerPolicy
}

export interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
  alt?: string
  coords?: string
  download?: any
  href?: string
  hreflang?: string
  media?: string
  referrerpolicy?: HTMLAttributeReferrerPolicy
  shape?: string
  target?: string
}

export interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}

export interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
  href?: string
  target?: string
}

export interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string
}

export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: Booleanish
  form?: string
  formaction?: string
  formenctype?: string
  formmethod?: string
  formnovalidate?: Booleanish
  formtarget?: string
  name?: string
  type?: 'submit' | 'reset' | 'button'
  value?: string | ReadonlyArray<string> | number
}

export interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: Numberish
  width?: Numberish
}

export interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
  span?: Numberish
  width?: Numberish
}

export interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
  span?: Numberish
}

export interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
  value?: string | ReadonlyArray<string> | number
}

export interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string
  open?: Booleanish
  onToggle?: (payload: ToggleEvent) => void
}

export interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string
  datetime?: string
}

export interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
  open?: Booleanish
  onClose?: (payload: Event) => void
}

export interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: Numberish
  src?: string
  type?: string
  width?: Numberish
}

export interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: Booleanish
  form?: string
  name?: string
}

export interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
  acceptcharset?: string
  action?: string
  autocomplete?: string
  enctype?: string
  method?: string
  name?: string
  novalidate?: Booleanish
  target?: string
}

export interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
  manifest?: string
}

export interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
  allow?: string
  allowfullscreen?: Booleanish
  allowtransparency?: Booleanish
  /** @deprecated */
  frameborder?: Numberish
  height?: Numberish
  loading?: 'eager' | 'lazy'
  /** @deprecated */
  marginheight?: Numberish
  /** @deprecated */
  marginwidth?: Numberish
  name?: string
  referrerpolicy?: HTMLAttributeReferrerPolicy
  sandbox?: string
  /** @deprecated */
  scrolling?: string
  seamless?: Booleanish
  src?: string
  srcdoc?: string
  width?: Numberish
}

export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
  alt?: string
  crossorigin?: CrossOrigin
  decoding?: 'async' | 'auto' | 'sync'
  height?: Numberish
  loading?: 'eager' | 'lazy'
  referrerpolicy?: HTMLAttributeReferrerPolicy
  sizes?: string
  src?: string
  srcset?: string
  usemap?: string
  width?: Numberish
}

export interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string
  datetime?: string
}

export type InputTypeHTMLAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | (string & {})

type AutoFillAddressKind = 'billing' | 'shipping'
type AutoFillBase = '' | 'off' | 'on'
type AutoFillContactField =
  | 'email'
  | 'tel'
  | 'tel-area-code'
  | 'tel-country-code'
  | 'tel-extension'
  | 'tel-local'
  | 'tel-local-prefix'
  | 'tel-local-suffix'
  | 'tel-national'
type AutoFillContactKind = 'home' | 'mobile' | 'work'
type AutoFillCredentialField = 'webauthn'
type AutoFillNormalField =
  | 'additional-name'
  | 'address-level1'
  | 'address-level2'
  | 'address-level3'
  | 'address-level4'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-family-name'
  | 'cc-given-name'
  | 'cc-name'
  | 'cc-number'
  | 'cc-type'
  | 'country'
  | 'country-name'
  | 'current-password'
  | 'family-name'
  | 'given-name'
  | 'honorific-prefix'
  | 'honorific-suffix'
  | 'name'
  | 'new-password'
  | 'one-time-code'
  | 'organization'
  | 'postal-code'
  | 'street-address'
  | 'transaction-amount'
  | 'transaction-currency'
  | 'username'
type OptionalPrefixToken<T extends string> = `${T} ` | ''
type OptionalPostfixToken<T extends string> = ` ${T}` | ''
type AutoFillField =
  | AutoFillNormalField
  | `${OptionalPrefixToken<AutoFillContactKind>}${AutoFillContactField}`
type AutoFillSection = `section-${string}`
type AutoFill =
  | AutoFillBase
  | `${OptionalPrefixToken<AutoFillSection>}${OptionalPrefixToken<AutoFillAddressKind>}${AutoFillField}${OptionalPostfixToken<AutoFillCredentialField>}`
type HTMLInputAutoCompleteAttribute = AutoFill | (string & {})

export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
  accept?: string
  alt?: string
  autocomplete?: HTMLInputAutoCompleteAttribute
  capture?: boolean | 'user' | 'environment' // https://www.w3.org/tr/html-media-capture/#the-capture-attribute
  checked?: Booleanish | any[] | Set<any> // for IDE v-model multi-checkbox support
  disabled?: Booleanish
  form?: string
  formaction?: string
  formenctype?: string
  formmethod?: string
  formnovalidate?: Booleanish
  formtarget?: string
  height?: Numberish
  indeterminate?: boolean
  list?: string
  max?: Numberish
  maxlength?: Numberish
  min?: Numberish
  minlength?: Numberish
  multiple?: Booleanish
  name?: string
  pattern?: string
  placeholder?: string
  readonly?: Booleanish
  required?: Booleanish
  size?: Numberish
  src?: string
  step?: Numberish
  type?: InputTypeHTMLAttribute
  value?: any // we support :value to be bound to anything w/ v-model
  width?: Numberish
}

export interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
  challenge?: string
  disabled?: Booleanish
  form?: string
  keytype?: string
  keyparams?: string
  name?: string
}

export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
  for?: string
  form?: string
}

export interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
  value?: string | ReadonlyArray<string> | number
}

export interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
  as?: string
  crossorigin?: CrossOrigin
  fetchPriority?: 'high' | 'low' | 'auto'
  href?: string
  hreflang?: string
  integrity?: string
  media?: string
  imageSrcSet?: string
  imageSizes?: string
  referrerpolicy?: HTMLAttributeReferrerPolicy
  sizes?: string
  type?: string
  charset?: string
}

export interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string
}

export interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
  type?: string
}

export interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
  autoplay?: Booleanish
  controls?: Booleanish
  controlslist?: string
  crossorigin?: CrossOrigin
  loop?: Booleanish
  mediagroup?: string
  muted?: Booleanish
  playsinline?: Booleanish
  preload?: string
  src?: string
}

export interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
  charset?: string
  content?: string
  httpequiv?: string
  media?: string | undefined
  name?: string
}

export interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string
  high?: Numberish
  low?: Numberish
  max?: Numberish
  min?: Numberish
  optimum?: Numberish
  value?: string | ReadonlyArray<string> | number
}

export interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string
}

export interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
  classid?: string
  data?: string
  form?: string
  height?: Numberish
  name?: string
  type?: string
  usemap?: string
  width?: Numberish
  wmode?: string
}

export interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
  reversed?: Booleanish
  start?: Numberish
  type?: '1' | 'a' | 'A' | 'i' | 'I'
}

export interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: Booleanish
  label?: string
}

export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: Booleanish
  label?: string
  selected?: Booleanish
  value?: any // we support :value to be bound to anything w/ v-model
}

export interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
  for?: string
  form?: string
  name?: string
}

export interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string
  value?: string | ReadonlyArray<string> | number
}

export interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
  max?: Numberish
  value?: string | ReadonlyArray<string> | number
}

export interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
  async?: Booleanish
  /** @deprecated */
  charset?: string
  crossorigin?: CrossOrigin
  defer?: Booleanish
  integrity?: string
  nomodule?: Booleanish
  referrerpolicy?: HTMLAttributeReferrerPolicy
  src?: string
  type?: string
}

export interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
  autocomplete?: string
  disabled?: Booleanish
  form?: string
  multiple?: Booleanish
  name?: string
  required?: Booleanish
  size?: Numberish
  value?: any // we support :value to be bound to anything w/ v-model
}

export interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: number
  media?: string
  sizes?: string
  src?: string
  srcset?: string
  type?: string
  width?: number
}

export interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
  media?: string
  scoped?: Booleanish
  type?: string
}

export interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
  align?: 'left' | 'center' | 'right'
  bgcolor?: string
  border?: number
  cellpadding?: Numberish
  cellspacing?: Numberish
  frame?: Booleanish
  rules?: 'none' | 'groups' | 'rows' | 'columns' | 'all'
  summary?: string
  width?: Numberish
}

export interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
  autocomplete?: string
  cols?: Numberish
  dirname?: string
  disabled?: Booleanish
  form?: string
  maxlength?: Numberish
  minlength?: Numberish
  name?: string
  placeholder?: string
  readonly?: Booleanish
  required?: Booleanish
  rows?: Numberish
  value?: string | ReadonlyArray<string> | number | null
  wrap?: string
}

export interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char'
  colspan?: Numberish
  headers?: string
  rowspan?: Numberish
  scope?: string
  abbr?: string
  height?: Numberish
  width?: Numberish
  valign?: 'top' | 'middle' | 'bottom' | 'baseline'
}

export interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char'
  colspan?: Numberish
  headers?: string
  rowspan?: Numberish
  scope?: string
  abbr?: string
}

export interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
  datetime?: string
}

export interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
  default?: Booleanish
  kind?: string
  label?: string
  src?: string
  srclang?: string
}

export interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
  height?: Numberish
  playsinline?: Booleanish
  poster?: string
  width?: Numberish
  disablePictureInPicture?: Booleanish
  disableRemotePlayback?: Booleanish
}

export interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
  allowfullscreen?: Booleanish
  allowpopups?: Booleanish
  autosize?: Booleanish
  blinkfeatures?: string
  disableblinkfeatures?: string
  disableguestresize?: Booleanish
  disablewebsecurity?: Booleanish
  guestinstance?: string
  httpreferrer?: string
  nodeintegration?: Booleanish
  partition?: string
  plugins?: Booleanish
  preload?: string
  src?: string
  useragent?: string
  webpreferences?: string
}

export interface SVGAttributes extends AriaAttributes, EventHandlers<Events> {
  innerHTML?: string

  /**
   * SVG Styling Attributes
   * @see https://www.w3.org/TR/SVG/styling.html#ElementSpecificStyling
   */
  class?: any
  style?: StyleValue

  color?: string
  height?: Numberish
  id?: string
  lang?: string
  max?: Numberish
  media?: string
  method?: string
  min?: Numberish
  name?: string
  target?: string
  type?: string
  width?: Numberish

  // Other HTML properties supported by SVG elements in browsers
  role?: string
  tabindex?: Numberish
  crossOrigin?: CrossOrigin

  // SVG Specific attributes
  'accent-height'?: Numberish
  accumulate?: 'none' | 'sum'
  additive?: 'replace' | 'sum'
  'alignment-baseline'?:
    | 'auto'
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'hanging'
    | 'mathematical'
    | 'inherit'
  allowReorder?: 'no' | 'yes'
  alphabetic?: Numberish
  amplitude?: Numberish
  'arabic-form'?: 'initial' | 'medial' | 'terminal' | 'isolated'
  ascent?: Numberish
  attributeName?: string
  attributeType?: string
  autoReverse?: Numberish
  azimuth?: Numberish
  baseFrequency?: Numberish
  'baseline-shift'?: Numberish
  baseProfile?: Numberish
  bbox?: Numberish
  begin?: Numberish
  bias?: Numberish
  by?: Numberish
  calcMode?: Numberish
  'cap-height'?: Numberish
  clip?: Numberish
  'clip-path'?: string
  clipPathUnits?: Numberish
  'clip-rule'?: Numberish
  'color-interpolation'?: Numberish
  'color-interpolation-filters'?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit'
  'color-profile'?: Numberish
  'color-rendering'?: Numberish
  contentScriptType?: Numberish
  contentStyleType?: Numberish
  cursor?: Numberish
  cx?: Numberish
  cy?: Numberish
  d?: string
  decelerate?: Numberish
  descent?: Numberish
  diffuseConstant?: Numberish
  direction?: Numberish
  display?: Numberish
  divisor?: Numberish
  'dominant-baseline'?: Numberish
  dur?: Numberish
  dx?: Numberish
  dy?: Numberish
  edgeMode?: Numberish
  elevation?: Numberish
  'enable-background'?: Numberish
  end?: Numberish
  exponent?: Numberish
  externalResourcesRequired?: Numberish
  fill?: string
  'fill-opacity'?: Numberish
  'fill-rule'?: 'nonzero' | 'evenodd' | 'inherit'
  filter?: string
  filterRes?: Numberish
  filterUnits?: Numberish
  'flood-color'?: Numberish
  'flood-opacity'?: Numberish
  focusable?: Numberish
  'font-family'?: string
  'font-size'?: Numberish
  'font-size-adjust'?: Numberish
  'font-stretch'?: Numberish
  'font-style'?: Numberish
  'font-variant'?: Numberish
  'font-weight'?: Numberish
  format?: Numberish
  from?: Numberish
  fx?: Numberish
  fy?: Numberish
  g1?: Numberish
  g2?: Numberish
  'glyph-name'?: Numberish
  'glyph-orientation-horizontal'?: Numberish
  'glyph-orientation-vertical'?: Numberish
  glyphRef?: Numberish
  gradientTransform?: string
  gradientUnits?: string
  hanging?: Numberish
  'horiz-adv-x'?: Numberish
  'horiz-origin-x'?: Numberish
  href?: string
  ideographic?: Numberish
  'image-rendering'?: Numberish
  in2?: Numberish
  in?: string
  intercept?: Numberish
  k1?: Numberish
  k2?: Numberish
  k3?: Numberish
  k4?: Numberish
  k?: Numberish
  kernelMatrix?: Numberish
  kernelUnitLength?: Numberish
  kerning?: Numberish
  keyPoints?: Numberish
  keySplines?: Numberish
  keyTimes?: Numberish
  lengthAdjust?: Numberish
  'letter-spacing'?: Numberish
  'lighting-color'?: Numberish
  limitingConeAngle?: Numberish
  local?: Numberish
  'marker-end'?: string
  markerHeight?: Numberish
  'marker-mid'?: string
  'marker-start'?: string
  markerUnits?: Numberish
  markerWidth?: Numberish
  mask?: string
  maskContentUnits?: Numberish
  maskUnits?: Numberish
  mathematical?: Numberish
  mode?: Numberish
  numOctaves?: Numberish
  offset?: Numberish
  opacity?: Numberish
  operator?: Numberish
  order?: Numberish
  orient?: Numberish
  orientation?: Numberish
  origin?: Numberish
  overflow?: Numberish
  'overline-position'?: Numberish
  'overline-thickness'?: Numberish
  'paint-order'?: Numberish
  'panose-1'?: Numberish
  pathLength?: Numberish
  patternContentUnits?: string
  patternTransform?: Numberish
  patternUnits?: string
  'pointer-events'?: Numberish
  points?: string
  pointsAtX?: Numberish
  pointsAtY?: Numberish
  pointsAtZ?: Numberish
  preserveAlpha?: Numberish
  preserveAspectRatio?: string
  primitiveUnits?: Numberish
  r?: Numberish
  radius?: Numberish
  refX?: Numberish
  refY?: Numberish
  renderingIntent?: Numberish
  repeatCount?: Numberish
  repeatDur?: Numberish
  requiredExtensions?: Numberish
  requiredFeatures?: Numberish
  restart?: Numberish
  result?: string
  rotate?: Numberish
  rx?: Numberish
  ry?: Numberish
  scale?: Numberish
  seed?: Numberish
  'shape-rendering'?: Numberish
  slope?: Numberish
  spacing?: Numberish
  specularConstant?: Numberish
  specularExponent?: Numberish
  speed?: Numberish
  spreadMethod?: string
  startOffset?: Numberish
  stdDeviation?: Numberish
  stemh?: Numberish
  stemv?: Numberish
  stitchTiles?: Numberish
  'stop-color'?: string
  'stop-opacity'?: Numberish
  'strikethrough-position'?: Numberish
  'strikethrough-thickness'?: Numberish
  string?: Numberish
  stroke?: string
  'stroke-dasharray'?: Numberish
  'stroke-dashoffset'?: Numberish
  'stroke-linecap'?: 'butt' | 'round' | 'square' | 'inherit'
  'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | 'inherit'
  'stroke-miterlimit'?: Numberish
  'stroke-opacity'?: Numberish
  'stroke-width'?: Numberish
  surfaceScale?: Numberish
  systemLanguage?: Numberish
  tableValues?: Numberish
  targetX?: Numberish
  targetY?: Numberish
  'text-anchor'?: string
  'text-decoration'?: Numberish
  textLength?: Numberish
  'text-rendering'?: Numberish
  to?: Numberish
  transform?: string
  u1?: Numberish
  u2?: Numberish
  'underline-position'?: Numberish
  'underline-thickness'?: Numberish
  unicode?: Numberish
  'unicode-bidi'?: Numberish
  'unicode-range'?: Numberish
  'unitsPer-em'?: Numberish
  'v-alphabetic'?: Numberish
  values?: string
  'vector-effect'?: Numberish
  version?: string
  'vert-adv-y'?: Numberish
  'vert-origin-x'?: Numberish
  'vert-origin-y'?: Numberish
  'v-hanging'?: Numberish
  'v-ideographic'?: Numberish
  viewBox?: string
  viewTarget?: Numberish
  visibility?: Numberish
  'v-mathematical'?: Numberish
  widths?: Numberish
  'word-spacing'?: Numberish
  'writing-mode'?: Numberish
  x1?: Numberish
  x2?: Numberish
  x?: Numberish
  xChannelSelector?: string
  'x-height'?: Numberish
  xlinkActuate?: string
  xlinkArcrole?: string
  xlinkHref?: string
  xlinkRole?: string
  xlinkShow?: string
  xlinkTitle?: string
  xlinkType?: string
  xmlns?: string
  xmlnsXlink?: string
  y1?: Numberish
  y2?: Numberish
  y?: Numberish
  yChannelSelector?: string
  z?: Numberish
  zoomAndPan?: string
}

export interface IntrinsicElementAttributes {
  a: AnchorHTMLAttributes<HTMLAnchorElement>
  abbr: HTMLAttributes<HTMLElement>
  address: HTMLAttributes<HTMLElement>
  area: AreaHTMLAttributes<HTMLAreaElement>
  article: HTMLAttributes<HTMLElement>
  aside: HTMLAttributes<HTMLElement>
  audio: AudioHTMLAttributes<HTMLAudioElement>
  b: HTMLAttributes<HTMLElement>
  base: BaseHTMLAttributes<HTMLBaseElement>
  bdi: HTMLAttributes<HTMLElement>
  bdo: HTMLAttributes<HTMLElement>
  big: HTMLAttributes<HTMLElement>
  blockquote: BlockquoteHTMLAttributes<HTMLQuoteElement>
  body: HTMLAttributes<HTMLBodyElement>
  br: HTMLAttributes<HTMLBRElement>
  button: ButtonHTMLAttributes<HTMLButtonElement>
  canvas: CanvasHTMLAttributes<HTMLCanvasElement>
  caption: HTMLAttributes<HTMLElement>
  cite: HTMLAttributes<HTMLElement>
  code: HTMLAttributes<HTMLElement>
  col: ColHTMLAttributes<HTMLTableColElement>
  colgroup: ColgroupHTMLAttributes<HTMLTableColElement>
  data: DataHTMLAttributes<HTMLDataElement>
  datalist: HTMLAttributes<HTMLDataListElement>
  dd: HTMLAttributes<HTMLElement>
  del: DelHTMLAttributes<HTMLModElement>
  details: DetailsHTMLAttributes<HTMLDetailsElement>
  dfn: HTMLAttributes<HTMLElement>
  dialog: DialogHTMLAttributes<HTMLDialogElement>
  div: HTMLAttributes<HTMLDivElement>
  dl: HTMLAttributes<HTMLDListElement>
  dt: HTMLAttributes<HTMLElement>
  em: HTMLAttributes<HTMLElement>
  embed: EmbedHTMLAttributes<HTMLEmbedElement>
  fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>
  figcaption: HTMLAttributes<HTMLElement>
  figure: HTMLAttributes<HTMLElement>
  footer: HTMLAttributes<HTMLElement>
  form: FormHTMLAttributes<HTMLFormElement>
  h1: HTMLAttributes<HTMLHeadingElement>
  h2: HTMLAttributes<HTMLHeadingElement>
  h3: HTMLAttributes<HTMLHeadingElement>
  h4: HTMLAttributes<HTMLHeadingElement>
  h5: HTMLAttributes<HTMLHeadingElement>
  h6: HTMLAttributes<HTMLHeadingElement>
  head: HTMLAttributes<HTMLHeadElement>
  header: HTMLAttributes<HTMLElement>
  hgroup: HTMLAttributes<HTMLElement>
  hr: HTMLAttributes<HTMLHRElement>
  html: HtmlHTMLAttributes<HTMLHtmlElement>
  i: HTMLAttributes<HTMLElement>
  iframe: IframeHTMLAttributes<HTMLIFrameElement>
  img: ImgHTMLAttributes<HTMLImageElement>
  input: InputHTMLAttributes<HTMLInputElement>
  ins: InsHTMLAttributes<HTMLModElement>
  kbd: HTMLAttributes<HTMLElement>
  keygen: KeygenHTMLAttributes<HTMLElement>
  label: LabelHTMLAttributes<HTMLLabelElement>
  legend: HTMLAttributes<HTMLLegendElement>
  li: LiHTMLAttributes<HTMLLIElement>
  link: LinkHTMLAttributes<HTMLLinkElement>
  main: HTMLAttributes<HTMLElement>
  map: MapHTMLAttributes<HTMLMapElement>
  mark: HTMLAttributes<HTMLElement>
  menu: MenuHTMLAttributes<HTMLElement>
  menuitem: HTMLAttributes<HTMLElement>
  meta: MetaHTMLAttributes<HTMLMetaElement>
  meter: MeterHTMLAttributes<HTMLMeterElement>
  nav: HTMLAttributes<HTMLElement>
  noindex: HTMLAttributes<HTMLElement>
  noscript: HTMLAttributes<HTMLObjectElement>
  object: ObjectHTMLAttributes<HTMLObjectElement>
  ol: OlHTMLAttributes<HTMLOListElement>
  optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>
  option: OptionHTMLAttributes<HTMLOptionElement>
  output: OutputHTMLAttributes<HTMLOutputElement>
  p: HTMLAttributes<HTMLParagraphElement>
  param: ParamHTMLAttributes<HTMLParamElement>
  picture: HTMLAttributes<HTMLElement>
  pre: HTMLAttributes<HTMLPreElement>
  progress: ProgressHTMLAttributes<HTMLProgressElement>
  q: QuoteHTMLAttributes<HTMLQuoteElement>
  rp: HTMLAttributes<HTMLElement>
  rt: HTMLAttributes<HTMLElement>
  ruby: HTMLAttributes<HTMLElement>
  s: HTMLAttributes<HTMLElement>
  samp: HTMLAttributes<HTMLElement>
  search: HTMLAttributes<HTMLElement>
  script: ScriptHTMLAttributes<HTMLScriptElement>
  section: HTMLAttributes<HTMLElement>
  select: SelectHTMLAttributes<HTMLSelectElement>
  small: HTMLAttributes<HTMLElement>
  source: SourceHTMLAttributes<HTMLSourceElement>
  span: HTMLAttributes<HTMLSpanElement>
  strong: HTMLAttributes<HTMLElement>
  style: StyleHTMLAttributes<HTMLStyleElement>
  sub: HTMLAttributes<HTMLElement>
  summary: HTMLAttributes<HTMLElement>
  sup: HTMLAttributes<HTMLElement>
  table: TableHTMLAttributes<HTMLTableElement>
  template: HTMLAttributes<HTMLTemplateElement>
  tbody: HTMLAttributes<HTMLTableSectionElement>
  td: TdHTMLAttributes<HTMLTableDataCellElement>
  textarea: TextareaHTMLAttributes<HTMLTextAreaElement>
  tfoot: HTMLAttributes<HTMLTableSectionElement>
  th: ThHTMLAttributes<HTMLTableHeaderCellElement>
  thead: HTMLAttributes<HTMLTableSectionElement>
  time: TimeHTMLAttributes<HTMLTimeElement>
  title: HTMLAttributes<HTMLTitleElement>
  tr: HTMLAttributes<HTMLTableRowElement>
  track: TrackHTMLAttributes<HTMLTrackElement>
  u: HTMLAttributes<HTMLElement>
  ul: HTMLAttributes<HTMLUListElement>
  var: HTMLAttributes<HTMLElement>
  video: VideoHTMLAttributes<HTMLVideoElement>
  wbr: HTMLAttributes<HTMLElement>
  webview: WebViewHTMLAttributes<HTMLWebViewElement>

  // SVG
  svg: SVGAttributes

  animate: SVGAttributes
  animateMotion: SVGAttributes
  animateTransform: SVGAttributes
  circle: SVGAttributes
  clipPath: SVGAttributes
  defs: SVGAttributes
  desc: SVGAttributes
  ellipse: SVGAttributes
  feBlend: SVGAttributes
  feColorMatrix: SVGAttributes
  feComponentTransfer: SVGAttributes
  feComposite: SVGAttributes
  feConvolveMatrix: SVGAttributes
  feDiffuseLighting: SVGAttributes
  feDisplacementMap: SVGAttributes
  feDistantLight: SVGAttributes
  feDropShadow: SVGAttributes
  feFlood: SVGAttributes
  feFuncA: SVGAttributes
  feFuncB: SVGAttributes
  feFuncG: SVGAttributes
  feFuncR: SVGAttributes
  feGaussianBlur: SVGAttributes
  feImage: SVGAttributes
  feMerge: SVGAttributes
  feMergeNode: SVGAttributes
  feMorphology: SVGAttributes
  feOffset: SVGAttributes
  fePointLight: SVGAttributes
  feSpecularLighting: SVGAttributes
  feSpotLight: SVGAttributes
  feTile: SVGAttributes
  feTurbulence: SVGAttributes
  filter: SVGAttributes
  foreignObject: SVGAttributes
  g: SVGAttributes
  image: SVGAttributes
  line: SVGAttributes
  linearGradient: SVGAttributes
  marker: SVGAttributes
  mask: SVGAttributes
  metadata: SVGAttributes
  mpath: SVGAttributes
  path: SVGAttributes
  pattern: SVGAttributes
  polygon: SVGAttributes
  polyline: SVGAttributes
  radialGradient: SVGAttributes
  rect: SVGAttributes
  stop: SVGAttributes
  switch: SVGAttributes
  symbol: SVGAttributes
  text: SVGAttributes
  textPath: SVGAttributes
  tspan: SVGAttributes
  use: SVGAttributes
  view: SVGAttributes
}

export interface Events<T = Element> {
  // clipboard events
  onCopy: ClipboardEventHandler<T>
  onCut: ClipboardEventHandler<T>
  onPaste: ClipboardEventHandler<T>

  // composition events
  onCompositionend: CompositionEventHandler<T>
  onCompositionstart: CompositionEventHandler<T>
  onCompositionupdate: CompositionEventHandler<T>

  // drag drop events
  onDrag: DragEventHandler<T>
  onDragend: DragEventHandler<T>
  onDragenter: DragEventHandler<T>
  onDragexit: DragEventHandler<T>
  onDragleave: DragEventHandler<T>
  onDragover: DragEventHandler<T>
  onDragstart: DragEventHandler<T>
  onDrop: DragEventHandler<T>

  // focus events
  onFocus: FocusEventHandler<T>
  onFocusin: FocusEventHandler<T>
  onFocusout: FocusEventHandler<T>
  onBlur: FocusEventHandler<T>

  // form events
  onChange: ChangeEventHandler<T>
  onBeforeinput: FormEventHandler<T>
  onInput: FormEventHandler<T>
  onReset: FormEventHandler<T>
  onSubmit: FormEventHandler<T>
  onInvalid: FormEventHandler<T>

  // image events
  onLoad: BaseEventHandler<T>
  onError: BaseEventHandler<T>

  // keyboard events
  onKeydown: KeyboardEventHandler<T>
  onKeypress: KeyboardEventHandler<T>
  onKeyup: KeyboardEventHandler

  // mouse events
  onAuxclick: MouseEventHandler<T>
  onClick: MouseEventHandler<T>
  onContextmenu: MouseEventHandler<T>
  onDblclick: MouseEventHandler<T>
  onMousedown: MouseEventHandler<T>
  onMouseenter: MouseEventHandler<T>
  onMouseleave: MouseEventHandler<T>
  onMousemove: MouseEventHandler<T>
  onMouseout: MouseEventHandler<T>
  onMouseover: MouseEventHandler<T>
  onMouseup: MouseEventHandler<T>

  // media events
  onAbort: BaseEventHandler<T>
  onCanplay: BaseEventHandler<T>
  onCanplaythrough: BaseEventHandler<T>
  onDurationchange: BaseEventHandler<T>
  onEmptied: BaseEventHandler<T>
  onEncrypted: BaseEventHandler<T>
  onEnded: BaseEventHandler<T>
  onLoadeddata: BaseEventHandler<T>
  onLoadedmetadata: BaseEventHandler<T>
  onLoadstart: BaseEventHandler<T>
  onPause: BaseEventHandler<T>
  onPlay: BaseEventHandler<T>
  onPlaying: BaseEventHandler<T>
  onProgress: BaseEventHandler<T>
  onRatechange: BaseEventHandler<T>
  onSeeked: BaseEventHandler<T>
  onSeeking: BaseEventHandler<T>
  onStalled: BaseEventHandler<T>
  onSuspend: BaseEventHandler<T>
  onTimeupdate: BaseEventHandler<T>
  onVolumechange: BaseEventHandler<T>
  onWaiting: BaseEventHandler<T>

  // selection events
  onSelect: BaseEventHandler<T>

  // scroll events
  onScroll: UIEventHandler<T>
  onScrollend: UIEventHandler<T>

  // touch events
  onTouchcancel: TouchEvent
  onTouchend: TouchEvent
  onTouchmove: TouchEvent
  onTouchstart: TouchEvent

  // pointer events
  onPointerdown: PointerEvent
  onPointermove: PointerEvent
  onPointerup: PointerEvent
  onPointercancel: PointerEvent
  onPointerenter: PointerEvent
  onPointerleave: PointerEvent
  onPointerover: PointerEvent
  onPointerout: PointerEvent

  // wheel events
  onWheel: WheelEventHandler<T>

  // animation events
  onAnimationstart: AnimationEventHandler<T>
  onAnimationend: AnimationEventHandler<T>
  onAnimationiteration: AnimationEventHandler<T>

  // transition events
  onTransitionend: TransitionEventHandler<T>
  onTransitionstart: TransitionEventHandler<T>
}

type EventHandlers<E> = {
  [K in keyof E]?: E[K] extends (...args: any) => any
    ? E[K]
    : (payload: E[K]) => void
}

export type ReservedProps = {
  key?: PropertyKey
  ref?: import('vue').VNodeRef
  ref_for?: boolean
  ref_key?: string
}

export type NativeElements = {
  [K in keyof IntrinsicElementAttributes]: IntrinsicElementAttributes[K] &
    ReservedProps
}

interface BaseSyntheticEvent<E = object, C = unknown, T = unknown> {
  nativeEvent: E
  currentTarget: C
  target: T
  bubbles: boolean
  cancelable: boolean
  defaultPrevented: boolean
  eventPhase: number
  isTrusted: boolean
  preventDefault: () => void
  isDefaultPrevented: () => boolean
  stopPropagation: () => void
  isPropagationStopped: () => boolean
  persist: () => void
  timeStamp: number
  type: string
}

/**
 * currentTarget - a reference to the element on which the event listener is registered.
 *
 * target - a reference to the element from which the event was originally dispatched.
 * This might be a child element to the element on which the event listener is registered.
 * If you thought this should be `EventTarget & T`, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682
 */
interface SyntheticEvent<T = Element, E = Event>
  extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> {}

type EventHandler<E extends SyntheticEvent<any>> = {
  bivarianceHack: (event: E) => void
}['bivarianceHack']

type BaseEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>

interface ClipboardEvent<T = Element>
  extends SyntheticEvent<T, globalThis.ClipboardEvent> {
  clipboardData: DataTransfer
}
type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>

interface CompositionEvent<T = Element>
  extends SyntheticEvent<T, globalThis.CompositionEvent> {
  data: string
}
type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>

interface DragEvent<T = Element> extends MouseEvent<T, globalThis.DragEvent> {
  dataTransfer: DataTransfer
}
type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>

interface FocusEvent<Target = Element, RelatedTarget = Element>
  extends SyntheticEvent<Target, globalThis.FocusEvent> {
  relatedTarget: (EventTarget & RelatedTarget) | null
  target: EventTarget & Target
}
type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>

interface FormEvent<T = Element> extends SyntheticEvent<T> {}
type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>

interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
  target: EventTarget & T
}
type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>

interface KeyboardEvent<T = Element>
  extends UIEvent<T, globalThis.KeyboardEvent> {
  altKey: boolean
  /** @deprecated */
  charCode: number
  ctrlKey: boolean
  code: string
  /**
   * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
   */
  getModifierState: (key: ModifierKey) => boolean
  /**
   * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible values
   */
  key: string
  /** @deprecated */
  keyCode: number
  locale: string
  location: number
  metaKey: boolean
  repeat: boolean
  shiftKey: boolean
  /** @deprecated */
  which: number
}
type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>

export type ModifierKey =
  | 'Alt'
  | 'AltGraph'
  | 'CapsLock'
  | 'Control'
  | 'Fn'
  | 'FnLock'
  | 'Hyper'
  | 'Meta'
  | 'NumLock'
  | 'ScrollLock'
  | 'Shift'
  | 'Super'
  | 'Symbol'
  | 'SymbolLock'
interface MouseEvent<T = Element, E = globalThis.MouseEvent>
  extends UIEvent<T, E> {
  altKey: boolean
  button: number
  buttons: number
  clientX: number
  clientY: number
  ctrlKey: boolean
  /**
   * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier). for a list of valid (case-sensitive) arguments to this method.
   */
  getModifierState: (key: ModifierKey) => boolean
  metaKey: boolean
  movementX: number
  movementY: number
  pageX: number
  pageY: number
  relatedTarget: EventTarget | null
  screenX: number
  screenY: number
  shiftKey: boolean
}
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>

interface AbstractView {
  styleMedia: StyleMedia
  document: Document
}
interface UIEvent<T = Element, E = globalThis.UIEvent>
  extends SyntheticEvent<T, E> {
  detail: number
  view: AbstractView
}
type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>

interface WheelEvent<T = Element> extends MouseEvent<T, globalThis.WheelEvent> {
  deltaMode: number
  deltaX: number
  deltaY: number
  deltaZ: number
}
type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>

interface AnimationEvent<T = Element>
  extends SyntheticEvent<T, globalThis.AnimationEvent> {
  animationName: string
  elapsedTime: number
  pseudoElement: string
}
type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>

interface TransitionEvent<T = Element>
  extends SyntheticEvent<T, globalThis.TransitionEvent> {
  elapsedTime: number
  propertyName: string
  pseudoElement: string
}
type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>
