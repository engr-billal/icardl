import Link from "next/link";
import QRCode from "react-qr-code";

const ScanQR = ({ value }: { value: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-[24px] font-semibold leading-9">Scan QR Code</h1>
      <p className="text-[12px] leading-4">Scan the QR code to begin</p>
      <div className="p-[20px] bg-white rounded-3xl mt-[25px]">
        <QRCode
          value={value}
          size={274}
          fgColor="#1a202c"
          level="M"
          bgColor="transparent"
          className=" mx-auto mb-10"
        />
        <Link
          href={value}
          className="text-[16px] text-blue-500 mt-[50px] w-[247px]"
        >
          {value}
        </Link>
      </div>
    </div>
  );
};

export default ScanQR;
