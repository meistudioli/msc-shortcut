import { _wcl } from './common-lib.js';
import { _wccss } from './common-css.js';
import Mustache from './mustache.js';

/*
 reference:
 - The CSS anchor positioning API: https://developer.chrome.com/docs/css-ui/anchor-positioning-api
 - anchor position tool: https://chrome.dev/anchor-tool/
 */

const defaults = {
  groups: [],
};

const booleanAttrs = []; // booleanAttrs default should be false
const objectAttrs = ['groups'];
const custumEvents = {
  click: 'msc-shortcut-click',
  toggle: 'msc-shortcut-toggle'
};
const isAnchorPositioningAPIReady = CSS.supports("anchor-name: --myanchor");

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}

:host {
  position: relative;
  inline-size: fit-content;
  block-size: fit-content;
  display: block;
  writing-mode: inherit;
}

.main {
  --size: var(--msc-shortcut-trigger-size, 40);
  --size-with-unit: calc(var(--size) * 1px);
  --gap: var(--msc-shortcut--gap, 12px);
  
  /* trigger */
  --trigger-icon: var(
    --msc-shortcut-trigger-icon,
    path(evenodd, 'M21.4531 19.7969H3.45312C2.90193 19.7969 2.45312 19.3481 2.45312 18.7969C2.45312 18.2449 2.90193 17.7969 3.45312 17.7969H21.4531C22.0051 17.7969 22.4531 18.2449 22.4531 18.7969C22.4531 19.3473 22.0059 19.7969 21.4531 19.7969ZM21.4531 13.2969H3.45312C2.90193 13.2969 2.45312 12.8481 2.45312 12.2969C2.45312 11.7449 2.90193 11.2969 3.45312 11.2969H21.4531C22.0051 11.2969 22.4531 11.7449 22.4531 12.2969C22.4531 12.8473 22.0059 13.2969 21.4531 13.2969ZM21.4531 6.79614H3.45312C2.90193 6.79614 2.45312 6.34814 2.45312 5.79614C2.45312 5.24414 2.90193 4.79614 3.45312 4.79614H21.4531C22.0051 4.79614 22.4531 5.24414 22.4531 5.79614C22.4531 6.34814 22.0059 6.79614 21.4531 6.79614Z')
  );
  --trigger-icon-color: var(--msc-shortcut-trigger-icon-color, rgba(35 42 49));
  --trigger-background: var(--msc-shortcut-trigger-background, rgba(255 255 255));
  --trigger-overlay: var(--msc-shortcut-trigger-overlay, rgba(225 246 245));

  /* shortcut */
  --shortcut-inline-size: 0;
  --shortcut-block-size: 0;
  --shortcut-background: var(--msc-shortcut-shortcut-background, rgba(255 255 255));
  --shortcut-legend-color: var(--msc-shortcut-shortcut-legend-color, rgba(151 158 168));
  --shortcut-text-color: var(--msc-shortcut-shortcut-text-color, rgba(35 42 49));
  --shortcut-button-icon: path('M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM12 7C12.552 7 13 7.448 13 8V11H16C16.552 11 17 11.448 17 12C17 12.5525 16.552 13 16 13H13V16C13 16.5525 12.552 17 12 17C11.4475 17 11 16.5525 11 16V13H8C7.448 13 7 12.5525 7 12C7 11.448 7.448 11 8 11H11V8C11 7.448 11.4475 7 12 7Z');
  --shortcut-line-color: var(--msc-shortcut-shortcut-line-color, rgba(224 228 233));
  --shortcut-overlay: var(--msc-shortcut-shortcut-overlay, rgba(225 246 245));

  /* shortcut common */
  --inset-inline: auto;
  --inset-block: auto;
  --margin-inline: var(--gap) 0;
  --margin-block: 0;

  /* anchor position */
  --position-area: inline-end span-block-end;
  
  /* none support anchor position */
  --translate-normal: 0 15%;
  --translate-active: 0 0;
  --translate: var(--translate-normal);
  --pointer-events: none;

  --opacity-normal: 0;
  --opacity-active: 1;
  --opacity: var(--opacity-normal);

  &:has([data-reverse]) {
    --opacity: var(--opacity-active);
    --translate: var(--translate-active);
    --pointer-events: auto;

    .shortcut {
      z-index: 2147483647;
    }
  }

  &:has(:popover-open) .button-two-face {
    --before-scale: 0;
    --after-scale: var(--button-icon-scale-basis);
  }

  position: relative;
  inline-size: fit-content;
  block-size: fit-content;
  line-height: 0; /* avoid extra white space */

  .trigger {
    --button-size: var(--size);
    --button-active-scale: .85;
    --button-icon-scale-rate: .57;
    --before-icon: var(--trigger-icon);
    --after-icon: path(evenodd, 'M18.3663 16.9533L13.414 12.0008L18.3663 7.04829C18.7561 6.65766 18.7561 6.02289 18.3663 5.63306C17.9765 5.24243 17.3425 5.24243 16.9519 5.63306L11.9996 10.5856L7.04737 5.63306C6.65756 5.24243 6.02281 5.24243 5.6322 5.63306C5.24239 6.02289 5.24239 6.65686 5.6322 7.04749L10.5853 12.0008L5.6322 16.9525C5.24239 17.3423 5.24239 17.9763 5.6322 18.3677C6.02281 18.7575 6.65676 18.7575 7.04737 18.3677L11.9996 13.4144L16.9519 18.3677C17.3417 18.7575 17.9765 18.7575 18.3663 18.3677C18.7577 17.9771 18.7577 17.3431 18.3663 16.9525V16.9533Z');
    --button-icon: var(--trigger-icon-color);
    --button-background: var(--trigger-background);

    border-radius: var(--size-with-unit);
    box-shadow: 0 0 1px rgba(0 0 0/.1), 0 2px 4px rgba(0 0 0/.08);

    anchor-name: --main-anchor;

    &:focus-visible {
      --button-background: var(--trigger-overlay);
    }

    @media (hover: hover) {
      &:hover {
        --button-background: var(--trigger-overlay);
      }
    }
  }

  .shortcut {
    position: absolute;
    inset-inline: var(--inset-inline);
    inset-block: var(--inset-block);
    min-inline-size: 200px;
    background-color: rgba(255 0 0/.5);
    border-radius: 8px;
    border: 0 none;
    pointer-events: none;
    box-shadow: 0 0 1px rgba(0 0 0/.1), 0 2px 4px rgba(0 0 0/.08);
    margin-inline: var(--margin-inline);
    margin-block: var(--margin-block);

    padding-block: .5em 1em;
    background-color: var(--shortcut-background);

    &.shortcut--clone {
      visibility: hidden;
      pointer-events: none;
    }

    .shortcut__set {
      font-family: 'PingFang TC',system-ui,sans-serif;

      > * {
        inline-size: 100%;
        padding-inline: 16px;
        padding-block: 8px;
        box-sizing: border-box;
      }

      button {
        --icon: var(--shortcut-button-icon);

        --background-color-normal: transparent;
        --background-color-active: var(--shortcut-overlay);
        --background-color: var(--background-color-normal);

        flex-shrink: 0;
        font-size: inherit;
        appearance: none;
        box-shadow: unset;
        border: unset;
        background: transparent;
        -webkit-user-select: none;
        user-select: none;
        pointer-events: auto;
        margin: 0;
        outline: 0 none;

        font-size: 1em;
        color: var(--shortcut-text-color);
        line-height: 1.25;
        text-align: start;
        background-color: var(--background-color);
        display: flex;
        align-items: center;
        gap: .75em;
        white-space: nowrap;

        transition: background .2s ease;
        will-change: background;

        &:focus-visible {
          --background-color: var(--background-color-active);
        }

        @media (hover: hover) {
          &:hover {
            --background-color: var(--background-color-active);
          }
        }

${
Array(30)
  .fill()
  .map(
    (I, idx) => {
      const key = idx + 1;

      return `
        &[data-sn="${key}"] {
          --icon: var(--msc-shortcut-button${key}-icon, var(--shortcut-button-icon));
        }`;
    }
  ).join('\n')
}

        &::before {
          flex-shrink: 0;
          content: '';
          inline-size: 24px;
          aspect-ratio: 1/1;
          background-color: var(--shortcut-text-color);
          clip-path: var(--icon);
        }
      }

      p {
        font-size: 14px;
        line-height: 20px;
        color: var(--shortcut-legend-color);
      }

      &+.shortcut__set {
        border-block-start: 1px solid var(--shortcut-line-color);
        margin-block-start: 8px;
      }
    }

    &:not([popover]) {
      translate: var(--translate);

      opacity: var(--opacity);
      transition:
        opacity .4s ease,
        translate .4s ease;
      will-change: opacity,translate;
      pointer-events: var(--pointer-events);

      button {
        pointer-events: var(--pointer-events);
      } 
    }

    @supports (anchor-name: --myanchor) {
      &:popover-open {
        translate: 0 0;
        opacity: 1;

        @starting-style {
          translate: 0 15%;
          opacity: 0;
        }
      }

      inset: auto;
      translate: none;
      position-anchor: --main-anchor;
      position-area: var(--position-area);

      translate: 0 -30%;
      opacity: 0;
      will-change: translate,opacity,overlay,display;

      transition: 
        translate 400ms cubic-bezier(.4,0,.2,1), 
        opacity 400ms cubic-bezier(.4,0,.2,1),
        overlay 400ms cubic-bezier(.4,0,.2,1) allow-discrete,
        display 400ms cubic-bezier(.4,0,.2,1) allow-discrete;

      pointer-events: auto;
    }
  }
}

