import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { ReactElement } from 'react';
import type { GetServerSidePropsContext } from 'next';
import type { NextPageWithLayout } from 'types';
import { Carousel } from 'react-responsive-carousel';

const sharedImage1 = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80';
const sharedImage2 = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

const mockRooms = [
  {
    id: 1,
    title: 'Private Room near Macquarie Uni',
    price: 220,
    location: 'Sydney, NSW',
    description: 'Bright and modern private room within walking distance to Macquarie University.',
    images: [sharedImage1, sharedImage2],
    features: ['Private bathroom', 'Study desk', 'Wi-Fi included'],
  },
  {
    id: 2,
    title: 'Shared Apartment near UNSW',
    price: 180,
    location: 'Kensington, NSW',
    description: 'Comfortable shared space close to UNSW and all major transport.',
    images: [sharedImage2, sharedImage1],
    features: ['Shared kitchen', 'Air conditioning', 'Close to transport'],
  },
  {
    id: 3,
    title: 'Homestay with Ensuite',
    price: 260,
    location: 'Chatswood, NSW',
    description: 'Enjoy a family-style homestay with your own ensuite and meals included.',
    images: [sharedImage1, sharedImage1],
    features: ['Ensuite', 'Meals included', 'Quiet neighborhood'],
  },
];

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>SafeNest | Find Your Perfect Homestay</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <div className="navbar bg-white shadow-sm">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl text-red-500">
              SafeNest
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal p-0">
              <li><a>{t('sign-up')}</a></li>
              <li><a>{t('item-3')}</a></li>
            </ul>
          </div>
        </div>

        {/* Hero Section */}
        <section className="text-center py-20 bg-white">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Find Your Perfect Homestay
          </h1>
          <p className="text-gray-500 text-lg">
            Safe, trusted, and student-friendly accommodations across Australia
          </p>
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search by suburb or school"
              className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            <button className="ml-4 px-6 py-3 bg-red-500 text-white rounded-lg">
              Search
            </button>
          </div>
        </section>

        {/* Room Listings */}
        <section className="px-10 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockRooms.map((room) => (
            <Link key={room.id} href={`/listing/${room.id}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  infiniteLoop
                  autoPlay
                  interval={5000}
                  className="h-52"
                >
                  {room.images.map((img, index) => (
                    <div key={index}>
                      <img src={img} alt={`${room.title} ${index + 1}`} className="object-cover h-52 w-full" />
                    </div>
                  ))}
                </Carousel>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{room.title}</h3>
                  <p className="text-gray-500">{room.location}</p>
                  <p className="text-red-500 font-semibold mt-1">${room.price}/week</p>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* FAQ Section (optional) */}
        <div className="divider my-10"></div>
        {/* If you want to keep the existing FAQ component */}
        {/* <FAQSection /> */}
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;