'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '../../../lib/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    axios.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <img src={product.imageUrl} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-green-700 font-bold">${product.price}</p>
      <p className="mt-2">{product.description}</p>
    </div>
  );
}
