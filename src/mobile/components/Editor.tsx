import { SetStateAction } from 'react';
import { Editor as TinyMceEditor } from '@tinymce/tinymce-react';
import { observer } from 'mobx-react';
import { useNoteStore } from '@wapl/note-core';
import { editorContentCSS } from '@mstyles/EditorStyle';
import { waplIcons } from '../assets/icons';
import '@mstyles/editor.css';

interface IProps {
  setUploadDrawer?: React.Dispatch<SetStateAction<boolean>>;
}

const Editor: React.FC<IProps> = observer(({ setUploadDrawer }) => {
  const { pageStore, editorStore } = useNoteStore();
  const tempUserId = 'caf1a998-c39e-49d4-81c7-719f6cc624d9';

  const handleEditorChange = editorContent => {
    pageStore.pageInfo.content = editorContent;
  };

  const handleEditorFocus = async () => {
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
            plugins:
              'print preview paste importcss autolink directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars',
            toolbar:
              'undo redo link uploadImage uploadFile formatselect fontselect fontsizeselect bold italic underline strikethrough forecolor backcolor align-group bullist outdent indent',
            toolbar_location: 'bottom',
            toolbar_mode: 'scrolling',
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

          editor.ui.registry.addMenuButton('align-group', {
            icon: 'align-center',
            fetch: cb => {
              const items: any[] = [
                {
                  type: 'menuitem',
                  icon: 'align-left',
                  onAction: () => editor.execCommand('JustifyLeft'),
                },
                { type: 'menuitem', icon: 'align-center', onAction: () => editor.execCommand('JustifyCenter') },
                { type: 'menuitem', icon: 'align-right', onAction: () => editor.execCommand('JustifyRight') },
                { type: 'menuitem', icon: 'align-justify', onAction: () => editor.execCommand('JustifyFull') },
              ];
              cb(items);
            },
          });

          editor.ui.registry.addButton('uploadImage', {
            icon: 'image',
            onAction() {
              // TODO: 기기에서 이미지 첨부, 드라이브에서 이미지 첨부
            },
          });

          editor.ui.registry.addButton('uploadFile', {
            icon: 'attach',
            onAction() {
              setUploadDrawer(true);
            },
          });

          editor.on('touchend', e => {
            if (!pageStore.pageInfo.editingUserId || pageStore.pageInfo.editingUserId === tempUserId) return;
            e.preventDefault(); // Remove caret
          });
          editor.on('focus', e => {
            if (!pageStore.pageInfo.editingUserId) return;
            e.stopImmediatePropagation();
          });
        },
      }}
      onEditorChange={handleEditorChange}
      onFocus={handleEditorFocus}
    />
  );
});

export default Editor;
