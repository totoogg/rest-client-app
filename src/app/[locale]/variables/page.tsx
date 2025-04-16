import dynamic from 'next/dynamic';

const Variables = dynamic(() =>
  import('../../../widgets').then((mod) => mod.Variables)
);

const VariablesPage = () => {
  return <Variables />;
};

export default VariablesPage;
