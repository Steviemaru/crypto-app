import { useState } from "react";
import Clipboard from "@/public/clipboard.svg";
import ClipboardCheck from "@/public/clipboardCheck.svg";

const CopyToClipboard = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      alert(err);
    }
  };
  return (
    <button
      onClick={handleCopy}
      className="border-r-white  dark:text-white fill-current text-black dark:fill-current"
    >
      {copied ? (
        <ClipboardCheck className="w-5 h-5 text-green-500" />
      ) : (
        <Clipboard className="w-5 h-5" />
      )}
    </button>
  );
};

export default CopyToClipboard;
