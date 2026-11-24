import type {
  BusinessId,
  CapTableRow,
  LedgerEntry,
  Proposal,
  Stakeholder,
} from "@/backend";
import { ProposalStatus, VoteChoice } from "@/backend";
import { RequireSignIn, SignInButton } from "@/components/InternetIdentity";
import { BusinessCreditsPanel } from "@/components/credits/BusinessCreditsPanel";
import { BusinessBadge } from "@/components/shared/BusinessBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SimulatedBanner } from "@/components/shared/SimulatedBanner";
import { StatCard } from "@/components/shared/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useBusiness,
  useBusinessAdminStats,
  useCapTable,
  useCreateProposal,
  useLedger,
  useMyBusinesses,
  useProposals,
  useStakeholders,
  useVoteOnProposal,
} from "@/hooks/useQueries";
import { describeBackendError, errorMessage } from "@/lib/errors";
import {
  formatBps,
  formatCurrency,
  formatCurrencyCompact,
  formatDate,
  formatDateTime,
  formatNumber,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useParams } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  Coins,
  Crown,
  FileText,
  Gavel,
  Landmark,
  Lock,
  ShieldAlert,
  Target,
  Users,
  Wallet,
} from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";

const statusStyles: Record<ProposalStatus, string> = {
  [ProposalStatus.open]: "border-primary/40 bg-primary/10 text-primary",
  [ProposalStatus.passed]: "border-success/40 bg-success/10 text-success",
  [ProposalStatus.rejected]:
    "border-destructive/40 bg-destructive/10 text-destructive",
  [ProposalStatus.closed]: "border-border bg-muted/60 text-muted-foreground",
};

const statusLabels: Record<ProposalStatus, string> = {
  [ProposalStatus.open]: "Open",
  [ProposalStatus.passed]: "Passed",
  [ProposalStatus.rejected]: "Rejected",
  [ProposalStatus.closed]: "Closed",
};

function shortPrincipal(principal: { toText(): string }): string {
  const text = principal.toText();
  return text.length > 12 ? `${text.slice(0, 5)}…${text.slice(-4)}` : text;
}

export default function BusinessAdminPage() {
  const { businessId } = useParams({ from: "/admin/$businessId" });
  const id = useMemo<BusinessId | undefined>(() => {
    try {
      return BigInt(businessId);
    } catch {
      return undefined;
    }
  }, [businessId]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <SimulatedBanner className="mb-8" />
      <RequireSignIn
        fallback={
          <section
            aria-label="Sign in to manage this business"
            data-ocid="admin.signin_prompt"
            className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-border bg-card/60 px-6 py-16 text-center"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock aria-hidden="true" className="size-6" />
            </span>
            <div className="max-w-md space-y-2">
              <h1 className="font-display text-2xl font-semibold">
                Sign in to open the admin workspace
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The ledger, cap table and governance tools are private to the
                business owner. Sign in with Internet Identity to continue.
              </p>
            </div>
            <SignInButton className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60" />
          </section>
        }
      >
        <AdminWorkspace id={id} rawId={businessId} />
      </RequireSignIn>
    </div>
  );
}