.main.main--maneuver{}

/* inline-end series */
:host([data-position-area="inline-end span-block-end"]) .main,
:host([data-position-area="span-block-end inline-end"]) .main {
  --position-area: self-inline-end span-self-block-end;
  --margin-inline: var(--gap) 0;
  --margin-block: 0;

  --inset-inline: var(--size-with-unit) auto;
  --inset-block: 0 auto;
}

:host([data-position-area="inline-end span-block-start"]) .main,
:host([data-position-area="span-block-start inline-end"]) .main {
  --position-area: self-inline-end span-self-block-start;
  --margin-inline: var(--gap) 0;
  --margin-block: 0;

  --inset-inline: var(--size-with-unit) auto;
  --inset-block: calc(var(--size-with-unit) - var(--shortcut-block-size)) auto;
}

:host([data-position-area="inline-end center"]) .main,
:host([data-position-area="center inline-end"]) .main,
:host([data-position-area="inline-end"]) .main {
  --position-area: self-inline-end center;
  --margin-inline: var(--gap) 0;
  --margin-block: 0;

  --inset-inline: var(--size-with-unit) auto;
  --inset-block: calc(50% - (var(--shortcut-block-size) / 2)) auto;
}

/* inline-start series */
:host([data-position-area="inline-start span-block-end"]) .main,
:host([data-position-area="span-block-end inline-start"]) .main {
  --position-area: self-inline-start span-self-block-end;
  --margin-inline: 0 var(--gap);
  --margin-block: 0;

  --inset-inline: auto var(--size-with-unit);
  --inset-block: 0 auto;
}

