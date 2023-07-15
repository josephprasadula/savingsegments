import Image from "next/image";
import { useState } from "react";
import Popup from "@/components/popup";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className={`flex min-h-screen flex-col`}>
      <div className={`${showModal && "opacity-75"}`}>
        <div className="flex items-center bg-[#39AEBC] text-white mb-[2rem] p-4">
          <img src="chevron-back-outline.svg" className="w-[2rem] text-white" />
          <span>View Audience</span>
        </div>
        <button
          className="text-white border-2 border-white bg-[#39AEBC] w-[11rem] px-6 py-4 ml-[6rem]"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Save Segment
        </button>
      </div>

      {showModal && <Popup setShowModal={setShowModal} />}
    </main>
  );
}