function AdminWorkspace({
  id,
  rawId,
}: {
  id: BusinessId | undefined;
  rawId: string;
}) {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal();
  const businessQuery = useBusiness(id);
  const statsQuery = useBusinessAdminStats(id);
  const myBusinessesQuery = useMyBusinesses();

  if (id === undefined) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="That business link is not valid"
        description="The business id in this address could not be read. Open the workspace from your business list instead."
      />
    );
  }

  if (businessQuery.isLoading || myBusinessesQuery.isLoading) {
    return <LoadingSkeleton variant="stat" rows={4} />;
  }

  const business = businessQuery.data;
  if (!business) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Business not found"
        description={`No business matches the id ${rawId}. It may have been removed.`}
      />
    );
  }

  const stats = statsQuery.data;
  const isOwner =
    !!principal &&
    !principal.isAnonymous() &&
    (myBusinessesQuery.data ?? []).some((owned) => owned.id === id);

  if (!isOwner) {
    return (
      <section
        aria-label="Access denied"
        data-ocid="admin.access_denied"
        className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-destructive/30 bg-destructive/5 px-6 py-16 text-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <ShieldAlert aria-hidden="true" className="size-6" />
        </span>
        <div className="max-w-md space-y-2">
          <h1 className="font-display text-2xl font-semibold">
            You do not have access
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Only the owner of {business.name} can open this administration
            workspace. If you believe this is a mistake, sign in with the
            account that launched the business.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <Crown aria-hidden="true" className="size-3" />
              Owner workspace
            </span>
            <BusinessBadge isFictional={business.isFictional} />
          </div>
          <h1 className="truncate font-display text-3xl font-bold tracking-tight md:text-4xl">
            {business.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {business.industry} · {business.city}, {business.country} · Launched{" "}
            {formatDate(business.createdAt)}
          </p>
        </div>
      </header>

      <section aria-label="Business figures" className="space-y-4">
        {stats ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Funding goal"
                value={formatCurrencyCompact(stats.fundraisingTarget)}
                hint={`Cap ${formatCurrencyCompact(business.maxFundraisingTarget)}`}
                icon={Target}
                tone="gold"
              />
              <StatCard
                label="Capital raised"
                value={formatCurrencyCompact(stats.capitalRaised)}
                hint={`${formatBps(stats.fundraisingProgressBps)} of goal`}
                icon={Landmark}
                tone="cyan"
              />
              <StatCard
                label="Ownership pool left"
                value={formatNumber(stats.ownershipPoolRemaining)}
                hint={`${formatNumber(stats.ownershipAllocated)} of ${formatNumber(business.consumerOwnershipPool)} allocated`}
                icon={Coins}
                tone="violet"
              />
              <StatCard
                label="Round-up rate"
                value={formatBps(
                  business.participation.contributionOptions
                    .roundToNearestDollar
                    ? 100n
                    : 0n,
                )}
                hint="Consumer round-up default"
                icon={Wallet}
                tone="emerald"
              />
            </div>

            <div className="rounded-2xl border border-border bg-card/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Fundraising progress
                </p>
                <p className="font-numeric text-sm text-muted-foreground">
                  {formatCurrency(stats.capitalRaised)} /{" "}
                  {formatCurrency(stats.fundraisingTarget)}
                </p>
              </div>
              <Progress
                className="mt-3 h-2.5"
                value={Math.min(
                  100,
                  Number(stats.fundraisingProgressBps) / 100,
                )}
                aria-label="Fundraising progress"
              />
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <Figure
                  label="Purchase revenue"
                  value={formatCurrency(stats.totalSimulatedSales)}
                  tone="text-accent"
                />
                <Figure
                  label="Investment contributions"
                  value={formatCurrency(stats.totalContributions)}
                  tone="text-primary"
                />
                <Figure
                  label="Participating customers"
                  value={formatNumber(stats.participatingCustomers)}
                  tone="text-foreground"
                />
              </div>
            </div>
          </>
        ) : (
          <div
            data-ocid="admin.stats.unavailable"
            className="rounded-2xl border border-dashed border-border bg-card/40 px-5 py-6 text-sm text-muted-foreground"
          >
            Business figures are unavailable right now. Your Founding Credits
            recognition below is unaffected.
          </div>
        )}
      </section>

      <Tabs defaultValue="ledger" className="gap-6">
        <TabsList
          data-ocid="admin.tabs"
          className="h-auto w-full flex-wrap justify-start gap-1 bg-muted/60 p-1"
        >
          <TabsTrigger value="ledger" data-ocid="admin.tab.ledger">
            <FileText aria-hidden="true" className="size-4" />
            Ledger
          </TabsTrigger>
          <TabsTrigger value="cap-table" data-ocid="admin.tab.cap_table">
            <Coins aria-hidden="true" className="size-4" />
            Cap table
          </TabsTrigger>
          <TabsTrigger value="stakeholders" data-ocid="admin.tab.stakeholders">
            <Users aria-hidden="true" className="size-4" />
            Stakeholders
          </TabsTrigger>
          <TabsTrigger value="proposals" data-ocid="admin.tab.proposals">
            <Gavel aria-hidden="true" className="size-4" />
            Proposals
          </TabsTrigger>
          <TabsTrigger value="credits" data-ocid="admin.tab.credits">
            <Award aria-hidden="true" className="size-4" />
            Founding Credits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ledger">
          <LedgerPanel businessId={id} />
        </TabsContent>
        <TabsContent value="cap-table">
          <CapTablePanel businessId={id} />
        </TabsContent>
        <TabsContent value="stakeholders">
          <StakeholdersPanel businessId={id} />
        </TabsContent>
        <TabsContent value="proposals">
          <ProposalsPanel businessId={id} />
        </TabsContent>
        <TabsContent value="credits">
          <BusinessCreditsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Figure({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/40 px-3 py-2.5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className={cn("mt-1 font-numeric text-lg font-semibold", tone)}>
        {value}
      </p>
    </div>
  );
}

function PanelShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card/60 p-5 sm:p-6">
      <SectionHeading title={title} description={description} />
      <div className="mt-5">{children}</div>
    </section>
  );
}