:host([data-position-area="inline-start span-block-start"]) .main,
:host([data-position-area="span-block-start inline-start"]) .main {
  --position-area: self-inline-start span-self-block-start;
  --margin-inline: 0 var(--gap);
  --margin-block: 0;

  --inset-inline: auto var(--size-with-unit);
  --inset-block: calc(var(--size-with-unit) - var(--shortcut-block-size)) auto;
}

:host([data-position-area="inline-start center"]) .main,
:host([data-position-area="center inline-start"]) .main,
:host([data-position-area="inline-start"]) .main {
  --position-area: self-inline-start center;
  --margin-inline: 0 var(--gap);
  --margin-block: 0;

  --inset-inline: auto var(--size-with-unit);
  --inset-block: calc(50% - (var(--shortcut-block-size) / 2)) auto;
}

/* block-end series */
:host([data-position-area="block-end span-inline-end"]) .main,
:host([data-position-area="span-inline-end block-end"]) .main {
  --position-area: self-block-end span-self-inline-end;
  --margin-inline: 0;
  --margin-block: var(--gap) 0;

  --inset-inline: 0 auto;
  --inset-block: var(--size-with-unit) auto;
}

:host([data-position-area="block-end span-inline-start"]) .main,
:host([data-position-area="span-inline-start block-end"]) .main {
  --position-area: self-block-end span-self-inline-start;
  --margin-inline: 0;
  --margin-block: var(--gap) 0;

  --inset-inline: auto 0;
  --inset-block: var(--size-with-unit) auto;
}

