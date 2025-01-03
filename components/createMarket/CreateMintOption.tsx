import { ReactNode } from 'react';
import { classNames } from '../../utils/general';

export default function CreateMintOption({
  active,
  checked,
  children,
}: {
  active: boolean;
  checked: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={classNames(
        "p-2 flex-1 border-2 rounded-md flex items-center justify-center text-sm hover:bg-gray-800",
        active
          ? "bg-neutral-800 border-x-rose-50"
          : "bg-neutral-900 border-neutral-500",
        checked ? "border-y-indigo-50 text-custom-green" : "text-white"
      )}
    >
      {children}
    </div>
  );
}