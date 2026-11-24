import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Copy-to-clipboard control for share links. Shows a transient confirmation and
 * falls back to a selectable input when the clipboard API is unavailable.
 */
export function ShareControl({
  url,
  label = "Copy share link",
  className,
}: {
  url: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleCopy = useCallback(async () => {
    setFailed(false);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setFailed(true);
    }
  }, [url]);

  return (
    <div data-ocid="share.control" className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={url}
          aria-label="Share link"
          data-ocid="share.input"
          onFocus={(event) => event.currentTarget.select()}
          className="min-w-0 flex-1 truncate rounded-full border border-input bg-background px-3.5 py-2 font-mono text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-ocid="share.copy_button"
          onClick={() => void handleCopy()}
          className="shrink-0 rounded-full"
        >
          {copied ? (
            <Check aria-hidden="true" className="size-4 text-primary" />
          ) : (
            <Copy aria-hidden="true" className="size-4" />
          )}
          {copied ? "Copied" : label}
        </Button>
      </div>
      <output
        aria-live="polite"
        data-ocid={failed ? "share.error_state" : "share.status"}
        className={cn(
          "block text-xs",
          failed ? "text-destructive" : "text-muted-foreground",
        )}
      >
        {failed
          ? "Copy failed — select the link above and copy it manually."
          : copied
            ? "Link copied to clipboard."
            : "Anyone with this link can view the shared page."}
      </output>
    </div>
  );
}
