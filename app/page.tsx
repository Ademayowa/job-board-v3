// // import Hero from '@/components/Hero';
// // import Jobs from '@/components/Jobs';
// // import BaseLayout from '@/components/layouts/BaseLayout';
// // import fetchJobs from '@/lib/fetchJobs';
// // import Message from '@/components/Message';

// // type SearchProps = {
// //   searchParams: {
// //     query?: string;
// //     page?: string;
// //     sort?: string; // Capture sort param
// //   };
// // };

// // export const revalidate = 60;

// // export default async function HomePage({ searchParams }: SearchProps) {
// //   const data = await fetchJobs(searchParams);

// //   if (!data) {
// //     return (
// //       <>
// //         <Hero />
// //         <Message
// //           className='py-16 flex justify-center'
// //           message='Service is temporarily down, please try again later'
// //         />
// //       </>
// //     );
// //   }

// //   const { data: jobs, metadata } = data;

// //   return (
// //     <main>
// //       <Hero />

// //       <BaseLayout className='px-5'>
// //         {jobs?.length > 0 ? (
// //           <div className='py-20'>
// //             <div className='flex items-center'>
// //               <p className='text-lg text-[#707071]'>
// //                 {metadata?.total} jobs found
// //               </p>
// //             </div>

// //             <Jobs initialJobs={jobs} filter={searchParams.sort || ''} />
// //           </div>
// //         ) : (
// //           <Message className='py-16 text-center' message='No jobs found' />
// //         )}
// //       </BaseLayout>
// //     </main>
// //   );
// // }

// // app/page.tsx
// import Hero from '@/components/Hero';
// import Jobs from '@/components/Jobs';
// import BaseLayout from '@/components/layouts/BaseLayout';
// import fetchJobs from '@/lib/fetchJobs';
// import Message from '@/components/Message';

// type SearchProps = {
//   searchParams: {
//     query?: string;
//     page?: string;
//     sort?: string;
//   };
// };

// export const revalidate = 60;

// export default async function HomePage({ searchParams }: SearchProps) {
//   const data = await fetchJobs(searchParams);

//   if (!data) {
//     return (
//       <>
//         <Hero />
//         <Message
//           className='py-16 flex justify-center'
//           message='Service is temporarily down, please try again later'
//         />
//       </>
//     );
//   }

//   const { data: jobs, metadata } = data;

//   return (
//     <main>
//       <Hero />
//       <BaseLayout className='px-5'>
//         {jobs?.length > 0 ? (
//           <div className='py-20'>
//             <div className='flex items-center'>
//               <p className='text-lg text-[#707071]'>
//                 {metadata?.total} jobs found
//               </p>
//             </div>
//             <Jobs initialJobs={jobs} filter={searchParams.sort || ''} />
//           </div>
//         ) : (
//           <Message className='py-16 text-center' message='No jobs found' />
//         )}
//       </BaseLayout>
//     </main>
//   );
// }

// app/page.tsx
import Hero from '@/components/Hero';
import Jobs from '@/components/Jobs';
import BaseLayout from '@/components/layouts/BaseLayout';
import fetchJobs from '@/lib/fetchJobs';
import Message from '@/components/Message';

type SearchProps = {
  searchParams: {
    query?: string;
    page?: string;
    sort?: string;
  };
};

export const revalidate = 60;

export default async function HomePage({ searchParams }: SearchProps) {
  try {
    const data = await fetchJobs(searchParams);

    if (!data) {
      return (
        <>
          <Hero />
          <Message
            className='py-16 flex justify-center'
            message='Service is temporarily down, please try again later'
          />
        </>
      );
    }

    const { data: jobs, metadata } = data;

    return (
      <main>
        <Hero />
        <BaseLayout className='px-5'>
          {jobs?.length > 0 ? (
            <div className='py-20'>
              <div className='flex items-center'>
                <p className='text-lg text-[#707071]'>
                  {metadata?.total} jobs found
                </p>
              </div>
              <Jobs initialJobs={jobs} filter={searchParams.sort || ''} />
            </div>
          ) : (
            <Message className='py-16 text-center' message='No jobs found' />
          )}
        </BaseLayout>
      </main>
    );
  } catch (error) {
    console.error('Error in HomePage:', error);
    return (
      <>
        <Hero />
        <Message
          className='py-16 flex justify-center'
          message='An error occurred while fetching jobs'
        />
      </>
    );
  }
}
