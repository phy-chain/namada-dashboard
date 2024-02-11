'use client'

import {useApi, ValidatorsApiResult} from "@/services/api";
import {useEffect, useState} from "react";

type Validators = ValidatorsApiResult
export default function Validators() {
  const {validators} = useApi()
  const [data, setData] = useState<Validators['validators']>()
  const [error, setError] = useState<Error| unknown>()

  useEffect(() => {
    (async () => {
      try {
        const d = await validators(8671, 1, 50)
        setData(d.validators)
        setError(null)
      } catch (error) {
        console.error(error);
        setError(error)
      }
    })();
  }, []);

  return (
    <main className="relative w-full flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Validators</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
          </thead>
          <tbody>
          {data?.map(validator =>
            <tr
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            key={validator.address}
            >
            <th scope="row" className="flex flex-col px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <span>{validator.address}</span>
              <span>{validator.pub_key.value}</span>
            </th>
            <td className="px-6 py-4">
              {validator.voting_power}
            </td>
            <td className="px-6 py-4">

            </td>
            <td className="px-6 py-4">

            </td>
            <td className="px-6 py-4">
              Details
            </td>
          </tr>)}
          </tbody>
        </table>
      </div>

    </main>
  );
}
