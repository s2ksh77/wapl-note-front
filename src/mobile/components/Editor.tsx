import { Editor as TinyMceEditor } from '@tinymce/tinymce-react';
import { useNoteStore } from '@wapl/note-core';

const Editor = () => {
  const { pageStore, editorStore } = useNoteStore();

  const handleEditorChange = editorContent => {
    pageStore.pageInfo.content = editorContent;
  };
  return (
    <TinyMceEditor
      apiKey="90655irb9nds5o8ycj2bpivk0v2y34e2oa6qta82nclxrnx3"
      initialValue={pageStore.pageInfo.content}
      init={{
        ...{
          height: 'calc(100% - 163px)',
          mobile: {
            plugins: 'table codesample insertdatetime hr',
            toolbar: 'undo redo blank blank extra image attach font menu link',
            toolbar_location: 'bottom',
            toolbar_mode: 'floating',
            toolbar_sticky: true,
            toolbar_sticky_offset: 56,
            statusbar: false,
            menubar: false,
          },
          content_style: `
                body {
                  margin: 0 16px 0 16px;
                  font-size: 14px;
                  font-weight: 400;
                  color: #222;
                }
                p { margin: 0; }
              `,
        },
        setup(editor) {
          editorStore.setEditor(editor);
          editor.ui.registry.addIcon(
            'undo',
            '<svg width="24" height="24"><path d="M8.6 6.7a.8.8 0 00-1.2-1l-3 3.6a.7.7 0 00-.1.5c0 .3 0 .5.3.6l2.8 3.3a.8.8 0 001.2-1l-2-2.1h9c1.5 0 2.7 1.3 2.7 3 0 1.6-1.2 2.9-2.7 2.9H7A.8.8 0 107 18h8.6c2.4 0 4.2-2 4.1-4.5 0-2.4-1.7-4.4-4-4.4H6.5l2-2.4z" fill-rule="evenodd"/></svg>',
          );
          editor.ui.registry.addIcon(
            'redo',
            '<svg width="24" height="24"><path d="M15.431 6.738a.75.75 0 1 1 1.139-.976l3 3.5a.749.749 0 0 1 .18.545.75.75 0 0 1-.36.641l-2.82 3.29a.75.75 0 1 1-1.139-.976l1.89-2.205H8.39c-1.446.034-2.668 1.316-2.638 2.958v.027c-.03 1.641 1.192 2.924 2.638 2.958H17a.75.75 0 1 1 0 1.5H8.365c-2.352-.049-4.15-2.089-4.114-4.472-.036-2.382 1.762-4.422 4.114-4.471h9.054L15.43 6.738Z" fill-rule="evenodd"/></svg>',
          );
          editor.ui.registry.addIcon(
            'extra',
            '<svg width="24" height="24"><path d="M11.75 5a.75.75 0 0 0-1.5 0v5.25H5a.75.75 0 0 0 0 1.5h5.25V17a.75.75 0 0 0 1.5 0v-5.25H17a.75.75 0 0 0 0-1.5h-5.25V5Z" fill-rule="evenodd"/></svg>',
          );
          editor.ui.registry.addIcon(
            'image',
            '<svg width="24" height="24"><path d="M18 4.5H6A1.5 1.5 0 0 0 4.5 6v7.542l3.143-2.137a2.75 2.75 0 0 1 3.667.523l6.25 7.572H18a1.5 1.5 0 0 0 1.5-1.5V6A1.5 1.5 0 0 0 18 4.5Zm-2.385 15-5.462-6.617a1.25 1.25 0 0 0-1.667-.238L4.5 15.357V18A1.5 1.5 0 0 0 6 19.5h9.615ZM6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm9 4.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12.25 9a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0Z" fill-rule="evenodd"/></svg>',
          );
          editor.ui.registry.addIcon(
            'attach',
            '<svg width="24" height="24"><path d="M12.676 2.884c-1.384.334-2.619 1.248-3.453 2.214l-4.35 5.038c-1.346 1.559-1.823 3.09-1.77 4.392a4.46 4.46 0 0 0 1.54 3.215l2.1 1.813a.75.75 0 1 1-.98 1.135l-2.1-1.813a5.96 5.96 0 0 1-2.058-4.289c-.071-1.738.577-3.632 2.132-5.433l4.35-5.039c.98-1.134 2.47-2.265 4.238-2.69 1.809-.437 3.846-.116 5.79 1.562 1.952 1.685 2.469 3.585 2.174 5.374-.284 1.722-1.304 3.255-2.248 4.348l-2.175 2.52-.568-.49.568.49-.002.002-.003.003-.01.01a7.329 7.329 0 0 1-.15.164c-.1.108-.246.256-.427.426a9.66 9.66 0 0 1-1.473 1.152c-1.15.717-2.959 1.39-4.513.047-.795-.686-1.285-1.409-1.5-2.162-.216-.758-.134-1.475.087-2.107.372-1.06 1.18-1.974 1.705-2.568.071-.08.138-.156.197-.225l2.285-2.646a.75.75 0 0 1 1.135.98l-2.285 2.647-.222.255c-.543.619-1.133 1.293-1.399 2.053-.141.402-.175.797-.06 1.199.116.406.405.893 1.037 1.439.753.65 1.706.46 2.739-.185a8.83 8.83 0 0 0 1.697-1.435l.022-.025.004-.005 2.176-2.52c.869-1.005 1.684-2.286 1.903-3.611.207-1.259-.106-2.641-1.674-3.995-1.575-1.36-3.116-1.563-4.459-1.24Z" fill-rule="evenodd"/></svg>',
          );
          editor.ui.registry.addIcon(
            'font',
            '<svg width="24" height="24"><path d="M10.555 17.67h1.79L7.307 4H5.62L.58 17.67h1.79l1.374-3.913h5.438l1.373 3.913ZM6.387 6.207h.152l2.14 6.1H4.247l2.141-6.1ZM16.555 17.85c1.364 0 2.482-.597 3.145-1.687h.151v1.507h1.554v-6.992c0-2.121-1.393-3.4-3.884-3.4-2.179 0-3.79 1.08-4.007 2.718h1.648c.228-.805 1.08-1.269 2.302-1.269 1.525 0 2.312.692 2.312 1.951v.929l-2.947.18c-2.377.142-3.722 1.193-3.722 3.022 0 1.866 1.468 3.04 3.448 3.04Zm.303-1.43c-1.184 0-2.065-.607-2.065-1.65 0-1.022.682-1.562 2.236-1.666l2.747-.18v.938c0 1.458-1.241 2.557-2.918 2.557Z" fill-rule="evenodd"/></svg>',
          );
          editor.ui.registry.addIcon(
            'menu',
            '<svg width="24" height="24"><path d="M3.25 5A.75.75 0 0 1 4 4.25h14a.75.75 0 0 1 0 1.5H4A.75.75 0 0 1 3.25 5Zm0 6a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75ZM4 16.25a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 0-1.5H4Z" fill-rule="evenodd"/></svg>',
          );
          editor.ui.registry.addIcon(
            'link',
            '<svg width="24" height="24"><g><g clipPath="url(#a)" fill-rule="evenodd" clip-rule="evenodd"><path d="M19.265 2.659a3.956 3.956 0 0 1 0 5.594l-5.182 5.182a3.956 3.956 0 0 1-5.595 0 .75.75 0 1 1 1.06-1.06c.96.959 2.515.959 3.475 0l5.181-5.182a2.456 2.456 0 0 0-3.473-3.474L12.14 6.31a.75.75 0 0 1-1.06-1.06l2.59-2.591a3.956 3.956 0 0 1 5.595 0Z"/>       <path d="M2.659 19.265a3.956 3.956 0 0 1 0-5.595L7.84 8.488a3.956 3.956 0 0 1 5.595 0 .75.75 0 1 1-1.061 1.061 2.456 2.456 0 0 0-3.474 0L3.72 14.731a2.456 2.456 0 1 0 3.474 3.473l2.59-2.59a.75.75 0 0 1 1.062 1.06l-2.591 2.591a3.956 3.956 0 0 1-5.595 0Z"/></g><defs><clipPath id="a"><path d="M0 0h22v22H0z" /></clipPath></defs></g></svg>',
          );
          editor.ui.registry.addIcon(
            'hr',
            '<svg width="24" height="24"><path d="M17.75 11a.75.75 0 0 1-.75.75H5a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75Z" fill-rule="evenodd"/></svg>',
          );
          editor.ui.registry.addIcon(
            'table',
            '<svg width="24" height="24"><path d="M18 4.5h-2.25v3.75h3.75V6A1.5 1.5 0 0 0 18 4.5Zm-8.25 0h4.5v3.75h-4.5V4.5Zm-1.5 0H6A1.5 1.5 0 0 0 4.5 6v2.25h3.75V4.5Zm0 5.25H4.5v4.5h3.75v-4.5Zm0 6H4.5V18A1.5 1.5 0 0 0 6 19.5h2.25v-3.75Zm1.5 3.75v-3.75h4.5v3.75h-4.5Zm0-5.25v-4.5h4.5v4.5h-4.5Zm6 1.5v3.75H18a1.5 1.5 0 0 0 1.5-1.5v-2.25h-3.75Zm0-6v4.5h3.75v-4.5h-3.75ZM6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Z" fill-rule="evenodd"/></svg>',
          );
          editor.ui.registry.addIcon(
            'codesample',
            '<svg width="24" height="24"><path d="M13.347 5.265a.75.75 0 0 1 .588.882l-2.4 12a.75.75 0 1 1-1.47-.294l2.4-12a.75.75 0 0 1 .882-.588ZM16.27 7.87a.75.75 0 0 1 1.06 0l3.6 3.6a.75.75 0 0 1-.007 1.068l-3.6 3.5a.75.75 0 0 1-1.046-1.076l3.055-2.97L16.27 8.93a.75.75 0 0 1 0-1.06Zm-8.536.054a.75.75 0 0 1-.008 1.06L4.668 12l3.058 3.016a.75.75 0 1 1-1.053 1.068l-3.6-3.55a.75.75 0 0 1 0-1.068l3.6-3.55a.75.75 0 0 1 1.061.008Z" fill-rule="evenodd"/></svg>',
          );
          editor.ui.registry.addIcon(
            'insertdatetime',
            '<svg width="24" height="24"><path d="M11 2.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17ZM11 1c5.523 0 10 4.478 10 10s-4.477 10-10 10C5.478 21 1 16.522 1 11S5.478 1 11 1Zm.75 6a.75.75 0 0 0-1.5 0v4c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V7Z" fill-rule="evenodd"/></svg>',
          );
          editor.ui.registry.addIcon('blank', '<svg width="24" height="24"></svg>');
          editor.ui.registry.addGroupToolbarButton('extra', {
            icon: 'extra',
            items: 'hr table codesample insertdatetime',
          });
          editor.ui.registry.addButton('image', {
            icon: 'image',
            onAction() {
              console.log('hi');
            },
          });
          editor.ui.registry.addButton('attach', {
            icon: 'attach',
            onAction() {
              console.log('hi');
            },
          });
          editor.ui.registry.addButton('font', {
            icon: 'font',
            onAction() {
              console.log('hi');
            },
          });
          editor.ui.registry.addButton('menu', {
            icon: 'menu',
            onAction() {
              console.log('hi');
            },
          });
          editor.ui.registry.addButton('link', {
            icon: 'link',
            onAction() {
              console.log('hi');
            },
          });
          editor.ui.registry.addButton('code', {
            icon: 'code',
            onAction() {
              console.log('code');
            },
          });
          editor.ui.registry.addButton('blank', {
            icon: 'blank',
            onAction() {
              console.log('blank');
            },
          });
        },
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default Editor;
