import React from "react";

const Instruction = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 xl:px-10 xl:pt-10">
      <div className="mt-24 max-w-screen-md w-full">
        <video className="w-full" controls>
          <source src="/images/thesis-video.mp4" type="video/mp4" />
        </video>
      </div>
    </main>
  );
};

export default Instruction;