:host([data-position-area="block-end center"]) .main,
:host([data-position-area="center block-end"]) .main,
:host([data-position-area="block-end"]) .main {
  --position-area: self-block-end center;
  --margin-inline: 0;
  --margin-block: var(--gap) 0;

  --inset-inline: calc(50% - (var(--shortcut-inline-size) / 2)) auto;
  --inset-block: var(--size-with-unit) auto;
}

/* block-start series */
:host([data-position-area="block-start span-inline-end"]) .main,
:host([data-position-area="span-inline-end block-start"]) .main {
  --position-area: self-block-start span-self-inline-end;
  --margin-inline: 0;
  --margin-block: 0 var(--gap);

  --inset-inline: 0 auto;
  --inset-block: auto var(--size-with-unit);
}

:host([data-position-area="block-start span-inline-start"]) .main,
:host([data-position-area="span-inline-start block-start"]) .main {
  --position-area: self-block-start span-self-inline-start;
  --margin-inline: 0;
  --margin-block: 0 var(--gap);

  --inset-inline: auto 0;
  --inset-block: auto var(--size-with-unit);
}

:host([data-position-area="block-start center"]) .main,
:host([data-position-area="center block-start"]) .main,
:host([data-position-area="block-start"]) .main {
  --position-area: self-block-start center;
  --margin-inline: 0;
  --margin-block: 0 var(--gap);

  --inset-inline: calc(50% - (var(--shortcut-inline-size) / 2)) auto;
  --inset-block: auto var(--size-with-unit);
}

/* exrea */
:host([data-position-area="block-start inline-start"]) .main,
:host([data-position-area="inline-start block-start"]) .main,
:host([data-position-area="start"]) .main {
  --position-area: self-block-start self-inline-start;
  --margin-inline: 0 var(--gap);
  --margin-block: 0 var(--gap);

  --inset-inline: auto var(--size-with-unit);
  --inset-block: auto var(--size-with-unit);
}

:host([data-position-area="block-start inline-end"]) .main,
:host([data-position-area="inline-end block-start"]) .main {
  --position-area: self-block-start self-inline-end;
  --margin-inline: var(--gap) 0;
  --margin-block: 0 var(--gap);

  --inset-inline: var(--size-with-unit) auto;
  --inset-block: auto var(--size-with-unit);
}

:host([data-position-area="block-end inline-start"]) .main,
:host([data-position-area="inline-start block-end"]) .main {
  --position-area: self-block-end self-inline-start;
  --margin-inline: 0 var(--gap);
  --margin-block: var(--gap) 0;

  --inset-inline: auto var(--size-with-unit);
  --inset-block: var(--size-with-unit) auto;
}

:host([data-position-area="block-end inline-end"]) .main,
:host([data-position-area="inline-end block-end"]) .main,
:host([data-position-area="end"]) .main {
  --position-area: self-block-end self-inline-end;
  --margin-inline: var(--gap) 0;
  --margin-block: var(--gap) 0;

  --inset-inline: var(--size-with-unit) auto;
  --inset-block: var(--size-with-unit) auto;
}
</style>

