import { Editor as TinyMceEditor } from '@tinymce/tinymce-react';
import { observer } from 'mobx-react';
import { useNoteStore } from '@wapl/note-core';
import { editorContentCSS } from '@mstyles/EditorStyle';
import { waplIcons } from '../assets/icons';

const Editor = observer(() => {
  const { pageStore, editorStore } = useNoteStore();

  const handleEditorChange = editorContent => {
    pageStore.pageInfo.content = editorContent;
  };

  const handleEditorFocus = async () => {
    if (pageStore.pageInfo.editingUserId) return;
    const { editingUserId } = await pageStore.editPage(
      '79b3f1b3-85dc-4965-a8a2-0c4c56244b82',
      pageStore.pageInfo.chapterId,
      pageStore.pageInfo,
    );
    pageStore.pageInfo.editingUserId = editingUserId;
  };

  return (
    <TinyMceEditor
      apiKey="90655irb9nds5o8ycj2bpivk0v2y34e2oa6qta82nclxrnx3"
      value={pageStore.pageInfo.content ?? '<p><br></p>'}
      onInit={() => {
        editorStore.setMarker(editorStore.tinymce?.getBody());
      }}
      init={{
        ...{
          height: '100%',
          mobile: {
            plugins: 'table codesample insertdatetime hr link',
            toolbar: 'undo redo blank blank extra image attach font align-group link',
            toolbar_location: 'bottom',
            toolbar_mode: 'floating',
            toolbar_sticky: true,
            statusbar: false,
            menubar: false,
          },
          content_style: editorContentCSS,
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
      onFocus={handleEditorFocus}
    />
  );
});

export default Editor;
