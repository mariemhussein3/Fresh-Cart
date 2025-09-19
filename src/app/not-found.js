import Image from "next/image";

export default function NotFound() {
  return (
    <div className="lg:w-1/2 md:w-[70%] w-full flex items-center justify-center mx-auto  mt-20 h-[65vh]">
      <Image
        src="/images/error.svg"
        width={200}
        height={200}
        className="w-full"
        alt="Error Image"
      ></Image>
    </div>
  );
}
