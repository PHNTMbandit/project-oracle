"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { movieGuessFormSchema } from "@/lib/schemas/movie-guess-schema";
import { SearchBar } from "../search-bar";
import { SubmitButton } from "../submit-button";
import { submitGuess } from "@/app/category/[name]/[quizId]/action";
import { Movie } from "@/types/movie-types";

export interface MovieGuessFormProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  correctAnswer: Movie;
}

const MovieGuessForm = React.forwardRef<HTMLDivElement, MovieGuessFormProps>(
  ({ correctAnswer, className, children, ...props }, ref) => {
    const form = useForm<z.infer<typeof movieGuessFormSchema>>({
      resolver: zodResolver(movieGuessFormSchema),
      defaultValues: {
        movieTitle: "",
        correctMovieTitle: correctAnswer.title,
      },
    });

    const [formState, formAction] = useFormState(submitGuess, {
      message: "",
    });

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
              name="movieTitle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SearchBar
                      placeholder={"Guess the movie..."}
                      required
                      className={cn(
                        "",
                        formState.message == "correct" && "bg-green-400",
                        className
                      )}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correctMovieTitle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      {...field}
                      type="hidden"
                      value={correctAnswer.title}
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
