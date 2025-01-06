type Props = {
  title: string;
};

//
export default function Title({ title }: Props) {
  return (
    <div>
      <h2 className='text-[#0F4A7B] text-xl lg:text-3xl font-bold'>{title}</h2>
    </div>
  );
}
