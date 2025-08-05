// /pages/listing/[id].tsx

import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';

const mockRooms = [
  {
    id: 1,
    title: 'Private Room near Macquarie Uni',
    price: 220,
    images: [
      'https://images.unsplash.com/photo-1560448075-bb975b6edc00?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1598928506311-2bda3d3c0c92?auto=format&fit=crop&w=800&q=60',
    ],
    location: 'Sydney, NSW',
  },
  {
    id: 2,
    title: 'Shared Apartment near UNSW',
    price: 180,
    images: [
      'https://images.unsplash.com/photo-1615874959474-df46c1edaca8?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1586105251261-72a756497a12?auto=format&fit=crop&w=800&q=60',
    ],
    location: 'Kensington, NSW',
  },
  {
    id: 3,
    title: 'Homestay with Ensuite',
    price: 260,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1600585154206-9305b99a8875?auto=format&fit=crop&w=800&q=60',
    ],
    location: 'Chatswood, NSW',
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