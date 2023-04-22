import React from "react";

export default function FeatureSection() {
  return (
    <>
      <section className="min-w-screen bg-red-100 flex items-center justify-center">
        <div className="bg-blue-100 px-6 max-w-screen-4xl">
          <h1 className="text-4xl">All-in-one toolkit</h1>
          <a
            class="block rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-xl sm:p-6 lg:p-8"
            href=""
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>

            <h3 class="mt-3 text-lg font-bold text-white sm:text-xl">
              Lorem, ipsum dolor.
            </h3>

            <p class="mt-4 text-sm text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
              eius labore nisi tempore modi vel voluptate ullam nostrum adipisci
              suscipit eaque quae cupiditate, accusamus minus laboriosam totam
              laborum, deserunt sint.
            </p>
          </a>
        </div>
      </section>
    </>
  );
}
