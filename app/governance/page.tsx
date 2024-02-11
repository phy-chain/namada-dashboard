'use client'

import {ProposalsApi, useApi, Cache, ProposalItem} from "@/services/api";
import {useEffect, useState} from "react";
import {Proposal} from "@/app/governance/Proposal";
import {Loader} from "@/app/components/Spinner";

enum VotingSections {
  "Now",
  "Coming",
  "Execution",
  "Previous",
  "Other",
};

const getStatus = (proposal: ProposalItem, currentEpoch: number): VotingSections => {
  const startEpoch = parseInt(proposal["Start Epoch"]);
  const endEpoch = parseInt(proposal["End Epoch"]);
  const graceEpoch = parseInt(proposal["Grace Epoch"]);

  if (startEpoch <= currentEpoch && endEpoch >= currentEpoch) {
    return VotingSections.Now;
  } else if (endEpoch <= currentEpoch && graceEpoch >= currentEpoch) {
    return VotingSections.Execution;
  } else if (endEpoch < currentEpoch) {
    return VotingSections.Previous;
  } else if (startEpoch > currentEpoch) {
    return VotingSections.Coming;
  } else {
    return VotingSections.Other;
  }
};

export default function Propsals() {
  const {proposals, voteProposal} = useApi()
  const [data, setData] = useState<{ [key: string]: ProposalsApi }>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | unknown>()

  useEffect(() => {
    // TODO(hadrien): Faire un data wrapper, pour gérer le loading / error / innerData.
    (async () => {
      try {
        setLoading(true);
        const d = await proposals();
        const epoch = Cache['Last committed epoch']
        const sections = d.reduce((acc, pro) => {
          if(pro["Proposal Id"] === "197") {
            pro.special =true
          }
          acc[getStatus(pro, epoch)].push(pro);
          return acc;
        }, {
          [VotingSections.Now]: [] as ProposalsApi,
          [VotingSections.Coming]: [] as ProposalsApi,
          [VotingSections.Execution]: [] as ProposalsApi,
          [VotingSections.Previous]: [] as ProposalsApi,
          [VotingSections.Other]: [] as ProposalsApi,
        })
        setData(sections)
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error)
      }
      setLoading(false)
    })();
  }, []);

  const currentEpoch = Cache['Last committed epoch'];

  const specialVotes = data?.[VotingSections.Now]?.filter(it => it.special);

  return (
    <main className="relative w-full flex min-h-screen flex-col p-24">
      <h2 className="text-4xl font-bold mb-4">Propsals - Current epoch : {currentEpoch}</h2>
      <div className="flex flex-col w-full pb-10">
        {loading && <Loader className="self-center" size="w-20 h-20"/>}
        {!loading && !!Object.keys(data).length && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl">Voting Now</h3>
              {specialVotes && <div className="text-2xl">Protocol votes</div>}
              {specialVotes.map((proposal, index) => (
                <Proposal key={index} proposal={proposal} currentEpoch={currentEpoch}/>
              ))}
              {specialVotes && <hr/>}
              {specialVotes && <div className="text-2xl">Casual votes</div>}
              {data[VotingSections.Now].filter(it => !it.special).map((proposal, index) => (
                <Proposal key={index} proposal={proposal} currentEpoch={currentEpoch}/>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl">Incoming proposals</h3>
              {data[VotingSections.Coming].map((proposal, index) => (
                <Proposal key={index} proposal={proposal} currentEpoch={currentEpoch} cantVote/>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl">Grace Period (Execution)</h3>
              {data[VotingSections.Execution].map((proposal, index) => (
                <Proposal key={index} proposal={proposal} currentEpoch={currentEpoch} cantVote/>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl">Previous</h3>
              {data[VotingSections.Previous].map((proposal, index) => (
                <Proposal key={index} proposal={proposal} currentEpoch={currentEpoch} cantVote/>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl">Others</h3>
              {data[VotingSections.Other].map((proposal, index) => (
                <Proposal key={index} proposal={proposal} currentEpoch={currentEpoch} cantVote/>
              ))}
            </div>
          </div>
        )}
      </div>

    </main>
  );
}
