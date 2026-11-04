import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** Renders Markdown at build time with the site's prose styling (no client JS). */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-ink">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const external = href?.startsWith('http');
            return (
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
