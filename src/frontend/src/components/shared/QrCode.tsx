import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useCallback, useRef } from "react";

/**
 * Renders a scannable QR code for a share URL with a download action. Used for
 * shareable business profiles, portfolios and customer onboarding links.
 */
export function QrCode({
  value,
  fileName = "global-daos-qr",
  size = 168,
  caption,
  className,
}: {
  value: string;
  fileName?: string;
  size?: number;
  caption?: string;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(() => {
    const canvas = wrapperRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${fileName}.png`;
    link.click();
  }, [fileName]);

  return (
    <div
      data-ocid="qr.panel"
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/70 p-4 text-center",
        className,
      )}
    >
      <div ref={wrapperRef} className="rounded-xl bg-white p-3 shadow-elevated">
        <QRCodeCanvas
          value={value}
          size={size}
          level="M"
          marginSize={1}
          bgColor="#ffffff"
          fgColor="#0b1f18"
          aria-label="QR code linking to this share page"
        />
      </div>
      {caption && (
        <p className="max-w-[15rem] text-xs leading-relaxed text-muted-foreground">
          {caption}
        </p>
      )}
      <Button
        type="button"
        variant="outline"
        size="sm"
        data-ocid="qr.download_button"
        onClick={handleDownload}
        className="rounded-full"
      >
        <Download aria-hidden="true" className="size-4" />
        Download QR
      </Button>
    </div>
  );
}
