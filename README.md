# msc-shortcut

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/msc-shortcut) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/29392/branches/944454/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=29392&bid=944454)

&lt;msc-shortcut /> is a menu component which based on [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) & [CSS anchor positioning API](https://developer.chrome.com/docs/css-ui/anchor-positioning-api). That means shortcut will be top-layer with well controlled position. Besides that, there will be 16 kinds of [position-area](https://chrome.dev/anchor-tool/) for developers to setup shortcut display position.

![<msc-shortcut />](https://blog.lalacube.com/mei/img/preview/msc-shortcut.png)

## Basic Usage

&lt;msc-shortcut /> is a web component. All we need to do is put the required script into your HTML document. Then follow &lt;msc-shortcut />'s html structure and everything will be all set.

- Required Script

```html
<script 
  type="module"
  src="https://unpkg.com/msc-shortcut/mjs/wc-msc-shortcut.js">
</script>
```

- Structure

Put &lt;msc-shortcut /> into HTML document.

```html
<msc-shortcut>
  <script type="application/json">
    {
      "groups": [
        {
          "legend": "Streaming",
          "menu": [
            {
              "key": "add-merchandise",
              "title": "Add merchandise",
              "content": "Add merchandise"
            },
            {
              "key": "streaming-analytics",
              "title": "View analytics",
              "content": "View analytics"
            },
            {
              "key": "download",
              "title": "Download video",
              "content": "Download video"
            }
          ]
        },
        {
          "legend": "Lucky draw",
          "menu": [
            {
              "key": "winner-list",
              "title": "View winners",
              "content": "View winners"
            },
            {
              "key": "event-detail",
              "title": "View detail",
              "content": "View detail"
            }
          ]
        },
        {
          "legend": "Customer care",
          "menu": [
            {
              "key": "call-help",
              "title": "Call for help",
              "content": "Call for help"
            }
          ]
        }
      ]
    }
  </script>
</msc-shortcut>
```

## JavaScript Instantiation

&lt;msc-shortcut /> could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { MscShortcut } from 'https://unpkg.com/msc-shortcut/mjs/wc-msc-shortcut.js';

//use DOM api
const nodeA = document.createElement('msc-shortcut');
document.body.appendChild(nodeA);
nodeA.groups = [
  {
    legend: 'Streaming',
    menu: [
      {
        key: 'add-merchandise',
        title: 'Add merchandise',
        content: 'Add merchandise'
      },
      {
        key: 'streaming-analytics',
        title: 'View analytics',
        content: 'View analytics'
      },
      {
        key: 'download',
        title: 'Download video',
        content: 'Download video'
      }
    ]
  }
];

// new instance with Class
const nodeB = new MscShortcut();
document.body.appendChild(nodeB);
nodeB.groups = [
  {
    legend: 'Streaming',
    menu: [
      {
        key: 'add-merchandise',
        title: 'Add merchandise',
        content: 'Add merchandise'
      },
      {
        key: 'streaming-analytics',
        title: 'View analytics',
        content: 'View analytics'
      },
      {
        key: 'download',
        title: 'Download video',
        content: 'Download video'
      }
    ]
  }
];

// new instance with Class & default config
const config = {
  groups: [
    {
      legend: 'Streaming',
      menu: [
        {
          key: 'add-merchandise',
          title: 'Add merchandise',
          content: 'Add merchandise'
        },
        {
          key: 'streaming-analytics',
          title: 'View analytics',
          content: 'View analytics'
        },
        {
          key: 'download',
          title: 'Download video',
          content: 'Download video'
        }
      ]
    }
  ]
};
const nodeC = new MscShortcut(config);
document.body.appendChild(nodeC);
</script>
```

## Style Customization

&lt;msc-shortcut /> uses CSS custom properties to hook its interface. That means developer could easy change it into the looks you like.

```html
<style>
msc-shortcut {
  --msc-shortcut--gap: 12px;

  /* trigger */
  --msc-shortcut-trigger-size: 40;
  --msc-shortcut-trigger-icon-color: rgba(35 42 49);
  --msc-shortcut-trigger-background: rgba(255 255 255);
  --msc-shortcut-trigger-overlay: rgba(225 246 245);

  /* shortcut */
  --msc-shortcut-shortcut-background: rgba(255 255 255);
  --msc-shortcut-shortcut-legend-color: rgba(151 158 168);
  --msc-shortcut-shortcut-text-color: rgba(35 42 49);
  --msc-shortcut-shortcut-line-color: rgba(224 228 233);
  --msc-shortcut-shortcut-overlay: rgba(225 246 245);

  /* customize icons */
  --msc-shortcut-button1-icon: path('M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM12 7C12.552 7 13 7.448 13 8V11H16C16.552 11 17 11.448 17 12C17 12.5525 16.552 13 16 13H13V16C13 16.5525 12.552 17 12 17C11.4475 17 11 16.5525 11 16V13H8C7.448 13 7 12.5525 7 12C7 11.448 7.448 11 8 11H11V8C11 7.448 11.4475 7 12 7Z');
  --msc-shortcut-button2-icon: path('M21.4078 5L16.0488 6.266C15.5118 6.392 15.1788 6.931 15.3058 7.469C15.4328 8.005 15.9708 8.338 16.5088 8.212L18.3248 7.783L18.3328 7.788L12.4268 15.651L8.29881 10.161C8.09481 9.89 7.77881 9.77 7.46381 9.781C7.14781 9.77 6.83181 9.89 6.62781 10.161L1.70081 16.715C1.36881 17.156 1.45781 17.783 1.89881 18.115C2.33981 18.447 2.96681 18.358 3.29881 17.917L7.46381 12.378L11.6278 17.917C11.6568 17.956 11.6998 17.977 11.7328 18.01C11.7668 18.044 11.7878 18.086 11.8268 18.115C11.8428 18.128 11.8628 18.129 11.8798 18.141C11.9388 18.18 12.0008 18.204 12.0658 18.229C12.1238 18.252 12.1778 18.277 12.2378 18.289C12.3008 18.301 12.3628 18.299 12.4268 18.299C12.4918 18.299 12.5538 18.301 12.6168 18.289C12.6768 18.277 12.7308 18.252 12.7888 18.229C12.8538 18.204 12.9158 18.18 12.9748 18.14C12.9918 18.129 13.0118 18.127 13.0278 18.115C13.0668 18.086 13.0878 18.044 13.1218 18.01C13.1548 17.976 13.1968 17.956 13.2268 17.916L19.9768 8.93L20.2648 10.745C20.3088 11.033 20.4718 11.272 20.6948 11.423C20.8958 11.558 21.1458 11.622 21.4048 11.583C21.9508 11.499 22.3258 10.988 22.2418 10.443L21.4078 5Z');
  --msc-shortcut-button3-icon: path('M6.285 11.641 12 16.989l5.715-5.348a.959.959 0 1 0-1.357-1.357L13 13.641V1h-2v12.641l-3.357-3.357a.96.96 0 0 0-1.358 1.357ZM2 22c0 .551.448 1 1 1h18c.552 0 1-.449 1-1v-6a1 1 0 1 0-2 0v5H4v-5a1 1 0 1 0-2 0v6Z');
  --msc-shortcut-button4-icon: path(evenodd, 'M18.6112 19.2557L17.9681 18.7946L16.7498 17.9194L15.6071 18.8874L14.4455 19.8711L13.214 18.8672L11.9995 17.8771L10.786 18.8672L9.55544 19.8711L8.39101 18.8865L7.24735 17.9194L6.02908 18.7946L5.38973 19.2539L5.38878 3.83688H18.6112V19.2557ZM4.44439 2C3.92592 2 3.5 2.4234 3.5 2.94048L3.50094 21.076C3.50094 21.6161 3.95614 21.9963 4.44817 21.9963C4.6191 21.9963 4.79571 21.9504 4.95814 21.8475L7.15102 20.2724L8.96803 21.809C9.13708 21.9366 9.34106 22 9.54505 22C9.73771 22 9.92942 21.9431 10.0947 21.8292L11.9995 20.2742L13.9063 21.8292C14.0706 21.9431 14.2632 22 14.4559 22C14.6599 22 14.8629 21.9366 15.0329 21.809L16.8471 20.2724L19.0428 21.8485C19.2062 21.9504 19.3818 21.9963 19.5528 21.9963C20.0448 21.9963 20.5 21.6161 20.5 21.077V2.94048C20.5 2.4234 20.075 2 19.5556 2H4.44439ZM15.7772 12.1133C16.2994 12.1133 16.7216 11.7019 16.7216 11.1949C16.7216 10.687 16.2994 10.2765 15.7772 10.2765H8.223C7.70075 10.2765 7.27861 10.687 7.27861 11.1949C7.27861 11.7019 7.70075 12.1133 8.223 12.1133H15.7772ZM11.0552 8.43957C11.3174 8.43957 11.9996 8.21646 11.9996 7.52112C11.9996 7.01323 11.5775 6.60268 11.0552 6.60268H8.223C7.70075 6.60268 7.27861 7.01323 7.27861 7.52112C7.27861 8.0281 7.70075 8.43957 8.223 8.43957H11.0552ZM15.7772 15.7871C16.2994 15.7871 16.7216 15.3756 16.7216 14.8687C16.7216 14.3608 16.2994 13.9502 15.7772 13.9502H8.223C7.70075 13.9502 7.27861 14.3608 7.27861 14.8687C7.27861 15.3756 7.70075 15.7871 8.223 15.7871H15.7772Z');
  --msc-shortcut-button5-icon: path('M14.2188 2.37461C14.5637 1.94378 15.1939 1.87372 15.625 2.21836C16.0561 2.56328 16.1259 3.19336 15.7812 3.62461L13.0566 7.02989H19.5967C20.0954 7.03004 20.4996 7.41093 20.5 7.87657V12.275C20.5 12.7307 20.1235 13.1006 19.6357 13.1197V13.9996H17.8271V13.1227H11.873V19.6441H13V21.4996H3.26758C2.76832 21.4994 2.3633 21.0873 2.36328 20.5797V13.1197C1.883 13.0998 1.50002 12.7284 1.5 12.275V7.87657C1.50038 7.4091 1.89693 7.03004 2.40332 7.02989H8.94336L6.21875 3.62461L6.15918 3.54161C5.88433 3.11588 5.97076 2.54175 6.375 2.21836C6.77919 1.89525 7.35796 1.93701 7.71289 2.29844L7.78125 2.37461L11 6.39805L14.2188 2.37461ZM4.17188 19.6441H10.127V13.1227H4.17188V19.6441ZM3.30859 11.4391H10.127V8.71348H3.30859V11.4391ZM11.873 11.4391H18.6914V8.71348H11.873V11.4391Z M20 16.134C20.4783 15.858 21.0901 16.022 21.3662 16.5002C21.581 16.8723 21.5282 17.3242 21.2695 17.6369C21.391 17.7778 21.5012 17.9318 21.5977 18.0989C21.6938 18.2654 21.7719 18.4374 21.833 18.6125C21.8873 18.6034 21.9431 18.5989 22 18.5989C22.5523 18.5989 23 19.0466 23 19.5989C22.9998 20.151 22.5522 20.5989 22 20.5989C21.942 20.5989 21.8854 20.5917 21.8301 20.5823C21.707 20.9368 21.5181 21.2679 21.2676 21.5578C21.3033 21.6009 21.3373 21.6464 21.3662 21.6965C21.6423 22.1748 21.4783 22.7866 21 23.0627C20.5217 23.3388 19.9099 23.1748 19.6338 22.6965C19.6049 22.6465 19.5819 22.5946 19.5625 22.5422C19.1866 22.614 18.8057 22.6127 18.4375 22.5422C18.3596 22.754 18.2107 22.9411 18 23.0627C17.5217 23.3388 16.9099 23.1748 16.6338 22.6965C16.419 22.3244 16.4707 21.8715 16.7295 21.5588C16.6084 21.4183 16.4975 21.2654 16.4014 21.0989C16.3049 20.9318 16.2273 20.7589 16.166 20.5832C16.1119 20.5923 16.0566 20.5989 16 20.5989C15.4478 20.5989 15.0002 20.151 15 19.5989C15 19.0466 15.4477 18.5989 16 18.5989C16.0576 18.5989 16.114 18.6041 16.1689 18.6135C16.2921 18.2592 16.4811 17.9277 16.7314 17.6379C16.6961 17.5952 16.6624 17.5498 16.6338 17.5002C16.3578 17.022 16.5218 16.4101 17 16.134C17.4783 15.858 18.0901 16.022 18.3662 16.5002C18.3949 16.5498 18.4172 16.6016 18.4365 16.6535C18.8122 16.5817 19.1935 16.5832 19.5615 16.6535C19.6395 16.4421 19.7896 16.2555 20 16.134ZM19.8652 19.0989C19.5891 18.6207 18.9782 18.4567 18.5 18.7327C18.022 19.0089 17.8578 19.6207 18.1338 20.0989C18.41 20.5767 19.0219 20.7398 19.5 20.4641C19.9778 20.1879 20.1411 19.577 19.8652 19.0989Z');
  --msc-shortcut-button6-icon: path('M12 1c6.064 0 11 4.935 11 11s-4.936 11-11 11C5.935 23 1 18.065 1 12S5.935 1 12 1Zm0 2c-4.962 0-8.999 4.038-8.999 9 0 4.963 4.037 9 8.999 9 4.962 0 9-4.037 9-9 0-4.962-4.038-9-9-9Zm0 13a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-10c2.206 0 4.001 1.753 4.001 3.905 0 1.749-1.186 3.229-2.812 3.723l-.189.053v.344A.988.988 0 0 1 12 15a.991.991 0 0 1-.992-.861L11 14.025v-1.191c0-.539.448-.977.999-.977 1.103 0 2.001-.875 2.001-1.952s-.897-1.953-2-1.953-2 .876-2 1.953c0 .54-.448.976-1 .976a.988.988 0 0 1-.999-.976C8.001 7.753 9.794 6 12 6Z');
  ...
}
</style>
```

Otherwise delevelopers could also add attribute - `data-positionarea` to change shortcut display position. Default is "`right span-bottom`". (view all [position-area](https://chrome.dev/anchor-tool/))

```html
<msc-shortcut data-position-area="right span-bottom">
  ...
</msc-shortcut>
```

## Attributes

&lt;msc-shortcut /> supports some attributes to let it become more convenience & useful.

- groups

Set groups config. This should be array string. Each unit needs to contain "`legend`" & "`menu`".

`legend`：Set each group's legend.\
`menu`：Set each group's menu. This should be array string. Each unit needs to contain "`key`"、"`title`" & "`content`".

```html
<msc-shortcut groups="[{"legend":"Streaming","menu":[{"key":"add-merchandise","title":"Add merchandise","content":"Add merchandise"}]}]">
  ...
</msc-shortcut>
```

## Property
| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| open | Boolean | Getter &lt;msc-shortcut />'s open state. |
| groups | Array | Setter / Getter &lt;msc-shortcut />'s groups config. Each unit needs to contain "`legend`" & "`menu`". |

## Events
| Event Signature | Description |
| ----------- | ----------- |
| msc-shortcut-click | Fired when &lt;msc-shortcut /> clicked. Developers could gather menu information through `event.detail`. |
| msc-shortcut-toggle | Fired before &lt;msc-shortcut /> is open or closed. Developers could gather state information through `event.detail`. |

## Mathods
| Mathod Signature | Description |
| ----------- | ----------- |
| click() | Simulate &lt;msc-shortcut /> click action. |
| toggle(force) | Toggle &lt;msc-shortcut /> open or close. （force is optional, developers could set boolean to force open or close. |

## Reference
- [&lt;msc-shortcut /> demo](https://blog.lalacube.com/mei/webComponent_msc-shortcut.html)
- [WEBCOMPONENTS.ORG](https://www.webcomponents.org/element/msc-shortcut)
- [YouTube tutorial](https://www.youtube.com/shorts/CxSqiP4Twjo)
- [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
- [CSS anchor positioning API](https://developer.chrome.com/docs/css-ui/anchor-positioning-api)
- [position-area](https://chrome.dev/anchor-tool/)
