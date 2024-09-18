'use client';

import { applyQuantityToUnit } from '@/components/grocery-cart/utils/applyQuantityToUnit';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import type { FormValues } from '../constants/schema';
import type { Ingredient } from '@prisma/client';
import type { UseFormReturn } from 'react-hook-form';

export interface IngredientsFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => Promise<void>;
  ingredients: Array<Ingredient>;
  quantity: number;
}

function IngredientsForm({ form, onSubmit, ingredients, quantity }: IngredientsFormProps) {
  return (
    <Form {...form}>
      <form
        id='ingredients-to-cart-form'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='ingredients'
          render={() => (
            <FormItem className='space-y-4'>
              {ingredients.map(item => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name='ingredients'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormLabel className='w-full gap-2 text-base items-start'>
                          <p className='text-sm font-medium leading-none'>{item.name}</p>
                          <p className='text-sm text-muted-foreground'>
                            {applyQuantityToUnit(item.unit, quantity)}
                          </p>
                        </FormLabel>

                        <FormControl>
                          <Checkbox
                            className='h-5 w-5'
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={checked => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter(value => value !== item.id));
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default IngredientsForm;
