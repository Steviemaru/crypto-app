export default function PercentageBar({progress,fill}:{
  progress:number;
  fill:string 
}) {

  return (
<div className="w-32  h-4 bg-gray-200 rounded-md overflow-hidden ">
<div className={`h-full transition-all ${fill}`} style={{width:`${progress}%`}} />
</div>  
  );
}