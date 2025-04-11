import dynamic from 'next/dynamic';

const History = dynamic(() =>
  import('../../../widgets').then((mod) => mod.History)
);

export default function Page() {
  return <History />;
}
