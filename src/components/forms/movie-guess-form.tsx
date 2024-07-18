"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { movieGuessFormSchema } from "@/lib/schemas/movie-guess-schema";
import { SubmitButton } from "../submit-button";
import { submitGuess } from "@/app/(logged-in)/category/[name]/[quizId]/action";
import { Movie } from "@/types/movie-types";
import { useDebouncedCallback } from "use-debounce";
import { getMoviesBySearch } from "@/lib/movies";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";

export interface MovieGuessFormProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  correctAnswer: Movie;
}

const MovieGuessForm = React.forwardRef<HTMLDivElement, MovieGuessFormProps>(
  ({ correctAnswer, className, children, ...props }, ref) => {
    const [movieGuess, setMovieGuess] = React.useState<Movie | undefined>(
      undefined
    );
    const [searchText, setSearchText] = React.useState("");
    const [results, setResults] = React.useState<Movie[]>([]);
    const form = useForm<z.infer<typeof movieGuessFormSchema>>({
      resolver: zodResolver(movieGuessFormSchema),
      defaultValues: {
        movieGuessId: 0,
        correctMovieId: correctAnswer.id,
      },
    });

    const [formState, formAction] = useFormState(submitGuess, {
      message: "",
    });

    const handleButton = (movie: Movie) => {
      setResults([]);
      setSearchText(movie.title);
      setMovieGuess(movie);
    };

    const debounced = useDebouncedCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        setResults(await getMoviesBySearch(e.target.value));
      },
      100
    );

    return (
      <div
        className={cn("", className)}
        ref={ref}
        {...props}>
        {children}
        <Form {...form}>
          <form action={formAction}>
            <FormField
              control={form.control}
              name="movieGuessId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Input
                        value={searchText}
                        placeholder={"Guess the movie..."}
                        required
                        className={cn(
                          "",
                          formState.message == "correct" && "bg-green-400",
                          formState.message == "incorrect" && "bg-red-400"
                        )}
                        onClick={() => {
                          formState.message = "";
                        }}
                        onChange={(e) => {
                          setSearchText(e.target.value);
                          debounced(e);
                        }}
                      />
                      {results.length > 0 && (
                        <div className="absolute">
                          <ScrollArea className="h-[150px] rounded-md bg-background border p-4">
                            {results.map((result, index) => (
                              <button
                                key={index}
                                className="w-full text-left hover:underline underline-offset-2"
                                onClick={() => {
                                  handleButton(result);
                                  field.onChange(result.id);
                                }}>
                                {result.title}
                              </button>
                            ))}
                          </ScrollArea>
                        </div>
                      )}
                      <input
                        {...field}
                        type="hidden"
                        value={movieGuess?.id}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correctMovieId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      type="hidden"
                      value={correctAnswer.id}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <SubmitButton>Guess</SubmitButton>
          </form>
        </Form>
      </div>
    );
  }
);

MovieGuessForm.displayName = "MovieGuessForm";

export { MovieGuessForm };
