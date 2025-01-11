const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb12_1px,transparent_1px),linear-gradient(to_bottom,#2563eb12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#2563eb] opacity-[0.15] blur-[100px]"></div>
      <div className="absolute right-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-[#2563eb] opacity-[0.15] blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[310px] w-[310px] rounded-full bg-[#2563eb] opacity-[0.15] blur-[100px]"></div>
    </div>
  );
};

export default BackgroundPattern;