"use client";

const tags = [
  {
    tag: "#description",
    value: "description",
  },
  {
    tag: "#gallery",
    value: "gallery",
  },
  {
    tag: "#details",
    value: "details",
  },
];

const Tag = () => {
  return (
    <section className="w-full h-full flex justify-around items-center overflow-x-scroll px-1 py-2 xs:pt-6 border-b-[1px] border-b-stone-200">
      {tags.map((tag, idx) => (
        <a
          key={idx}
          className="uppercase tracking-wider text-xs text-stone-700 font-[300]"
          href={tag.tag}
        >
          {tag.value}
        </a>
      ))}
    </section>
  );
};

export default Tag;
