import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home({ products }) {
  return (
    <main className="max-w-4xl px-3 sm:px-0 mx-auto">
      <Head>
        <title>Fetch API Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-7xl my-3 font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-500">Products List</h1>
      <section className="grid my-4 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div className="bg-white elevation-2 rounded" key={product.id}>
            <Image
              src={product.image}
              layout="responsive"
              width={1080}
              height={1020}
              className="rounded object-center"
              alt={product.title}
            />
            <div className="px-3 space-y-3 py-4">
              <h1 className="font-semibold leading-5 line-clamp-1 text-xl">
                {product.title}
              </h1>
              <p className="tracking-wide font-medium text-gray-600">
                Price: <span>${product.price}</span>
              </p>
              <Link href={`/product/${product.id}`}>
                <button className="rounded-md px-4 py-2 capitalize font-medium bg-blue-700 text-white focus:outline-none">
                  ver mas
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const data = await fetch("https://fakestoreapi.com/products");
  const products = await data.json();

  // console.log(products);

  return {
    props: { products: products },
  };
}
