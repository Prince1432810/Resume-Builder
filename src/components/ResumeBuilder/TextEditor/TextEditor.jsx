import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import { useEffect } from 'react';

const TextEditor = ({ value, onChange, placeholder }) => {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // disable anything that conflicts
      }),
      Underline,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()));
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[150px] p-3 text-sm w-full overflow-hidden [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_h4]:text-base [&_h4]:font-bold [&_p]:m-0',
      },
    },
  });

  if (!editor) return null;

  useEffect(() => {
    if (editor) {
      try {
        const parsed = JSON.parse(value);
        const current = editor.getJSON();
        if (JSON.stringify(parsed) !== JSON.stringify(current)) {
          editor.commands.setContent(parsed);
        }
      } catch {
        if (value === '' || value === null || value === undefined) {
          editor.commands.setContent('');
        }
      }
    }
  }, [value, editor]);

  return (
    <div className='mt-5 border border-gray-200 rounded-xl overflow-hidden'>

      {/* Toolbar */}
      <div className='border-b border-gray-200 bg-gray-100 h-10 flex items-center gap-1 px-3'>

        {/* Heading 4 */}
        {/* <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`text-xs px-2 py-1 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 4 }) ? 'bg-gray-200 font-bold' : ''}`}
        >H4</button> */}

        {/* <div className='w-px h-5 bg-gray-300 mx-1'/> */}

        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        ><FormatBoldIcon fontSize='small'/></button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run() }
          className={`py-1 px-1.5 rounded-lg hover:bg-gray-200 cursor-pointer ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        ><FormatItalicIcon fontSize='small'/></button>

        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
        ><FormatUnderlinedIcon fontSize='small'/></button>

        <div className='w-px h-5 bg-gray-300 mx-1'/>

        {/* Ordered List */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
        ><FormatListNumberedIcon fontSize='small'/></button>

        {/* Bullet List */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        ><FormatListBulletedIcon fontSize='small'/></button>

        <div className='w-px h-5 bg-gray-300 mx-1'/>

        {/* Clear Formatting */}
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className='p-1 rounded hover:bg-gray-100'
        ><FormatClearIcon fontSize='small'/></button>

      </div>

      {/* Editor Area */}
      <div className='relative max-h-60 overflow-auto bg-[#ffffff]'>
        {(!value || value === '' || value === JSON.stringify({ type: 'doc', content: [{ type: 'paragraph' }] })) && (
          <p className='absolute top-3 left-3 text-gray-400 italic text-sm pointer-events-none'>
            {placeholder || 'Description...'}
          </p>
        )}
        <EditorContent editor={editor} />
      </div>

    </div>
  )
}

export default TextEditor