// /pages/listing/[id].tsx

import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
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

export default function ListingPage() {
  const router = useRouter();
  const { id } = router.query;

  const room = mockRooms.find((r) => r.id === Number(id));

  if (!room) return <p className="p-10 text-center">Room not found.</p>;

  return (
    <>
      <Head>
        <title>{room.title} | SafeNest</title>
      </Head>

      <div className="min-h-screen bg-gray-50 p-6">
        <Link href="/" className="text-blue-500 underline mb-4 inline-block">← Back to Home</Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
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
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{room.title}</h1>
            <p className="text-gray-500 mb-1">{room.location}</p>
            <p className="text-red-500 font-semibold mb-4">${room.price} / week</p>
            <p className="mb-4 text-gray-700">{room.description}</p>

            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              {room.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Request to Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
}