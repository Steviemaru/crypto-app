import NewTab from "@/public/newTab.svg";

function OpenInNewTabButton({ url }: { url: string }) {
  const handleOpenLink = () => {
    if (url) {
      window.open(url, "_blank"); // Opens the URL in a new tab
    }
  };

  return (
    <button
      onClick={handleOpenLink}
      className="dark:text-white fill-current text-black dark:fill-current"
    >
      <NewTab className="w-5 h-5" />
    </button>
  );
}

export default OpenInNewTabButton;
