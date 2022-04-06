import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export async function getStaticPaths() {
  const data = await fetch("https://fakestoreapi.com/products");
  const products = await data.json();

  const paths = products.map((prod) => {
    return {
      params: { id: prod.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  const id = ctx.params.id;

  const data = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await data.json();

  return {
    props: {
      product: product,
    },
  };
}

export default function Product({ product }) {
  return (
    <main className="max-w-3xl px-4 sm:px-0 mx-auto ">
      <Head>
        <title>{product.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="my-5 relative space-y-5">
        <h1 className="text-2xl leading-6 font-semibold">{product.title}</h1>
        <p className="leading-6 text-lg text-gray-700">{product.description}</p>
        <div className="flex my-4 justify-center">
          <Image
            src={product.image}
            layout="fixed"
            width={300}
            height={300}
            className="rounded"
          />
        </div>
      </div>
      <div className="flex mt-3 items-center justify-around">
        <p className="text-lg">
          Price: <span className="font-medium">${product.price}</span>
        </p>
        <Link href="/">
          <button className="px-3 py-2 bg-blue-600 rounded-md text-white text-lg">
            Go back
          </button>
        </Link>
      </div>
    </main>
  );
}
