import {ProposalsApi} from "@/services/api";
import {useState} from "react";

type Props = { proposal: ProposalsApi[0]; currentEpoch: number; cantVote?: boolean };
export const Proposal = ({proposal, currentEpoch, cantVote}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const truncateTitle = (title: string) => {
    if (title.length > 100) {
      return title.substring(0, 100) + '...';
    }
    return title;
  };

  return (
    <div
      className="flex flex-col bg-white border border-namada-secondary rounded-2xl shadow-inner pointer"
      onClick={toggleExpand}>
      <div className="flex">
        <div
          className="flex flex-col items-center justify-center shrink-0 w-24 truncate border-r border-namada-secondary p-4">
          <span className="" title={proposal.Type}>{proposal.Type.substring(0, 3)}</span>
          <span className="">{proposal.id}</span>
        </div>
        <div className="flex flex-col gap-2 p-4 grow">
          <div className="flex items-center justify-between gap-2">
            <h3 className="mb-2 text-3xl font-bold tracking-tight">
              {truncateTitle(proposal.Content.title)}
            </h3>
            <h4>
              <div>{proposal.Author}</div>
              <div>{proposal.Content.authors}</div>
            </h4>
          </div>
          <div className="flex justify-between items-center">
            <div>{truncateTitle(proposal.Content.abstract)}</div>
            {!cantVote && <div className="relative flex gap-2 cursor-not-allowed opacity-50" title="Coming soon">
              <div className="absolute inset-0 bg-namada-primary opacity-30 rounded-lg" />
              <button className="py-2.5 px-5 text-sm rounded-lg border border-namada-secondary">
                Yay
              </button>
              <button className="py-2.5 px-5 text-sm rounded-lg border border-namada-secondary">
                Abstain
              </button>
              <button className="py-2.5 px-5 text-sm rounded-lg border border-namada-secondary">
                Nay
              </button>
            </div>}
          </div>
        </div>
        <div className="flex items-center justify-center p-4 border-l border-namada-secondary">
          {proposal["Start Epoch"]} - {proposal["End Epoch"]}
        </div>
      </div>
      {expanded && (
        <div className="flex flex-col p-4 border-t border-namada-secondary">
          <div>{proposal.Content.abstract}</div>
          <div>{proposal.Content.details}</div>
          <pre className="mt-2 p-2 whitespace-pre">{JSON.stringify(proposal.Data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
};
