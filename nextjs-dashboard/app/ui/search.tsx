'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // const handleSearch = useDebouncedCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log(e.target.value);
  //     const params = new URLSearchParams(searchParams);
  //     if (e.target.value === '') {
  //       params.delete('query');
  //     } else {
  //       params.set('query', e.target.value);
  //     }
  //     replace(`${pathname}?${params.toString()}`);
  //   },
  //   300,
  // );
  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    if (e) {
      params.set('query', e.target.value);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const defaultValue = searchParams.get('query')?.toString() || '';

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={defaultValue}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
