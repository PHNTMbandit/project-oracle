"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { getMoviesBySearch } from "@/lib/movies";
import { Movie } from "@/types/movie-types";
import { useDebouncedCallback } from "use-debounce";
import { ScrollArea } from "./ui/scroll-area";

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, children, ...props }, ref) => {
    const [searchText, setSearchText] = React.useState("");
    const [results, setResults] = React.useState<Movie[]>([]);

    const debounced = useDebouncedCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        setResults(await getMoviesBySearch(e.target.value));
      },
      100
    );

    const handleButton = (movie: Movie) => {
      setResults([]);
      setSearchText(movie.title);
    };

    return (
      <div>
        <Input
          className={cn("", className)}
          ref={ref}
          {...props}
          value={searchText}
          onChange={(e) => {
            debounced(e);
            setSearchText(e.target.value);
          }}>
          {children}
        </Input>
        {results.length > 0 && (
          <ScrollArea className="h-[150px] rounded-md border p-4">
            {results.map((result, index) => (
              <button
                key={index}
                className="w-full text-left hover:underline underline-offset-2"
                onClick={() => handleButton(result)}>
                {result.title}
              </button>
            ))}
          </ScrollArea>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
