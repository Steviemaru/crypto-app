export default function PercentageBar({
  progress,
  fill,
  width,
}: {
  progress: any;
  fill: string;
  width:string;
}) {
  return (
    <div className={`${width}   h-2 bg-gray-200 rounded-md overflow-hidden `}>
      <div
        className={`h-full transition-all ${fill}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
//