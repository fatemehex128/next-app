"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
export default function WatchListPage(){

  const triggerClass =
    "data-[state=active]:bg-slate-700 data-[state=active]:text-white"


  return (
    <div className="bg-slate-700 p-5">
      <Tabs defaultValue="Streaming" className="mx-5 my-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-100">My WatchLists :</h1>
          <TabsList>
            <TabsTrigger value="Streaming" className={triggerClass}>
              My Movies
            </TabsTrigger>
            <TabsTrigger value="On Tv" className={triggerClass}>
              On Tv
            </TabsTrigger>
            <TabsTrigger value="for Rent" className={triggerClass}>
              I Loves
            </TabsTrigger>
            <TabsTrigger value="In Theater" className={triggerClass}>
              What i Watched
            </TabsTrigger>
          </TabsList>

          <Field data-disabled>
            <FieldLabel htmlFor="textarea-disabled" className="text-lg text-white">your Note</FieldLabel>
            <Textarea
              id="textarea-disabled"
              placeholder="Type your message here."
              disabled
            />
          </Field>
        </div>
      </Tabs>
    </div>
  )}