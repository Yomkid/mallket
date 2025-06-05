import Link from 'next/link';

type Props = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

export default function ProductCard({ id, name, price, imageUrl }: Props) {
  return (
    <div className="border rounded-xl shadow p-4">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-lg font-bold mt-2">{name}</h2>
      <p className="text-green-600 font-semibold">${price.toFixed(2)}</p>
      <Link href={`/product/${id}`} className="text-blue-500 text-sm mt-1 inline-block">
        View Details
      </Link>
    </div>
  );
}