<div class="main main--maneuver" ontouchstart="">
  <button type="button" class="trigger button-two-face" popovertarget="shortcut" title="shortcut"></button>
  <div id="shortcut" class="shortcut" popover></div>
</div>
`;

const templateGroups = document.createElement('template');
templateGroups.innerHTML = `
{{#groups}}
  <div class="shortcut__set">
    <p>{{legend}}</p>
    {{#menu}}
      <button
        type="button"
        class="shortcut__set__button"
        title="{{title}}"
        data-sn="{{sn}}"
        data-key="{{key}}"
        popovertarget="shortcut"
        popovertargetaction="hide"
      >
        {{content}}
      </button>
    {{/menu}}
  </div>
{{/groups}}
`;

/*
 Houdini Props and Vals
 - https://web.dev/at-property/
 - https://drafts.css-houdini.org/css-properties-values-api/#syntax-strings
 */
if (CSS?.registerProperty) {
  try {
    CSS.registerProperty({
      name: '--msc-shortcut-trigger-size',
      syntax: '<number>',
      inherits: true,
      initialValue: 40
    });

    CSS.registerProperty({
      name: '--msc-shortcut--gap',
      syntax: '<length>',
      inherits: true,
      initialValue: '12px'
    });

    CSS.registerProperty({
      name: '--msc-shortcut-shortcut-legend-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(151 158 168)'
    });

    CSS.registerProperty({
      name: '--msc-shortcut-shortcut-text-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(35 42 49)'
    });

    CSS.registerProperty({
      name: '--msc-shortcut-shortcut-line-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(224 228 233)'
    });
  } catch(err) {
    console.warn(`msc-shortcut: ${err.message}`);
  }
}

export class MscShortcut extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: ''
    };

    // nodes
    this.#nodes = {
      styleSheet: this.shadowRoot.querySelector('style'),
      main: this.shadowRoot.querySelector('.main'),
      trigger: this.shadowRoot.querySelector('.trigger'),
      shortcut: this.shadowRoot.querySelector('.shortcut')
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new MscShortcut(config)
    };

    // evts
    this._onTriggerClick = this._onTriggerClick.bind(this);
    this._onShortcutClick = this._onShortcutClick.bind(this);
    this._onToggle = this._onToggle.bind(this);
  }

  async connectedCallback() {
    const { config, error } = await _wcl.getWCConfig(this);
    const { trigger, shortcut } = this.#nodes;

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this.#upgradeProperty(key));

    // evts
    this.#data.controller = new AbortController();
    const signal = this.#data.controller.signal;
    trigger.addEventListener('click', this._onTriggerClick, { signal });
    shortcut.addEventListener('click', this._onShortcutClick, { signal });
    shortcut.addEventListener('toggle', this._onToggle, { signal });
  }

  disconnectedCallback() {
    if (this.#data?.controller) {
      this.#data.controller.abort();
    }
  }

  #format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      if (booleanAttrs.includes(attrName)) {
        this.#config[attrName] = false;
      } else {
        this.#config[attrName] = defaults[attrName];
      }
    } else {
      switch (attrName) {
        case 'groups': {
          let values;

          try {
            values = JSON.parse(newValue);
          } catch(err) {
            console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${err.message}`);
            values = Array.isArray(defaults[attrName]) ? [ ...defaults[attrName] ] : { ...defaults[attrName] };
          }

          let sn = 0;
          values = values.reduce(
            (acc, cur, idx) => {
              const {
                legend = `Legend - ${idx + 1}`,
                menu = []
              } = cur;

              return !menu.length
                ? acc
                : acc.concat({
                  legend,
                  menu: menu.map(
                    (unit = {}) => {
                      sn += 1;
                      const {
                        key = `key-${sn}`,
                        title = `title-${sn}`,
                        content = `content-${sn}`
                      } = unit;

                      return {
                        key,
                        title,
                        content,
                        sn
                      };
                    }
                  )
                });
            }
          , []);

          this.#config[attrName] = values;
          break;
        }
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!MscShortcut.observedAttributes.includes(attrName)) {
      return;
    }

    this.#format(attrName, oldValue, newValue);

    switch (attrName) {
      case 'groups': {
        const { shortcut } = this.#nodes;

        shortcut.replaceChildren();

        if (isAnchorPositioningAPIReady) {
          shortcut.popover = 'auto';
        } else {
          shortcut.toggleAttribute('popover', false);
        }

        const menuTemplateString = Mustache.render(templateGroups.innerHTML, { groups: this.groups });
        shortcut.insertAdjacentHTML('beforeend', menuTemplateString);
        
        this.#setShortcutSize();
        break;
      }
    }
  }

  #setShortcutSize() {
    if (isAnchorPositioningAPIReady) {
      return;
    }

    const { styleSheet, shortcut } = this.#nodes;
    const { width = 0, height = 0 } = shortcut.getBoundingClientRect();
    _wcl.addStylesheetRules(
      '.main.main--maneuver',
      {
        '--shortcut-inline-size': `${width}px`,
        '--shortcut-block-size': `${height}px`
      },
      styleSheet
    );
  }

  static get observedAttributes() {
    return Object.keys(defaults); // MscShortcut.observedAttributes
  }

  static get supportedEvents() {
    return Object.keys(custumEvents).map(
      (key) => {
        return custumEvents[key];
      }
    );
  }

  #upgradeProperty(prop) {
    let value;

    if (MscShortcut.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (booleanAttrs.includes(prop)) {
          value = (this.hasAttribute(prop) || this.#config[prop]) ? true : false;
        } else if (objectAttrs.includes(prop)) {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : JSON.stringify(this.#config[prop]);
        } else {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }

  set groups(value) {
    if (value) {
      const newValue = [
        ...(typeof value === 'string' ? JSON.parse(value) : value)
      ];
      this.setAttribute('groups', JSON.stringify(newValue));
    } else {
      this.removeAttribute('groups');
    }
  }

  get groups() {
    return this.#config.groups;
  }

  get open() {
    const { main, trigger } = this.#nodes;
    const flag = isAnchorPositioningAPIReady
      ? main.querySelector('*:popover-open')
      : trigger.hasAttribute('data-reverse');

    return !!flag;
  }

  #fireEvent(evtName, detail) {
    this.dispatchEvent(new CustomEvent(evtName,
      {
        bubbles: true,
        composed: true,
        ...(detail && { detail })
      }
    ));
  }

  _onTriggerClick() {
    if (isAnchorPositioningAPIReady) {
      return;
    }

    const force = !this.open;

    this.#fireEvent(custumEvents.toggle, {
      oldState: force ? 'closed' : 'open',
      newState: force ? 'open' : 'closed'
    });

    this.#nodes.trigger.toggleAttribute('data-reverse');
  }

  _onShortcutClick(evt) {
    const button = evt.target.closest('button');

    if (!button) {
      return;
    }

    if (!isAnchorPositioningAPIReady) {
      this.#fireEvent(custumEvents.toggle, {
        oldState: 'open',
        newState: 'closed'
      });

      this.#nodes.trigger.toggleAttribute('data-reverse', false);
    }
    
    this.#fireEvent(custumEvents.click, {
      key: button.dataset.key,
      title: button.title,
      content: button.textContent.trim()
    });
  }

  _onToggle(evt) {
    const { newState, oldState } = evt;

    this.#fireEvent(custumEvents.toggle, { newState, oldState });
  }

  toggle(force = !this.open) {
    force = Boolean(force);

    if (force !== this.open) {
      this.#nodes.trigger.click();
    }
  }

  click() {
    this.#nodes.trigger.click();
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('MscShortcut');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('MscShortcut'), MscShortcut);
}