function LedgerPanel({ businessId }: { businessId: BusinessId }) {
  const { data, isLoading } = useLedger(businessId);

  if (isLoading) return <LoadingSkeleton variant="list" rows={4} />;
  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No ownership changes yet"
        description="Every round-up that converts into ownership units will appear here as an immutable ledger entry."
      />
    );
  }

  return (
    <PanelShell
      title="Ownership ledger"
      description="An append-only record of every ownership change, newest first."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <th className="py-2 pr-4 font-semibold">Date</th>
              <th className="py-2 pr-4 font-semibold">Stakeholder</th>
              <th className="py-2 pr-4 font-semibold">Reason</th>
              <th className="py-2 pr-4 text-right font-semibold">Units</th>
              <th className="py-2 text-right font-semibold">Contribution</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry: LedgerEntry, index) => {
              const positive = entry.unitsDelta >= 0n;
              return (
                <tr
                  key={entry.id.toString()}
                  data-ocid={`admin.ledger.row.${index + 1}`}
                  className="border-b border-border/60 last:border-0"
                >
                  <td className="py-3 pr-4 text-muted-foreground">
                    {formatDateTime(entry.createdAt)}
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs">
                    {shortPrincipal(entry.principal)}
                  </td>
                  <td className="py-3 pr-4">{entry.reason}</td>
                  <td
                    className={cn(
                      "py-3 pr-4 text-right font-numeric font-semibold",
                      positive ? "text-primary" : "text-destructive",
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {positive ? (
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      ) : (
                        <ArrowDownRight
                          aria-hidden="true"
                          className="size-3.5"
                        />
                      )}
                      {positive ? "+" : ""}
                      {formatNumber(entry.unitsDelta)}
                    </span>
                  </td>
                  <td className="py-3 text-right font-numeric text-accent">
                    {formatCurrency(entry.contributionAmount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </PanelShell>
  );
}

function CapTablePanel({ businessId }: { businessId: BusinessId }) {
  const { data, isLoading } = useCapTable(businessId);

  if (isLoading) return <LoadingSkeleton variant="list" rows={4} />;
  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={Coins}
        title="The cap table is empty"
        description="As customers round up and earn ownership units, their positions will be listed here with hypothetical percentages."
      />
    );
  }

  return (
    <PanelShell
      title="Cap table"
      description="Each stakeholder's ownership units and hypothetical percentage of the total supply."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <th className="py-2 pr-4 font-semibold">Stakeholder</th>
              <th className="py-2 pr-4 text-right font-semibold">Units</th>
              <th className="py-2 pr-4 text-right font-semibold">
                Hypothetical %
              </th>
              <th className="py-2 text-right font-semibold">Contributions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: CapTableRow, index) => (
              <tr
                key={row.principal.toText()}
                data-ocid={`admin.cap_table.row.${index + 1}`}
                className="border-b border-border/60 last:border-0"
              >
                <td className="py-3 pr-4">
                  <span className="font-medium">{row.displayName}</span>
                  <span className="ml-2 font-mono text-xs text-muted-foreground">
                    {shortPrincipal(row.principal)}
                  </span>
                </td>
                <td className="py-3 pr-4 text-right font-numeric">
                  {formatNumber(row.ownershipUnits)}
                </td>
                <td className="py-3 pr-4 text-right font-numeric font-semibold text-chart-3">
                  {formatBps(row.percentageBps)}
                </td>
                <td className="py-3 text-right font-numeric text-accent">
                  {formatCurrency(row.cumulativeContributions)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelShell>
  );
}

function StakeholdersPanel({ businessId }: { businessId: BusinessId }) {
  const { data, isLoading } = useStakeholders(businessId);

  if (isLoading) return <LoadingSkeleton variant="list" rows={4} />;
  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No stakeholders yet"
        description="Customers who earn ownership units through round-ups will be listed here."
      />
    );
  }

  return (
    <PanelShell
      title="Stakeholders"
      description="Everyone who holds ownership units in this business."
    >
      <ul className="space-y-3">
        {data.map((person: Stakeholder, index) => (
          <li
            key={person.id.toString()}
            data-ocid={`admin.stakeholder.item.${index + 1}`}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/40 px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{person.displayName}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {shortPrincipal(person.principal)} · joined{" "}
                {formatDate(person.joinedAt)}
              </p>
            </div>
            <div className="flex items-center gap-5 text-right">
              <div>
                <p className="font-numeric text-sm font-semibold">
                  {formatNumber(person.ownershipUnits)}
                </p>
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  Units
                </p>
              </div>
              <div>
                <p className="font-numeric text-sm font-semibold text-accent">
                  {formatCurrency(person.cumulativeContributions)}
                </p>
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  Contributed
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </PanelShell>
  );
}

function ProposalsPanel({ businessId }: { businessId: BusinessId }) {
  const { data, isLoading } = useProposals(businessId);
  const createProposal = useCreateProposal();
  const vote = useVoteOnProposal();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [closesAt, setClosesAt] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const canSubmit =
    title.trim().length > 0 && body.trim().length > 0 && closesAt.length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    const closing = new Date(closesAt);
    if (Number.isNaN(closing.getTime())) {
      setFormError("Choose a valid closing date and time.");
      return;
    }
    setFormError(null);
    const capturedTitle = title;
    const capturedBody = body;
    const capturedCloses = closesAt;
    setTitle("");
    setBody("");
    setClosesAt("");
    createProposal.mutate(
      {
        businessId,
        title: capturedTitle.trim(),
        body: capturedBody.trim(),
        closesAt: BigInt(closing.getTime()) * 1_000_000n,
      },
      {
        onError: (error) => {
          setFormError(
            typeof error === "object" && error !== null && "__kind__" in error
              ? describeBackendError(error as { __kind__: string })
              : errorMessage(error),
          );
          setTitle((current) => (current === "" ? capturedTitle : current));
          setBody((current) => (current === "" ? capturedBody : current));
          setClosesAt((current) => (current === "" ? capturedCloses : current));
        },
      },
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <PanelShell
        title="Proposals"
        description="Open governance questions for this business. Vote on any proposal that is still open."
      >
        {isLoading ? (
          <LoadingSkeleton variant="list" rows={3} />
        ) : !data || data.length === 0 ? (
          <EmptyState
            icon={Gavel}
            title="No proposals yet"
            description="Create the first proposal to put a decision to your stakeholders."
          />
        ) : (
          <ul className="space-y-4">
            {data.map((proposal: Proposal, index) => (
              <ProposalCard
                key={proposal.id.toString()}
                proposal={proposal}
                index={index}
                onVote={(choice) =>
                  vote.mutate({ proposalId: proposal.id, choice })
                }
                voting={vote.isPending}
              />
            ))}
          </ul>
        )}
      </PanelShell>

      <section className="h-fit rounded-2xl border border-border bg-card/60 p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold">New proposal</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Give stakeholders a clear question and a closing time.
        </p>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label htmlFor="proposal-title">Title</Label>
            <Input
              id="proposal-title"
              data-ocid="admin.proposal.title_input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Approve the Q3 round-up rate"
              maxLength={120}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="proposal-body">Details</Label>
            <Textarea
              id="proposal-body"
              data-ocid="admin.proposal.body_input"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="Explain the decision and what a yes vote means."
              rows={4}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="proposal-closes">Closes at</Label>
            <Input
              id="proposal-closes"
              data-ocid="admin.proposal.closes_input"
              type="datetime-local"
              value={closesAt}
              onChange={(event) => setClosesAt(event.target.value)}
            />
          </div>
          {formError && (
            <p
              role="alert"
              data-ocid="admin.proposal.error_state"
              className="text-sm text-destructive"
            >
              {formError}
            </p>
          )}
          <Button
            type="submit"
            data-ocid="admin.proposal.submit_button"
            disabled={!canSubmit || createProposal.isPending}
            className="w-full rounded-full"
          >
            {createProposal.isPending ? "Creating…" : "Create proposal"}
          </Button>
        </form>
      </section>
    </div>
  );
}

function ProposalCard({
  proposal,
  index,
  onVote,
  voting,
}: {
  proposal: Proposal;
  index: number;
  onVote: (choice: VoteChoice) => void;
  voting: boolean;
}) {
  const totalVotes =
    proposal.yesVotes + proposal.noVotes + proposal.abstainVotes;
  const isOpen = proposal.status === ProposalStatus.open;

  return (
    <li
      data-ocid={`admin.proposal.item.${index + 1}`}
      className="rounded-xl border border-border/70 bg-background/40 p-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h4 className="font-display text-base font-semibold">
          {proposal.title}
        </h4>
        <Badge
          variant="outline"
          className={cn("border", statusStyles[proposal.status])}
        >
          {statusLabels[proposal.status]}
        </Badge>
      </div>
      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
        {proposal.body}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Closes {formatDateTime(proposal.closesAt)} · {formatNumber(totalVotes)}{" "}
        votes
      </p>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <VoteTally label="Yes" value={proposal.yesVotes} tone="text-primary" />
        <VoteTally
          label="No"
          value={proposal.noVotes}
          tone="text-destructive"
        />
        <VoteTally
          label="Abstain"
          value={proposal.abstainVotes}
          tone="text-muted-foreground"
        />
      </div>

      {isOpen && (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            data-ocid={`admin.proposal.vote_yes.${index + 1}`}
            disabled={voting}
            onClick={() => onVote(VoteChoice.yes)}
            className="rounded-full"
          >
            Vote yes
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            data-ocid={`admin.proposal.vote_no.${index + 1}`}
            disabled={voting}
            onClick={() => onVote(VoteChoice.no)}
            className="rounded-full"
          >
            Vote no
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            data-ocid={`admin.proposal.vote_abstain.${index + 1}`}
            disabled={voting}
            onClick={() => onVote(VoteChoice.abstain)}
            className="rounded-full"
          >
            Abstain
          </Button>
        </div>
      )}
    </li>
  );
}

function VoteTally({
  label,
  value,
  tone,
}: {
  label: string;
  value: bigint;
  tone: string;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/50 px-2 py-1.5">
      <p className={cn("font-numeric text-sm font-semibold", tone)}>
        {formatNumber(value)}
      </p>
      <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
