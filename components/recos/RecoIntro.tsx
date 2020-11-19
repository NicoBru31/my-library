const TEXTS = [
  'Je choisis une ou plusieurs adresses',
  'Je sélectionne mes lectures',
  "J'attends les recommendations des libraires",
];

const RecoIntro = () => (
  <>
    <h1>Comment ça marche ?</h1>
    <div className='flex items-baseline justify-between my-4'>
      {TEXTS.map((txt) => (
        <div key={txt} className='bg-cardbg text-white text-center h-32 w-1/4'>
          {txt}
        </div>
      ))}
    </div>
  </>
);

export default RecoIntro;
