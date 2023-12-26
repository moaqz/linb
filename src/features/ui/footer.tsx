function Footer() {
  return (
    <footer className="w-full border-t-2 border-t-black py-6">
      <p className="text-sm [&>a]:font-medium [&>a]:underline [&>a]:underline-offset-4">
        Crafted by{" "}
        <a href="https://github.com/moaqz" target="_blank" rel="noreferrer">
          moaqz
        </a>
        . The source code is on{" "}
        <a
          target="_blank"
          href="https://github.com/moaqz/linb"
          rel="noreferrer"
        >
          Github
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;
