import { Editor as TinyMceEditor } from '@tinymce/tinymce-react';
import { useNoteStore } from '@wapl/note-core';
import { waplIcons } from '../assets/icons';

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
            plugins: 'table codesample insertdatetime hr link',
            toolbar: 'undo redo blank blank blank extra image attach font align-group link',
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
          Object.keys(waplIcons).forEach(key => {
            editor.ui.registry.addIcon(key, waplIcons[key]);
          });
          editor.ui.registry.addGroupToolbarButton('extra', {
            icon: 'extra',
            items: 'hr table codesample insertdatetime',
          });
          editor.ui.registry.addGroupToolbarButton('align-group', {
            icon: 'align-justify',
            items: 'alignleft aligncenter alignright alignjustify',
          });
          editor.ui.registry.addGroupToolbarButton('font', {
            icon: 'font',
            items: 'formatselect fontselect fontsizeselect bold italic underline strikethrough forecolor backcolor',
          });
          editor.ui.registry.addButton('image', {
            icon: 'image',
            onAction() {
              // TODO: 기기에서 이미지 첨부, 드라이브에서 이미지 첨부
              console.log('insert image');
            },
          });
          editor.ui.registry.addButton('attach', {
            icon: 'attach',
            onAction() {
              // TODO: 기기에서 첨부, 드라이브에서 첨부
              console.log('attch files');
            },
          });
          editor.ui.registry.addButton('blank', {
            icon: 'blank',
            onAction() {
              console.log('do nothing');
            },
          });
        },
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default Editor;