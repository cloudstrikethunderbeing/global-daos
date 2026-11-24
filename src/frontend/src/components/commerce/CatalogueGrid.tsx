import type { CatalogueItem } from "@/backend";
import { ItemKind } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Check, Package, Plus, Wrench } from "lucide-react";

function kindMeta(kind: ItemKind) {
  return kind === ItemKind.service
    ? { label: "Service", icon: Wrench }
    : { label: "Product", icon: Package };
}

/**
 * Digital catalogue for a simulated storefront. Each card shows the item's
 * name, description, price and kind, plus a control to add it to the cart.
 */
export function CatalogueGrid({
  items,
  quantities,
  onAdd,
  highlightItemId,
}: {
  items: CatalogueItem[];
  quantities: Record<string, number>;
  onAdd: (item: CatalogueItem) => void;
  highlightItemId?: string;
}) {
  return (
    <ul
      data-ocid="catalogue.list"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {items.map((item, index) => {
        const key = item.id.toString();
        const qty = quantities[key] ?? 0;
        const meta = kindMeta(item.kind);
        const KindIcon = meta.icon;
        const highlighted = highlightItemId === key;
        return (
          <li
            key={key}
            data-ocid={`catalogue.item.${index + 1}`}
            className={cn(
              "group flex flex-col rounded-2xl border bg-card/70 p-5 transition-smooth ease-cinematic hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated",
              qty > 0 ? "border-primary/50" : "border-border",
              highlighted && "ring-2 ring-accent/60",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <KindIcon aria-hidden="true" className="size-5" />
              </span>
              <Badge variant="secondary" className="shrink-0">
                {meta.label}
              </Badge>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug">
              {item.name}
            </h3>
            <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
              <span className="font-numeric text-lg font-semibold text-primary">
                {formatCurrency(item.price)}
              </span>
              <Button
                type="button"
                size="sm"
                variant={qty > 0 ? "secondary" : "default"}
                className="rounded-full"
                data-ocid={`catalogue.add_button.${index + 1}`}
                onClick={() => onAdd(item)}
              >
                {qty > 0 ? (
                  <>
                    <Check aria-hidden="true" className="size-4" />
                    In cart · {qty}
                  </>
                ) : (
                  <>
                    <Plus aria-hidden="true" className="size-4" />
                    Add to cart
                  </>
                )}
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
