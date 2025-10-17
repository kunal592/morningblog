"use client"

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Textarea } from '@/components/ui/textarea';

interface MdEditorProps {
    content: string;
    setContent: (content: string) => void;
}

export function MdEditor({ content, setContent }: MdEditorProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="p-2 text-sm font-medium text-center bg-muted rounded-t-lg border-b">
            Markdown
        </div>
        <Textarea
          placeholder="Start writing your masterpiece..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-full flex-1 resize-none rounded-t-none border-t-0 focus-visible:ring-0"
        />
      </div>
      <div className="flex flex-col">
         <div className="p-2 text-sm font-medium text-center bg-muted rounded-t-lg border-b">
            Preview
        </div>
        <div className="prose dark:prose-invert max-w-none flex-1 overflow-auto rounded-b-lg border bg-background p-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || "Preview will appear here..."}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}
