import { LoaderPinwheel } from 'lucide-react'; // or your relevant icon library

const Loading = () => {
  return (
    <div className="p-6 text-xl">
      <LoaderPinwheel className="animate-spin w-12 h-12" />
    </div>
  );
};

export default Loading;
