export default function Page({ params }: { params: { coin: string } }) {
  return <div> coin:{params.coin}</div>
}