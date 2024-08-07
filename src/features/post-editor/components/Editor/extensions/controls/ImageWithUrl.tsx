"use client"
import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap"
import { IconPhoto, IconPictureInPicture } from "@tabler/icons-react"
import { useCallback } from "react"

export function InsertImageWithUrlControl() {
  const { editor } = useRichTextEditorContext();
	const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      // @ts-ignore
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  return (
    <RichTextEditor.Control
      onClick={addImage}
      aria-label="Insert image with url"
      title="Image by url"
    >
      <IconPhoto stroke={1.5} size="1rem" />
    </RichTextEditor.Control>
  );
}