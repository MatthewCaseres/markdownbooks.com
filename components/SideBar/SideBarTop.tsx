import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SideBarFilters from './SideBarFilters'
import Link from "next/link";
import FilterDropdown from './FilterDropdown'

export default function SideBarTop({
  setVisible,
  ghUrl,
}: {
  setVisible: Dispatch<SetStateAction<boolean>>;
  ghUrl: string;
}) {
  return (
    <div>
      <div className="flex flex-shrink-0 flex-row py-1 z-10 bg-white dark:bg-black sticky top-0">
        <div
          onClick={() => setVisible((mdVisible) => !mdVisible)}
          className="cursor-pointer"
        >
          <Close />
        </div>
        <a target="_blank" rel="noopener noreferrer" href={ghUrl}>
          <img src="/github.png" className="h-6 w-6 mx-2"></img>
        </a>
      </div>
    </div>
  );
}

function Home() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-6 h-6 text-gray-800 dark:text-gray-400 mx-2"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}
function Edit() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-6 h-6 text-gray-800 dark:text-gray-400 mx-2"
      stroke="currentColor"
    >
      <path
        d="M255.509 2.523C114.124 2.795-.271 117.629 0 259.014c.229 119.575 83.206 223.063 199.871 249.28 5.752 1.272 11.446-2.359 12.719-8.111.167-.755.252-1.526.252-2.3v-58.027c0-5.891-4.776-10.667-10.667-10.667h-21.333c-26.624 0-44.8-25.237-60.736-47.509l-4.907-6.784a161.81 161.81 0 0120.523 13.611 72.381 72.381 0 0043.797 19.2c16.081 2.238 30.931-8.983 33.169-25.064.313-2.249.364-4.526.153-6.787v-7.445a10.667 10.667 0 00-7.744-10.261c-59.179-16.747-98.923-61.077-98.923-110.293a101.165 101.165 0 0130.4-70.635 10.668 10.668 0 002.027-11.904 59.733 59.733 0 013.136-54.379 104.992 104.992 0 0139.104 27.477 10.666 10.666 0 0011.84 3.136 185.321 185.321 0 01125.717 0 10.667 10.667 0 0011.776-3.136 104.975 104.975 0 0139.083-27.499 59.733 59.733 0 013.136 54.379 10.666 10.666 0 002.027 11.904 101.16 101.16 0 0130.421 70.656c0 51.669-44.139 97.941-107.371 112.512-5.741 1.32-9.326 7.044-8.006 12.785.208.904.532 1.776.966 2.596a91.6 91.6 0 017.744 42.773v79.36c0 5.891 4.776 10.667 10.667 10.667a10.888 10.888 0 002.304-.256c137.945-30.999 224.642-167.955 193.643-305.899C478.572 85.729 375.084 2.753 255.509 2.523z"
        fill="#455a64"
      />
    </svg>
  );
}

function Close() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-6 h-6 text-red-700 dark:text-red-300 mx-2"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
