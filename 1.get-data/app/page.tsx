interface Props {
  id: number;
  houseName: string;
  housePrice: number;
}

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/house", { cache: "no-store" });
  const getdata: Props[] = await data.json();
  return (
    <main>
      {getdata.map((data) => (
        <div className="flex items-center justify-between max-w-[300px] mt-4 p-2">
          <p>{data.id}</p>
          <p>{data.houseName}</p>
          <p>{data.housePrice}</p>
        </div>
      ))}
    </main>
  );
}
