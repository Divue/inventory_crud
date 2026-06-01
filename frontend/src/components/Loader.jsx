function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 border-3 border-surface-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-10 h-10 border-3 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-sm text-surface-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
