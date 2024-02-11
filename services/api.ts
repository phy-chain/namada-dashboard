import {useMemo} from "react";

const API_ROOT = "https://rpc.namada.validatorade.org"

export type Validator = {
  "address": string,
  "pub_key": {
    "type": string,
    "value": string
  },
  "voting_power": string,
  "proposer_priority": string
}
export type ValidatorsApiResult = {
  block_height: string;
  count: string;
  total: string;
  validators: Validator[]
}
export type ProposalItem = {
  "Last committed epoch": string;
  "id": number;
  "Proposal Id": string;
  "Type": string;
  "Author": string;
  "Content": {
    "abstract": string;
    "authors": string;
    "created": string;
    "details": string;
    "discussions-to": string;
    "license": string;
    "motivation": string;
    "requires": string;
    "title": string;
  },
  "Start Epoch": string;
  "End Epoch": string;
  "Grace Epoch": string;
  "Status": string;
  Data: object
  special?: boolean
}
export type ProposalsApi = ProposalItem[]

export const Cache = {
  "Last committed epoch": 0
};

export function useApi() {
  return useMemo(() => ({
    abci_info: async () => {
      return await fetch(`${API_ROOT}/abci_info?`).then((res) => res.json())
        .then((data) => data);
    },
    consensus_params: async (height: number) => {
      return await fetch(`${API_ROOT}/consensus_params?height=${height}`)
        .then((res) => res.json())
        .then((data) => data);
    },
    check_tx: async (tx: string) => {
      return await fetch(`${API_ROOT}/check_tx?tx=${tx}`)
        .then((res) => res.json())
        .then((data) => data);
    },
    validators: async (height: number, page: number, per_page: number): Promise<ValidatorsApiResult> => {
      return await fetch(`${API_ROOT}/validators?height=${height}&page=${page}&per_page=${per_page}`)
        .then((res) => res.json())
        .then((data) => data?.result as ValidatorsApiResult);
    },
    blocks: async (query = '', page: number, per_page: number, order_by = '') => {
      return await fetch(`${API_ROOT}/block_search?query=${query}&page=${page}&per_page=${per_page}&order_by=${order_by}`)
        .then((res) => res.json())
        .then((data) => data);
    },
    transactions: async (query = '', prove = '', page: number, per_page: number, order_by = '') => {
      return await fetch(`${API_ROOT}/tx_search?query=${query}&prove=${prove}&page=${page}&per_page=${per_page}&order_by=${order_by}`)
        .then((res) => res.json())
        .then((data) => data);
    },
    status: async () => {
      return await fetch(`${API_ROOT}/status?`).then((res) => res.json())
        .then((data) => data);
    },
    proposals: async (): Promise<ProposalsApi> => {
      // return await fetch(`/namada-api/proposals`).then((res) => res.json())
      return await fetch(`https://namada.lankou.org/all_proposals.json`).then((res) => res.json())
        .then((data) => {
          const proposals = Object.values<ProposalItem>(data).filter(it => parseInt(it['Proposal Id']) >= 0)
            .map(it => ({...it, id: parseInt(it["Proposal Id"])}))
            .sort((a, b) => {
            return a.id > b.id ? -1 : a.id < b.id ? 1 : 0;
          });
          // console.log(proposals[0]);
          Cache['Last committed epoch'] = parseInt(proposals[0]['Last committed epoch']);
          return proposals;
        });
    },
    voteProposal: async (id: string): Promise<ProposalsApi> => {
      return await fetch(`/namada-api/proposals/vote`, {
        method: "POST", headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => res.json())
        .then((data) => data);
    }
  }), []);
}
