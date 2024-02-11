import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="relative">
        <svg viewBox="0 0 93 40" className="h-[50vh] max-w-[90%] max-h-[70vw] mx-auto">
          <text x="0" y="90%" font-size="45" fill="#333" className="fill-namada-primary">4</text>
          <text x="65" y="90%" font-size="45" fill="#333" className="fill-namada-primary">4</text>
        </svg>
        <i className="absolute w-[36%] aspect-square text-namada-primary top-[calc(50%-5px)] -translate-y-[50%] left-[32%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 833.3 833.3">
            <rect width="155.8" height="155.8" x="422.5" y="416.7" fill="currentColor"></rect>
            <path fill="currentColor" d="M266.6 260.8c86 0 155.8 69.8 155.8 155.8H266.6V260.8Z"></path>
            <polygon fill="currentColor" points="266.6 416.7 176.6 572.5 356.5 572.5 266.6 416.7"></polygon>
            <circle cx="578.9" cy="338.7" r="77.9" fill="currentColor"></circle>
            <path fill="currentColor"
                  d="M416.7 833.3a414 414 0 0 1-294.7-122C43.3 632.6 0 528 0 416.7s43.3-216 122-294.7C200.7 43.3 305.4 0 416.7 0s215.9 43.3 294.6 122c78.7 78.7 122 183.4 122 294.7s-43.3 215.9-122 294.6a414 414 0 0 1-294.6 122Zm0-781.7c-97.5 0-189.2 38-258.1 107-69 68.9-107 160.6-107 258s38 189.2 107 258.2c68.9 69 160.6 107 258 107s189.2-38 258.2-107 107-160.6 107-258.1-38-189.2-107-258.2A362.9 362.9 0 0 0 416.7 51.6Z"></path>
          </svg>
        </i></div>
      <p className="flex flex-col text-namada-primary px-6">
        Ooops... we appear to have made this page too private!
        <a
           className="group/button cursor-dot flex justify-center items-center relative text-center rounded-[100px] active:top-0.5 overflow-hidden text-ellipsis transition-colors duration-300 bg-transparent text-namada-primary border botext-namada-primary hover:bg-namada-primary hover:text-namada-black lg:border-[2px] p-4 leading-6 font-normal text-lg  px-10 mt-6"
           rel="" role="button" data-testid="Button" href="/">
          Back to dashboard</a>
      </p>
    </main>
  );
}
