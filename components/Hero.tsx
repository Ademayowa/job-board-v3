import BaseLayout from '@/components/layouts/BaseLayout';

type HeroProps = {
  title: string;
  description: string;
};

export default function Hero({ title, description }: HeroProps) {
  return (
    <section className='bg-[#0F4A7B] pt-16 py-24'>
      <BaseLayout>
        <div className='mt-10 flex flex-col items-center justify-center'>
          <div className='lg:w-11/12 w-full mx-auto'>
            <h1 className='text-3xl font-bold capitalize md:text-[64px] md:leading-tight text-white'>
              {title}
            </h1>

            <p className='mt-5 text-lg font-light !leading-normal text-white md:text-2xl w-11/12'>
              {description}
            </p>
          </div>
        </div>
      </BaseLayout>
    </section>
  );
}
