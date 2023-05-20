const Footer = () => {
  return (
    <footer className="w-screen p-1 bg-stone-900 flex flex-col justify-center items-center py-2">
      <section className="flex justify-start items-center gap-2 text-xs text-stone-100">
        <p>🇮🇩</p>
        <p>Indonesia</p>
      </section>
      <section className="mt-2 text-[.6rem] underline text-stone-400 flex justify-center items-center gap-2">
        <p>Privacy Policy</p>
        <p>Terms of Conditions</p>
      </section>
    </footer>
  );
};

export default Footer;
