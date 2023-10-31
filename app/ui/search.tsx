'use client';

import { useDebouncedCallback } from 'use-debounce';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultQueryValue = searchParams.get('query') ?? '';

  const handleSearch = useDebouncedCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const { value } = evt.target;

    params.set('page', '1');

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params}`);
  }, 500);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={defaultQueryValue}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
