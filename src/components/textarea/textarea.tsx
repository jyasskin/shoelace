import { Component, Method, Prop, State, Watch, h } from '@stencil/core';
import { ResizeObserver } from 'resize-observer';

@Component({
  tag: 'sl-textarea',
  styleUrl: 'textarea.scss',
  shadow: true
})
export class Textarea {
  resizeObserver: any;
  textarea: HTMLTextAreaElement;

  constructor() {
    this.handleInput = this.handleInput.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  @State() hasFocus = false;

  /** The textarea's size. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** The textarea's name attribute. */
  @Prop() name = '';

  /** The textarea's value attribute. */
  @Prop({ mutable: true }) value = '';

  /** The textarea's placeholder text. */
  @Prop() placeholder: string;

  /** Set to true to disable the textarea. */
  @Prop() disabled = false;

  /** Set to true for a readonly textarea. */
  @Prop() readonly = false;

  /** Controls how the textarea can be resized. */
  @Prop() resize: 'none' | 'vertical' | 'auto' = 'vertical';

  /** The textarea's maxlength attribute. */
  @Prop() maxlength: number;

  /** The textarea's autocaptialize attribute. */
  @Prop() autocapitalize: string;

  /** The textarea's autocorrect attribute. */
  @Prop() autocorrect: string;

  /** The textarea's autocomplete attribute. */
  @Prop() autocomplete: string;

  /** The textarea's autofocus attribute. */
  @Prop() autofocus: boolean;

  /** The textarea's required attribute. */
  @Prop() required: boolean;

  /** The input's inputmode attribute. */
  @Prop() nativeInputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** The input's tabindex attribute. */
  @Prop() nativeTabindex: number;

  /** The number of rows to display by default. */
  @Prop() rows = 4;

  @Watch('rows')
  handleRowsChange() {
    this.setTextareaHeight();
  }

  componentDidLoad() {
    this.setTextareaHeight();
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
    this.resizeObserver.observe(this.textarea);
  }

  componentDidUnload() {
    this.resizeObserver.unobserve();
  }

  /** Sets focus on the textarea. */
  @Method()
  async setFocus() {
    this.textarea.focus();
  }

  /** Removes focus fromt the textarea. */
  @Method()
  async removeFocus() {
    this.textarea.blur();
  }

  handleInput() {
    this.value = this.textarea.value;
    this.setTextareaHeight();
  }

  handleWindowResize() {
    this.setTextareaHeight();
  }

  setTextareaHeight() {
    if (this.resize === 'auto') {
      this.textarea.style.height = 'auto';
      this.textarea.style.height = this.textarea.scrollHeight + 'px';
    } else {
      this.textarea.style.height = undefined;
    }
  }

  render() {
    return (
      <div
        class={{
          'sl-textarea': true,

          // Sizes
          'sl-textarea--small': this.size === 'small',
          'sl-textarea--medium': this.size === 'medium',
          'sl-textarea--large': this.size === 'large',

          // States
          'sl-textarea--disabled': this.disabled,
          'sl-textarea--focused': this.hasFocus,
          'sl-textarea--empty': this.value.length === 0,

          // Modifiers
          'sl-textarea--resize-none': this.resize === 'none',
          'sl-textarea--resize-vertical': this.resize === 'vertical',
          'sl-textarea--resize-auto': this.resize === 'auto'
        }}
        onClick={() => this.textarea.focus()}
      >
        <textarea
          ref={el => (this.textarea = el)}
          class="sl-textarea__control"
          name={this.name}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readOnly={this.readonly}
          rows={this.rows}
          maxLength={this.maxlength}
          value={this.value}
          autoCapitalize={this.autocapitalize}
          autoCorrect={this.autocorrect}
          autoFocus={this.autofocus}
          required={this.required}
          inputMode={this.nativeInputmode}
          tabIndex={this.nativeTabindex}
          onFocus={() => (this.hasFocus = true)}
          onBlur={() => (this.hasFocus = false)}
          onInput={this.handleInput}
        />
      </div>
    );
  }
}
